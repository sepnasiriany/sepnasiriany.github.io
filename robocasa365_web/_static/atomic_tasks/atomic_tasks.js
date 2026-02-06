/**
 * Atomic Tasks: render a category-grouped table with Task / Description / Horizon / Video.
 *
 * Bundled data (loaded via Sphinx html_js_files):
 * - window.ROBOCASA_ATOMIC_TASK_INDEX
 * - window.ROBOCASA_ATOMIC_TASK_ATTRIBUTES
 * - window.ROBOCASA_ATOMIC_EPISODE_LENGTHS (61 atomic horizons)
 * - window.ROBOCASA_EPISODE_LENGTHS (fallback for the few multi-stage "atomic" outliers)
 */
(() => {
  function onReady(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function isAtomicTasksPage() {
    const path = window.location.pathname.replace(/\\/g, "/");
    return path.endsWith("/tasks/atomic_tasks.html") || path.endsWith("/tasks/atomic_tasks/");
  }

  function ensureBackToTopButton() {
    if (!isAtomicTasksPage()) return;
    if (document.querySelector(".rc-back-to-top")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rc-back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.title = "Back to top";
    btn.textContent = "↑";

    btn.addEventListener("click", () => {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    });

    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      btn.classList.toggle("rc-visible", y > 900);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    document.body.appendChild(btn);
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDescription(desc) {
    // Render "{foo/bar}" as italicized variable text without braces.
    // Also render "[foo/bar]" as "[<em>foo/bar</em>]" (keeps brackets visible).
    const raw = String(desc || "");
    const esc = escapeHtml(raw);
    let out = esc.replace(/\{([^}]+)\}/g, (_m, inner) => `<span class="rc-atomic-var"><em>${inner}</em></span>`);
    out = out.replace(/\[([^\]]+)\]/g, (_m, inner) => `[<span class="rc-atomic-var"><em>${inner}</em></span>]`);
    return out;
  }

  function getEpisodeLengthMap() {
    // Prefer atomic-specific lengths; fall back to composite lengths for any missing entries.
    const map = new Map();
    const a = window.ROBOCASA_ATOMIC_EPISODE_LENGTHS;
    if (a && typeof a === "object" && a.tasks && typeof a.tasks === "object") {
      for (const [taskName, data] of Object.entries(a.tasks)) {
        if (data && typeof data.mean_seconds === "number") map.set(taskName, data.mean_seconds);
      }
    }
    const c = window.ROBOCASA_EPISODE_LENGTHS;
    if (c && typeof c === "object" && c.tasks && typeof c.tasks === "object") {
      for (const [taskName, data] of Object.entries(c.tasks)) {
        if (!map.has(taskName) && data && typeof data.mean_seconds === "number") map.set(taskName, data.mean_seconds);
      }
    }
    return map;
  }

  function buildHorizonIntervals() {
    // Requested buckets: 5-10, 10-15, ..., 35-40, 40-50.
    const intervals = [];
    for (let min = 5; min < 40; min += 5) {
      const max = min + 5;
      intervals.push({ key: `${min}-${max}`, label: `${min}-${max}s`, min, max, inclusiveMax: false });
    }
    intervals.push({ key: "40-50", label: "40-50s", min: 40, max: 50, inclusiveMax: true });
    return intervals;
  }

  function horizonMatchesInterval(lengthSeconds, interval) {
    if (!Number.isFinite(lengthSeconds)) return false;
    if (interval.inclusiveMax) return lengthSeconds >= interval.min && lengthSeconds <= interval.max;
    return lengthSeconds >= interval.min && lengthSeconds < interval.max;
  }

  // Atomic Seen target tasks (from robocasa/utils/dataset_registry.py)
  const ATOM_SEEN_TARGET_TASKS = new Set([
    "CloseBlenderLid",
    "CloseFridge",
    "CloseToasterOvenDoor",
    "CoffeeSetupMug",
    "NavigateKitchen",
    "OpenCabinet",
    "OpenDrawer",
    "OpenStandMixerHead",
    "PnPCounterToCabinet",
    "PnPCounterToStove",
    "PnPDrawerToCounter",
    "PnPSinkToCounter",
    "PnPToasterToCounter",
    "SlideDishwasherRack",
    "TurnOffStove",
    "TurnOnElectricKettle",
    "TurnOnMicrowave",
    "TurnOnSinkFaucet",
  ]);

  function spacedLowerFromIdentifier(name) {
    return (name || "")
      .replace(/_/g, " ")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .trim();
  }

  function renderAtomicStarIntoTaskCell(taskName, taskTd) {
    if (!taskName || !taskTd) return;

    // Idempotent: remove any existing stars first
    for (const old of Array.from(taskTd.querySelectorAll(".rc-atomic-star"))) old.remove();

    const isSeen = ATOM_SEEN_TARGET_TASKS.has(taskName);
    if (!isSeen) return;

    const codeEl = taskTd.querySelector("a > code, code");
    if (!codeEl) return;

    const star = document.createElement("span");
    star.className = "rc-atomic-star rc-atomic-star-seen";
    star.textContent = "*";
    star.dataset.label = "Atomic Seen";
    star.setAttribute("aria-label", star.dataset.label);

    // Insert inside the <code> so it doesn't break the underline / border
    codeEl.appendChild(star);
  }

  function highlightRow(rowEl) {
    if (!rowEl) return;
    rowEl.classList.remove("rc-task-highlight");
    // force reflow so re-adding retriggers animation
    void rowEl.offsetWidth; // eslint-disable-line no-unused-expressions
    rowEl.classList.add("rc-task-highlight");
    window.setTimeout(() => rowEl.classList.remove("rc-task-highlight"), 1800);
  }

  function scrollToTaskRow(rowEl) {
    if (!rowEl) return;
    rowEl.scrollIntoView({ behavior: "smooth", block: "center" });

    // Match composite behavior: highlight when actually visible
    let highlighted = false;
    const doHighlight = () => {
      if (highlighted) return;
      highlighted = true;
      highlightRow(rowEl);
    };

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              observer.disconnect();
              window.setTimeout(doHighlight, 100);
              return;
            }
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(rowEl);
      window.setTimeout(() => {
        observer.disconnect();
        doHighlight();
      }, 2000);
    } else {
      window.setTimeout(doHighlight, 350);
    }
  }

  function cssEscape(value) {
    // Use native CSS.escape when available; otherwise, fall back to a minimal escape.
    // https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape
    if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(String(value));
    return String(value).replace(/["\\]/g, "\\$&");
  }

  function uniqueTokens(query) {
    const raw = (query || "")
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    return Array.from(new Set(raw));
  }

  function getVideoForTask(taskName) {
    if (!taskName) return null;
    const normalizedTaskName = String(taskName).replace(/\*/g, "").trim();
    const safe = encodeURIComponent(normalizedTaskName);
    const sources = [];

    const DEFAULT_PUBLIC_VIDEO_BASE_URL = "https://pub-4433dcd10060475196ea5832312785f9.r2.dev";
    const DEFAULT_PUBLIC_VIDEO_PREFIX = "robocasa365-videos";
    const base = window.ROBOCASA_VIDEO_BASE_URL;
    if (typeof base === "string" && base.trim()) {
      const b = base.replace(/\/+$/, "");
      sources.push(`${b}/${safe}.mp4`);
      if (!b.endsWith(`/${DEFAULT_PUBLIC_VIDEO_PREFIX}`)) {
        sources.push(`${b}/${DEFAULT_PUBLIC_VIDEO_PREFIX}/${safe}.mp4`);
      }
    } else {
      sources.push(`${DEFAULT_PUBLIC_VIDEO_BASE_URL}/${safe}.mp4`);
      sources.push(`${DEFAULT_PUBLIC_VIDEO_BASE_URL}/${DEFAULT_PUBLIC_VIDEO_PREFIX}/${safe}.mp4`);
    }
    return { label: "Demo", sources };
  }

  function ensureVideoModal() {
    let overlay = document.getElementById("rc-video-modal-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "rc-video-modal-overlay";
    overlay.className = "rc-video-modal-overlay";
    overlay.hidden = true;

    const modal = document.createElement("div");
    modal.className = "rc-video-modal";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "rc-video-modal-close";
    close.setAttribute("aria-label", "Close video");
    close.textContent = "×";

    const header = document.createElement("div");
    header.className = "rc-video-modal-header";

    const title = document.createElement("div");
    title.className = "rc-video-modal-title";
    title.textContent = "";

    const video = document.createElement("video");
    video.className = "rc-video-modal-player";
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";

    const instruction = document.createElement("div");
    instruction.className = "rc-video-modal-instruction";
    instruction.hidden = true;
    const instructionLabel = document.createElement("strong");
    const instructionText = document.createElement("span");
    instructionText.className = "rc-video-modal-instruction-text";
    instruction.appendChild(instructionLabel);
    instruction.appendChild(document.createTextNode(" "));
    instruction.appendChild(instructionText);

    const error = document.createElement("div");
    error.className = "rc-video-modal-error";
    error.hidden = true;

    let loadTimeout = null;
    let hasLoadedMetadata = false;

    function doClose() {
      overlay.hidden = true;
      document.body.classList.remove("rc-modal-open");
      try {
        video.pause();
      } catch {}
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }
      hasLoadedMetadata = false;
      title.textContent = "";
      instruction.hidden = true;
      instructionLabel.textContent = "";
      instructionText.textContent = "";
      error.hidden = true;
      error.textContent = "";
      video.removeAttribute("src");
      video.load();
    }

    close.addEventListener("click", doClose);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) doClose();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.hidden) doClose();
    });

    header.appendChild(title);
    header.appendChild(close);
    modal.appendChild(header);
    modal.appendChild(video);
    modal.appendChild(instruction);
    modal.appendChild(error);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay._rcOpen = (sources, taskName, taskDescription) => {
      overlay.hidden = false;
      document.body.classList.add("rc-modal-open");
      error.hidden = true;
      error.textContent = "";
      title.textContent = taskName ? `${taskName}` : "";

      const tName = (taskName || "").trim();
      const tDesc = (taskDescription || "").trim();
      if (tDesc) {
        instruction.hidden = false;
        instructionLabel.textContent = tName ? `${tName}:` : "";
        // description may contain inline HTML (italics for variables); render as-is
        instructionText.innerHTML = tDesc;
      } else {
        instruction.hidden = true;
        instructionLabel.textContent = "";
        instructionText.textContent = "";
      }

      const srcsRaw = Array.isArray(sources) ? sources : [sources];
      const srcs = srcsRaw.map((s) => String(s || "").trim()).filter(Boolean);
      let attempt = 0;
      let loadTimeout = null;
      let hasLoadedMetadata = false;

      function showUnavailable() {
        video.removeAttribute("src");
        video.load();
        error.hidden = false;
        error.textContent = "Demo video unavailable.";
      }

      function tryNextSource() {
        if (attempt >= srcs.length) {
          showUnavailable();
          return;
        }
        const src = srcs[attempt++];
        hasLoadedMetadata = false;
        
        // Clear any existing timeout
        if (loadTimeout) {
          clearTimeout(loadTimeout);
          loadTimeout = null;
        }

        // Safari: use canplay or loadedmetadata to detect successful load
        const onCanPlay = () => {
          hasLoadedMetadata = true;
          if (loadTimeout) {
            clearTimeout(loadTimeout);
            loadTimeout = null;
          }
          video.removeEventListener("canplay", onCanPlay);
          video.removeEventListener("loadedmetadata", onCanPlay);
        };
        video.addEventListener("canplay", onCanPlay);
        video.addEventListener("loadedmetadata", onCanPlay);

        video.src = src;
        video.load();
        
        // Safari: give it more time before assuming error (especially for R2/CDN)
        // Increased timeout for Safari which can be slower with cross-origin video loading
        loadTimeout = window.setTimeout(() => {
          if (!hasLoadedMetadata) {
            // Safari may not fire error immediately; try next source
            video.removeEventListener("canplay", onCanPlay);
            video.removeEventListener("loadedmetadata", onCanPlay);
            tryNextSource();
          }
        }, 5000);

        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }

      // Safari: only treat as error if we haven't loaded metadata yet
      video.onerror = () => {
        if (loadTimeout) {
          clearTimeout(loadTimeout);
          loadTimeout = null;
        }
        if (!hasLoadedMetadata) {
          tryNextSource();
        }
      };
      tryNextSource();
    };

    return overlay;
  }

  onReady(() => {
    if (!isAtomicTasksPage()) return;
    document.body.classList.add("rc-atomic-tasks");
    ensureBackToTopButton();

    const root = document.getElementById("rc-atomic-tasks-root");
    if (!root) return;

    const idx = window.ROBOCASA_ATOMIC_TASK_INDEX;
    const attrs = window.ROBOCASA_ATOMIC_TASK_ATTRIBUTES;
    const fixtures = idx && Array.isArray(idx.fixtures) ? idx.fixtures : [];
    const episodeLengthMap = getEpisodeLengthMap();
    const overlay = ensureVideoModal();
    const horizonIntervals = buildHorizonIntervals();

    root.textContent = "";
    if (!fixtures.length) return;

    // Controls row
    const controls = document.createElement("div");
    controls.className = "rc-atomic-controls";

    const catWrap = document.createElement("div");
    catWrap.className = "rc-atomic-control rc-atomic-fixture-select";
    const catLabel = document.createElement("label");
    catLabel.textContent = "Category:";
    catLabel.setAttribute("for", "rc-atomic-fixture-select");
    const catSelect = document.createElement("select");
    catSelect.id = "rc-atomic-fixture-select";
    const optAll = document.createElement("option");
    optAll.value = "";
    optAll.textContent = "Select a category…";
    catSelect.appendChild(optAll);
    for (const fx of fixtures) {
      const opt = document.createElement("option");
      opt.value = fx.id || fx.label || "";
      opt.textContent = fx.label || fx.id || "Category";
      catSelect.appendChild(opt);
    }
    catWrap.appendChild(catLabel);
    catWrap.appendChild(catSelect);

    const searchWrap = document.createElement("div");
    searchWrap.className = "rc-atomic-control rc-atomic-search";
    const searchLabel = document.createElement("label");
    searchLabel.textContent = "Task:";
    searchLabel.setAttribute("for", "rc-atomic-task-input");
    const inputWrap = document.createElement("div");
    inputWrap.className = "rc-atomic-task-input-wrap";
    const input = document.createElement("input");
    input.id = "rc-atomic-task-input";
    input.type = "search";
    input.placeholder = "Search a task…";
    input.autocomplete = "off";
    input.spellcheck = false;
    const suggest = document.createElement("div");
    suggest.className = "rc-atomic-task-suggest";
    suggest.hidden = true;
    suggest.setAttribute("role", "listbox");
    inputWrap.appendChild(input);
    inputWrap.appendChild(suggest);
    searchWrap.appendChild(searchLabel);
    searchWrap.appendChild(inputWrap);

    // Target Tasks filter (All Tasks vs Atomic Seen)
    // Mirrors Composite page "Target Tasks" dropdown UI.
    const targetWrap = document.createElement("div");
    targetWrap.className = "rc-atomic-control rc-filter rc-filter-target-tasks";

    const targetBtn = document.createElement("button");
    targetBtn.type = "button";
    targetBtn.className = "rc-task-attr-dropdown-btn";
    targetBtn.setAttribute("aria-label", "Target Tasks");
    targetBtn.textContent = "Target Tasks";

    const targetMenu = document.createElement("div");
    targetMenu.className = "rc-task-attr-dropdown";
    targetMenu.hidden = true;

    // All Tasks option
    const allTasksRow = document.createElement("label");
    allTasksRow.className = "rc-task-attr-item rc-target-all-tasks-row";
    const allTasksCb = document.createElement("input");
    allTasksCb.type = "checkbox";
    allTasksCb.checked = true; // default
    allTasksCb.setAttribute("aria-label", "All tasks");
    const allTasksText = document.createElement("span");
    allTasksText.textContent = "All Tasks";
    const allTasksCount = document.createElement("span");
    allTasksCount.className = "rc-task-attr-count";
    allTasksCount.textContent = "";
    allTasksRow.appendChild(allTasksCb);
    allTasksRow.appendChild(allTasksText);
    allTasksRow.appendChild(allTasksCount);
    targetMenu.appendChild(allTasksRow);

    // Divider (matches composite dropdowns visually)
    const targetDivider = document.createElement("div");
    targetDivider.style.height = "1px";
    targetDivider.style.background = "var(--pst-color-border, #e0e0e0)";
    targetDivider.style.margin = "0.25rem 0.15rem 0.35rem 0";
    targetMenu.appendChild(targetDivider);

    // Atomic Seen option
    const atomicSeenRow = document.createElement("label");
    atomicSeenRow.className = "rc-task-attr-item";
    const atomicSeenCb = document.createElement("input");
    atomicSeenCb.type = "checkbox";
    atomicSeenCb.checked = true;
    atomicSeenCb.value = "atomic_seen";
    atomicSeenCb.setAttribute("aria-label", "Atomic Seen");
    const atomicSeenPill = document.createElement("span");
    atomicSeenPill.className = "rc-task-tag rc-task-tag-atomic-seen";
    atomicSeenPill.textContent = "Atomic Seen";
    const atomicSeenCount = document.createElement("span");
    atomicSeenCount.className = "rc-task-attr-count";
    atomicSeenCount.textContent = "";
    atomicSeenRow.appendChild(atomicSeenCb);
    const atomicSeenRight = document.createElement("span");
    atomicSeenRight.className = "rc-task-attr-item-right";
    atomicSeenRight.appendChild(atomicSeenPill);
    atomicSeenRow.appendChild(atomicSeenRight);
    atomicSeenRow.appendChild(atomicSeenCount);
    targetMenu.appendChild(atomicSeenRow);

    function syncFromAllTasks() {
      if (!allTasksCb.checked) return;
      atomicSeenCb.checked = true;
    }

    allTasksCb.addEventListener("change", () => {
      syncFromAllTasks();
      applyFilters();
    });
    atomicSeenCb.addEventListener("change", () => {
      // Custom selection means not "All Tasks" mode.
      allTasksCb.checked = false;
      applyFilters();
    });

    targetBtn.addEventListener("click", () => {
      targetMenu.hidden = !targetMenu.hidden;
    });
    document.addEventListener("click", (e) => {
      if (targetWrap.contains(e.target)) return;
      targetMenu.hidden = true;
    });

    targetWrap.appendChild(targetBtn);
    targetWrap.appendChild(targetMenu);

    // Horizon dropdown (right side)
    const horizonWrap = document.createElement("div");
    // Use Composite "Episode Length" dropdown classes for identical sizing/look
    horizonWrap.className = "rc-atomic-control rc-filter rc-filter-length rc-atomic-filter-horizon";
    const horizonBtn = document.createElement("button");
    horizonBtn.type = "button";
    horizonBtn.className = "rc-length-dropdown-btn";
    horizonBtn.setAttribute("aria-label", "Horizon");
    const horizonMenu = document.createElement("div");
    horizonMenu.className = "rc-length-dropdown";
    horizonMenu.hidden = true;

    const horizonChecks = new Map();
    const horizonMeta = new Map();

    function updateHorizonButton() {
      const total = horizonIntervals.length;
      let checked = 0;
      for (const cb of horizonChecks.values()) if (cb.checked) checked += 1;
      if (checked === total) horizonBtn.textContent = "Horizon (All)";
      else if (checked === 0) horizonBtn.textContent = "Horizon (None)";
      else horizonBtn.textContent = `Horizon (${checked}/${total})`;
    }

    const hdr = document.createElement("div");
    hdr.className = "rc-length-header";
    const allRow = document.createElement("label");
    allRow.className = "rc-length-all";
    const allCb = document.createElement("input");
    allCb.type = "checkbox";
    allCb.checked = true;
    const allText = document.createElement("span");
    allText.textContent = "All";
    allRow.appendChild(allCb);
    allRow.appendChild(allText);
    hdr.appendChild(allRow);
    horizonMenu.appendChild(hdr);

    function syncAllCheckbox() {
      const total = horizonIntervals.length;
      let checked = 0;
      for (const cb of horizonChecks.values()) if (cb.checked) checked += 1;
      if (checked === 0) {
        allCb.checked = false;
        allCb.indeterminate = false;
      } else if (checked === total) {
        allCb.checked = true;
        allCb.indeterminate = false;
      } else {
        allCb.checked = false;
        allCb.indeterminate = true;
      }
    }

    allCb.addEventListener("change", () => {
      const total = horizonIntervals.length;
      let checked = 0;
      for (const cb of horizonChecks.values()) if (cb.checked) checked += 1;
      const shouldSelectAll = checked !== total;
      for (const cb of horizonChecks.values()) cb.checked = shouldSelectAll;
      syncAllCheckbox();
      updateHorizonButton();
      applyFilters();
    });

    for (const it of horizonIntervals) {
      const row = document.createElement("label");
      row.className = "rc-length-item";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = true;
      cb.value = it.key;
      const labelSpan = document.createElement("span");
      labelSpan.textContent = it.label;
      const countSpan = document.createElement("span");
      countSpan.className = "rc-length-item-count";
      countSpan.textContent = "(0)";
      row.appendChild(cb);
      row.appendChild(labelSpan);
      row.appendChild(countSpan);
      horizonMenu.appendChild(row);
      horizonChecks.set(it.key, cb);
      horizonMeta.set(it.key, { ...it, countEl: countSpan });
      cb.addEventListener("change", () => {
        syncAllCheckbox();
        updateHorizonButton();
        applyFilters();
      });
    }
    syncAllCheckbox();
    updateHorizonButton();

    horizonBtn.addEventListener("click", () => (horizonMenu.hidden = !horizonMenu.hidden));
    document.addEventListener("click", (e) => {
      if (horizonWrap.contains(e.target)) return;
      horizonMenu.hidden = true;
    });

    horizonWrap.appendChild(horizonBtn);
    horizonWrap.appendChild(horizonMenu);

    const countEl = document.createElement("div");
    countEl.className = "rc-atomic-count";
    countEl.textContent = "Showing 0 tasks";

    // Footer row: count (left) + Reset (right), matching Composite
    const footerRow = document.createElement("div");
    footerRow.className = "rc-atomic-controls-footer";

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "rc-reset-filters-btn";
    resetBtn.textContent = "Reset";
    resetBtn.setAttribute("aria-label", "Reset filters");
    resetBtn.addEventListener("click", () => {
      // Reset filter inputs to defaults
      input.value = "";
      suggest.hidden = true;
      // Horizon: select all
      for (const cb of horizonChecks.values()) cb.checked = true;
      syncAllCheckbox();
      updateHorizonButton();
      horizonMenu.hidden = true;
      // Target Tasks: back to "All Tasks" mode
      allTasksCb.checked = true;
      atomicSeenCb.checked = true;
      targetMenu.hidden = true;
      applyFilters();
    });

    footerRow.appendChild(countEl);
    footerRow.appendChild(resetBtn);

    controls.appendChild(catWrap);
    controls.appendChild(searchWrap);
    controls.appendChild(horizonWrap);
    controls.appendChild(targetWrap);
    controls.appendChild(footerRow);
    root.appendChild(controls);

    // Sections
    const sectionsWrap = document.createElement("div");
    sectionsWrap.className = "rc-atomic-sections";
    root.appendChild(sectionsWrap);

    const fixtureEls = new Map();
    const taskIndex = [];

    for (const fx of fixtures) {
      const tasks = Array.isArray(fx.tasks) ? fx.tasks : [];
      const section = document.createElement("section");
      section.className = "rc-atomic-fixture";
      section.dataset.fixtureId = fx.id || "";

      const header2 = document.createElement("div");
      header2.className = "rc-atomic-fixture-header";
      const title2 = document.createElement("div");
      title2.className = "rc-atomic-fixture-title";
      title2.textContent = fx.label || fx.id || "Category";
      const badge = document.createElement("div");
      badge.className = "rc-atomic-fixture-badge";
      badge.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
      header2.appendChild(title2);
      header2.appendChild(badge);
      section.appendChild(header2);

      const body = document.createElement("div");
      body.className = "rc-atomic-fixture-body";
      const table = document.createElement("table");
      table.className = "rc-atomic-table";

      const colgroup = document.createElement("colgroup");
      for (const cls of ["rc-atomic-col-task", "rc-atomic-col-desc", "rc-atomic-col-horizon", "rc-atomic-col-video"]) {
        const col = document.createElement("col");
        col.className = cls;
        colgroup.appendChild(col);
      }
      table.appendChild(colgroup);

      const thead = document.createElement("thead");
      const trh = document.createElement("tr");
      for (const col of ["Task", "Description", "Horizon", "Video"]) {
        const th = document.createElement("th");
        th.textContent = col;
        trh.appendChild(th);
      }
      thead.appendChild(trh);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      for (const t of tasks) {
        const name = t.name;
        if (!name) continue;
        const meta = attrs && typeof attrs === "object" ? attrs[name] : null;
        const desc = meta && typeof meta === "object" ? meta.description : "";
        const horizon = episodeLengthMap.get(name);

        const tr = document.createElement("tr");

        const tdTask = document.createElement("td");
        tdTask.className = "rc-atomic-task";
        const a = document.createElement("a");
        a.href = `${(t.github || fx.github || "")}${t.lineno ? `#L${t.lineno}` : ""}`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        const code = document.createElement("code");
        code.textContent = name;
        a.appendChild(code);
        tdTask.appendChild(a);
        if (name) renderAtomicStarIntoTaskCell(name, tdTask);
        tr.appendChild(tdTask);

        const tdDesc = document.createElement("td");
        tdDesc.className = "rc-atomic-desc";
        tdDesc.innerHTML = formatDescription(desc || "");
        tr.appendChild(tdDesc);

        const tdH = document.createElement("td");
        tdH.className = "rc-atomic-horizon";
        tdH.textContent = Number.isFinite(horizon) ? `${Math.round(horizon)}s` : "—";
        tr.appendChild(tdH);

        const tdV = document.createElement("td");
        tdV.className = "rc-atomic-video";
        const v = getVideoForTask(name);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rc-atomic-video-btn";
        btn.textContent = "Watch";
        btn.addEventListener("click", () => {
          const descHtml = (tdDesc.innerHTML || tdDesc.textContent || "").trim();
          overlay._rcOpen(v.sources, name, descHtml);
        });
        tdV.appendChild(btn);
        tr.appendChild(tdV);

        tbody.appendChild(tr);

        const searchText = `${String(name).toLowerCase()} ${spacedLowerFromIdentifier(name)} ${String(desc || "")
          .toLowerCase()
          .replace(/\s+/g, " ")}`;
        taskIndex.push({
          task: name,
          taskLower: String(name).toLowerCase(),
          taskSpacedLower: spacedLowerFromIdentifier(name),
          fixtureId: fx.id || "",
          fixtureLabel: fx.label || fx.id || "",
          horizon: Number.isFinite(horizon) ? Math.round(horizon) : null,
          rowEl: tr,
          sectionEl: section,
          searchText,
        });
      }
      table.appendChild(tbody);
      body.appendChild(table);
      section.appendChild(body);
      sectionsWrap.appendChild(section);

      fixtureEls.set(fx.id || "", { sectionEl: section, badgeEl: badge });
    }

    // Populate target counts (static counts, like Composite page)
    allTasksCount.textContent = `(${taskIndex.length})`;
    atomicSeenCount.textContent = `(${taskIndex.filter((it) => ATOM_SEEN_TARGET_TASKS.has(it.task)).length})`;

    function getActiveHorizonIntervals() {
      const total = horizonIntervals.length;
      let checked = 0;
      const active = [];
      for (const it of horizonIntervals) {
        const cb = horizonChecks.get(it.key);
        if (cb && cb.checked) {
          checked += 1;
          active.push(it);
        }
      }
      if (checked === total) return null;
      if (checked === 0) return [];
      return active;
    }

    function getActiveTargetFilter() {
      if (allTasksCb.checked) return null; // no target filtering
      if (atomicSeenCb.checked) return "atomic_seen";
      return []; // none selected => show nothing
    }

    function passesFilters(it, tokens, activeIntervals, targetFilter) {
      if (tokens.length && !tokens.every((t) => it.searchText.includes(t))) return false;
      if (Array.isArray(activeIntervals)) {
        if (activeIntervals.length === 0) return false;
        if (it.horizon == null) return false;
        let ok = false;
        for (const inter of activeIntervals) {
          if (horizonMatchesInterval(it.horizon, inter)) {
            ok = true;
            break;
          }
        }
        if (!ok) return false;
      }
      if (targetFilter === "atomic_seen") {
        if (!ATOM_SEEN_TARGET_TASKS.has(it.task)) return false;
      } else if (Array.isArray(targetFilter)) {
        if (targetFilter.length === 0) return false;
      }
      return true;
    }

    function updateHorizonDropdownCounts(tokens) {
      const activeIntervals = null; // counts ignore current horizon selection
      const targetFilter = getActiveTargetFilter();
      for (const inter of horizonIntervals) {
        let count = 0;
        for (const it of taskIndex) {
          if (!passesFilters(it, tokens, activeIntervals, targetFilter)) continue;
          if (it.horizon == null) continue;
          if (!horizonMatchesInterval(it.horizon, inter)) continue;
          count += 1;
        }
        const meta = horizonMeta.get(inter.key);
        if (meta?.countEl) meta.countEl.textContent = `(${count})`;
      }
    }

    function applyFilters() {
      const tokens = uniqueTokens(input.value);
      const activeIntervals = getActiveHorizonIntervals();
      const targetFilter = getActiveTargetFilter();
      let visibleTotal = 0;
      const visibleByFixture = new Map();

      for (const it of taskIndex) {
        const ok = passesFilters(it, tokens, activeIntervals, targetFilter);
        it.rowEl.style.display = ok ? "" : "none";
        if (ok) {
          visibleTotal += 1;
          visibleByFixture.set(it.fixtureId, (visibleByFixture.get(it.fixtureId) || 0) + 1);
        }
      }

      for (const [fixtureId, meta] of fixtureEls.entries()) {
        const vis = visibleByFixture.get(fixtureId) || 0;
        meta.badgeEl.textContent = `${vis} task${vis === 1 ? "" : "s"}`;
        meta.sectionEl.style.display = vis > 0 ? "" : "none";
      }

      countEl.textContent = `Showing ${visibleTotal} task${visibleTotal === 1 ? "" : "s"}`;
      updateHorizonDropdownCounts(tokens);
    }

    // Typeahead suggestions (simple)
    let lastMatches = [];
    let activeIndex = -1;
    function setActiveIndex(nextIndex) {
      const btns = Array.from(suggest.querySelectorAll(".rc-atomic-task-suggest-item"));
      if (!btns.length) {
        activeIndex = -1;
        return;
      }
      if (nextIndex < 0) activeIndex = -1;
      else activeIndex = Math.max(0, Math.min(nextIndex, btns.length - 1));
      for (const [i, b] of btns.entries()) b.classList.toggle("rc-active", i === activeIndex);
    }

    function renderSuggestions(q) {
      const tokens = uniqueTokens(q);
      suggest.innerHTML = "";
      if (!tokens.length) {
        suggest.hidden = true;
        return [];
      }
      const matches = taskIndex
        .filter((it) => tokens.every((t) => it.searchText.includes(t)))
        .sort((a, b) => a.task.length - b.task.length)
        .slice(0, 12);
      for (const [idx, it] of matches.entries()) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rc-atomic-task-suggest-item";
        btn.innerHTML = `<span class="rc-atomic-task-suggest-name">${it.task}</span><span class="rc-atomic-task-suggest-meta">${it.fixtureLabel}</span>`;
        btn.addEventListener("click", () => {
          input.value = it.task;
          suggest.hidden = true;
          setActiveIndex(-1);
          applyFilters();
          scrollToTaskRow(it.rowEl);
        });
        btn.addEventListener("mouseenter", () => setActiveIndex(idx));
        suggest.appendChild(btn);
      }
      suggest.hidden = matches.length === 0;
      setActiveIndex(-1);
      return matches;
    }

    input.addEventListener("input", () => {
      lastMatches = renderSuggestions(input.value);
      applyFilters();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (suggest.hidden) lastMatches = renderSuggestions(input.value);
        if (lastMatches.length) {
          suggest.hidden = false;
          setActiveIndex(activeIndex < 0 ? 0 : activeIndex + 1);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (suggest.hidden) lastMatches = renderSuggestions(input.value);
        if (lastMatches.length) {
          suggest.hidden = false;
          setActiveIndex(activeIndex < 0 ? lastMatches.length - 1 : activeIndex - 1);
        }
      } else if (e.key === "Escape" || e.key === "Tab") {
        suggest.hidden = true;
        setActiveIndex(-1);
      } else if (e.key === "Enter") {
        suggest.hidden = true;
        const q = String(input.value || "").trim().toLowerCase();
        let chosen = null;
        if (q) {
          chosen = taskIndex.find((it) => it.taskLower === q) || null;
        }
        if (!chosen && activeIndex >= 0 && lastMatches[activeIndex]) chosen = lastMatches[activeIndex];
        setActiveIndex(-1);
        if (chosen) {
          applyFilters();
          scrollToTaskRow(chosen.rowEl);
        }
      }
    });
    document.addEventListener("click", (e) => {
      if (!searchWrap.contains(e.target)) {
        suggest.hidden = true;
        setActiveIndex(-1);
      }
    });

    // Match Composite Tasks Activity behavior: selecting a category scrolls to it (no filtering).
    catSelect.addEventListener("change", () => {
      const id = catSelect.value;
      if (!id) return;
      const meta = fixtureEls.get(id);
      const sectionEl =
        meta?.sectionEl ||
        document.querySelector(`section.rc-atomic-fixture[data-fixture-id="${cssEscape(id)}"]`);
      if (!sectionEl) return;
      sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    applyFilters();
  });
})();

