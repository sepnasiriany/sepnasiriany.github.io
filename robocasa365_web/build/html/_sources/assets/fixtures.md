# Fixtures

<p class="fixtures-intro">Each kitchen scene contains a wide variety of interactable fixtures. Specifically, RoboCasa includes a total of 456 fixtures spanning 12 distinct categories.</p>

<div class="fixtures-table-wrap">
  <table class="rc-benchmark-table rc-fixtures-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Unique models</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Blender</td><td>22</td></tr>
    <tr><td>Coffee machine</td><td>48</td></tr>
    <tr><td>Dishwasher</td><td>25</td></tr>
    <tr><td>Electric kettle</td><td>25</td></tr>
    <tr><td>Fridge</td><td>50</td></tr>
    <tr><td>Microwave</td><td>50</td></tr>
    <tr><td>Oven</td><td>21</td></tr>
    <tr><td>Sink</td><td>49</td></tr>
    <tr><td>Stand mixer</td><td>25</td></tr>
    <tr><td>Stove</td><td>50</td></tr>
    <tr><td>Toaster</td><td>44</td></tr>
    <tr><td>Toaster oven</td><td>47</td></tr>
    <tr><td><strong>Total</strong></td><td><strong>456</strong></td></tr>
  </tbody>
  </table>
</div>

<style>
/* Page width: use more of the available horizontal space (fixtures page only) */
.bd-main .bd-content .bd-article-container {
  max-width: none;
}

/* Intro */
.fixtures-intro {
  margin: 0.2rem 0 0.9rem 0;
}

/* Match Atomic/Composite table styling (numeric alignment) */
table.rc-fixtures-table th:nth-child(2),
table.rc-fixtures-table td:nth-child(2) {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* Table below intro, left-aligned */
.fixtures-table-wrap {
  width: 100%;
  max-width: 38rem;
  margin: 0 0 1.2rem 0; /* left-aligned by default */
}

.fixtures-table-wrap table.rc-fixtures-table {
  font-size: 0.92em;
}

.fixtures-table-wrap table.rc-fixtures-table th,
.fixtures-table-wrap table.rc-fixtures-table td {
  padding: 0.38rem 0.48rem;
}

.fixture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.fixture-item {
  text-align: center;
  cursor: pointer;
}
.fixture-item img {
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(128,128,128,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.fixture-item img:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.fixture-item .label {
  font-size: 12px;
  margin-top: 4px;
  color: inherit;
  opacity: 0.8;
}

/* Modal/Lightbox styles */
.fixture-modal {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
  overflow: hidden;
}
.fixture-modal.active {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-content {
  position: relative;
  max-width: min(90%, 900px);
  max-height: 75vh;
  text-align: center;
}
.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}
.modal-label {
  color: white;
  font-size: 18px;
  margin-top: 12px;
  font-weight: 500;
}
.modal-close {
  position: absolute;
  top: 15px;
  right: 25px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10000;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #3498db;
}
.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
  padding: 20px;
  user-select: none;
  transition: color 0.2s;
  z-index: 10000;
}
.modal-nav:hover {
  color: #3498db;
}
.modal-prev {
  left: 20px;
}
.modal-next {
  right: 20px;
}
.modal-slider-container {
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.modal-arrow {
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  padding: 6px 10px;
  user-select: none;
}
.modal-arrow:hover {
  color: #3498db;
}
.modal-arrow:focus-visible {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}
.modal-arrow[disabled] {
  opacity: 0.35;
  cursor: default;
}
.modal-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: rgba(255,255,255,0.3);
  border-radius: 4px;
  outline: none;
}
.modal-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3498db;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-slider::-webkit-slider-thumb:hover {
  background: #2980b9;
}
.modal-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3498db;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
.modal-counter {
  color: white;
  font-size: 14px;
  min-width: 60px;
  text-align: center;
}

/* Collapsible section styles */
.fixture-section {
  margin-bottom: 24px;
}
.fixture-section-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 8px 0;
  border-bottom: 1px solid rgba(128,128,128,0.3);
  margin-bottom: 8px;
}
.fixture-section-header:hover {
  opacity: 0.8;
}
.fixture-section-header h2 {
  margin: 0;
  font-size: 1.5em;
}
.fixture-toggle {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #3498db;
  transition: transform 0.2s;
}
.fixture-section.collapsed .fixture-toggle {
  transform: rotate(-90deg);
}
.fixture-section-content {
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  max-height: 5000px;
  opacity: 1;
}
.fixture-section.collapsed .fixture-section-content {
  max-height: 0;
  opacity: 0;
}

.fixture-viewer {
  margin-top: 12px;
  max-width: 520px;
}

.fixture-inline-slider-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.fixture-inline-counter {
  font-size: 14px;
  min-width: 70px;
  text-align: center;
  opacity: 0.9;
}

.fixture-inline-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: rgba(128, 128, 128, 0.22);
  border-radius: 4px;
  outline: none;
}

.fixture-inline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #3498db;
  border-radius: 50%;
  cursor: pointer;
}

.fixture-inline-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #3498db;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* Fixture cards layout: show ~2 per row on desktop */
.fixtures-viewers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 24px;
  align-items: start;
  margin-top: 16px;
}

@media (max-width: 1000px) {
  .fixtures-viewers-grid {
    grid-template-columns: 1fr;
  }
}

.fixture-card {
  border: 1px solid var(--pst-color-border, rgba(128, 128, 128, 0.3));
  border-radius: 12px;
  padding: 14px 14px 16px;
  background: var(--pst-color-surface, rgba(127, 127, 127, 0.04));
}

.fixture-card-title {
  margin: 0 0 10px 0;
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1.15;
  text-align: center;
}

.fixture-viewer {
  margin-top: 0;
  max-width: none;
}

.fixture-preview-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: none; /* avoid letterboxing whitespace */
  object-fit: initial;
  background: transparent;
}
</style>

<!-- Modal HTML -->
<div id="fixtureModal" class="fixture-modal">
  <span class="modal-close" onclick="closeFixtureModal()">&times;</span>
  <div class="modal-content">
    <img id="fixtureModalImage" src="" alt="Fixture">
    <div id="fixtureModalLabel" class="modal-label"></div>
  </div>
  <div class="modal-slider-container">
    <button type="button" class="modal-arrow" id="fixtureModalPrev" aria-label="Previous style" onclick="fixtureModalStep(-1)">&#8249;</button>
    <span class="modal-counter" id="fixtureModalCounter">1 / 1</span>
    <input type="range" class="modal-slider" id="fixtureModalSlider" min="1" value="1" onchange="fixtureModalSliderChange(this.value)" oninput="fixtureModalSliderChange(this.value)">
    <button type="button" class="modal-arrow" id="fixtureModalNext" aria-label="Next style" onclick="fixtureModalStep(1)">&#8250;</button>
  </div>
</div>

<div class="fixtures-viewers-grid">
  <div class="fixture-card">
    <h2 class="fixture-card-title">Microwave</h2>
    <div class="fixture-viewer" data-name="Microwave" data-base="../_static/fixtures/microwaves" data-ids="36,40,15,4,37,30,9,42,26,47,38,18,49,57,16,20,31,17,45,12,33,8,44,55,22,11,1,6,23,46,60,34,28,41,48,50,56,27,21,54,59,13,29,19,7,2,58,39,14,3" data-style-groups="1;2|3;4;5;6;7|9;8;10;11;12|35|60;13|23;14;15;16;17;18;19;20;21|46;22;24;25;26;27|38|49;28;29;30;31;32;33;34;36;37|52;39;40;41|48;42;43;44;45;47;50;51;53;54;55;56;57;58;59">
      <div class="fixture-item fixture-preview" role="button" tabindex="0">
        <img class="fixture-preview-image" src="../_static/fixtures/microwaves/36.png" alt="Microwave">
        <div class="label fixture-preview-label">Style</div>
      </div>
      <div class="fixture-inline-slider-container">
        <span class="fixture-inline-counter" aria-label="Current fixture" data-role="counter">1 / 50</span>
        <input type="range" class="fixture-inline-slider" min="1" max="50" value="1" aria-label="Microwave index">
      </div>
    </div>
  </div>

  <div class="fixture-card">
    <h2 class="fixture-card-title">Sink</h2>
    <div class="fixture-viewer" data-name="Sink" data-base="../_static/fixtures/sinks" data-ids="36,40,32,4,37,30,9,51,42,26,47,38,18,49,57,16,20,31,17,45,12,52,33,8,44,55,22,11,1,6,23,60,43,28,5,48,56,27,21,54,10,59,25,13,29,19,7,39,14" data-style-groups="1;2;3|4;5;6;7;8;9;10;11|56;12;13;14;15;16;17;18;19;20;21;22;23;24|39|55;25;26|36;27;28;29;30;31|33;32|41;34;35;37;38|52;40;42|49;43;44;45;46;47;48;50;51;53;54;57|59;58|60">
      <div class="fixture-item fixture-preview" role="button" tabindex="0">
        <img class="fixture-preview-image" src="../_static/fixtures/sinks/36.png" alt="Sink">
        <div class="label fixture-preview-label">Style</div>
      </div>
      <div class="fixture-inline-slider-container">
        <span class="fixture-inline-counter" aria-label="Current fixture" data-role="counter">1 / 49</span>
        <input type="range" class="fixture-inline-slider" min="1" max="49" value="1" aria-label="Sink index">
      </div>
    </div>
  </div>

  <div class="fixture-card">
    <h2 class="fixture-card-title">Stove</h2>
    <div class="fixture-viewer" data-name="Stove" data-base="../_static/fixtures/stoves" data-ids="36,40,32,30,9,26,38,18,16,20,31,33,8,44,22,11,19" data-style-groups="1|4|6;2|5;3|10;7|9;8;11|12|32|35|39|57;13|15|37|44|59;14|16|22|27|30|51;17|23|58;18|20|21|38|41|46|52;19|34|45;24|40|60;25|42|48|54;26|33|43|47;28|31|36|50;29|49|55;53|56">
      <div class="fixture-item fixture-preview" role="button" tabindex="0">
        <img class="fixture-preview-image" src="../_static/fixtures/stoves/36.png" alt="Stove">
        <div class="label fixture-preview-label">Style</div>
      </div>
      <div class="fixture-inline-slider-container">
        <span class="fixture-inline-counter" aria-label="Current fixture" data-role="counter">1 / 17</span>
        <input type="range" class="fixture-inline-slider" min="1" max="17" value="1" aria-label="Stove index">
      </div>
    </div>
  </div>
</div>

<script>

// Fixture modal state (single-preview + slider)
let currentViewer = null;

function closeFixtureModal() {
  document.getElementById('fixtureModal').classList.remove('active');
  document.body.style.overflow = '';
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function getViewerIds(viewer) {
  const idsAttr = viewer.dataset.ids;
  if (idsAttr) {
    return idsAttr.split(',').map(s => parseInt(s.trim(), 10)).filter(n => Number.isFinite(n));
  }
  const count = parseInt(viewer.dataset.count || "1", 10);
  return Array.from({ length: count }, (_, i) => i + 1);
}

function getViewerStyleGroups(viewer) {
  // Format: "1|2;3;4|5|6" (groups separated by ';', style ids inside group separated by '|')
  // Cached on the element to avoid re-parsing on every slider update.
  if (viewer._rcStyleGroups) return viewer._rcStyleGroups;
  const raw = viewer.dataset.styleGroups;
  if (!raw) return null;
  const groups = raw.split(';').map(g => g.trim()).filter(Boolean).map(g => {
    return g.split('|').map(s => parseInt(s.trim(), 10)).filter(n => Number.isFinite(n));
  });
  viewer._rcStyleGroups = groups;
  return groups;
}

function sortViewerByStyleOrder(viewer) {
  // Sort the IDs and style groups by the minimum style number in each group
  const styleGroups = getViewerStyleGroups(viewer);
  
  if (!styleGroups || styleGroups.length === 0) return;
  
  // Get IDs (either from data-ids or generate from data-count)
  let ids = getViewerIds(viewer);
  
  if (ids.length !== styleGroups.length) return; // Safety check
  
  // Create array of {id, styleGroup, minStyle} for sorting
  const items = ids.map((id, index) => {
    const group = styleGroups[index] || [id];
    const minStyle = Math.min(...group);
    return { id, styleGroup: group, minStyle, originalIndex: index };
  });
  
  // Sort by minimum style number
  items.sort((a, b) => a.minStyle - b.minStyle);
  
  // Update the data attributes with sorted order
  const sortedIds = items.map(item => item.id);
  const sortedStyleGroups = items.map(item => item.styleGroup);
  
  // Update data-ids (create it if it doesn't exist, or update if it does)
  viewer.dataset.ids = sortedIds.join(',');
  
  // Update data-style-groups
  const sortedStyleGroupsStr = sortedStyleGroups.map(g => g.join('|')).join(';');
  viewer.dataset.styleGroups = sortedStyleGroupsStr;
  
  // Remove data-count if it exists (since we now have data-ids)
  if (viewer.hasAttribute('data-count')) {
    viewer.removeAttribute('data-count');
  }
  
  // Clear cache so it gets re-parsed with new order
  viewer._rcStyleGroups = null;
}

function getStyleLabelForPos(viewer, pos, fallbackId) {
  const groups = getViewerStyleGroups(viewer);
  const group = (groups && groups[pos - 1] && groups[pos - 1].length) ? groups[pos - 1] : [fallbackId];
  return `Style ${group.join('/')}`;
}

function setViewerIndex(viewer, index) {
  const base = viewer.dataset.base;
  const ids = getViewerIds(viewer);
  const count = ids.length;
  const pos = clamp(parseInt(index, 10) || 1, 1, count);
  const imageId = ids[pos - 1];

  const img = viewer.querySelector('.fixture-preview-image');
  const label = viewer.querySelector('.fixture-preview-label');
  const counter = viewer.querySelector('.fixture-inline-counter');
  const slider = viewer.querySelector('.fixture-inline-slider');

  const src = `${base}/${imageId}.png`;
  const styleLabel = getStyleLabelForPos(viewer, pos, imageId);
  if (img) {
    img.src = src;
    img.alt = styleLabel;
  }
  if (label) label.textContent = styleLabel;
  if (counter) counter.textContent = `${pos} / ${count}`;
  if (slider) slider.value = String(pos);

  viewer.dataset.current = String(pos);

  // Keep modal in sync if it’s open for this viewer
  if (currentViewer === viewer) {
    setModalIndex(pos);
  }
}

function setModalIndex(index) {
  if (!currentViewer) return;
  const base = currentViewer.dataset.base;
  const ids = getViewerIds(currentViewer);
  const count = ids.length;
  const pos = clamp(parseInt(index, 10) || 1, 1, count);
  const imageId = ids[pos - 1];

  const modalImg = document.getElementById('fixtureModalImage');
  const modalLabel = document.getElementById('fixtureModalLabel');
  const modalCounter = document.getElementById('fixtureModalCounter');
  const modalSlider = document.getElementById('fixtureModalSlider');
  const modalPrev = document.getElementById('fixtureModalPrev');
  const modalNext = document.getElementById('fixtureModalNext');

  const src = `${base}/${imageId}.png`;
  const styleLabel = getStyleLabelForPos(currentViewer, pos, imageId);
  if (modalImg) modalImg.src = src;
  if (modalLabel) modalLabel.textContent = styleLabel;
  if (modalCounter) modalCounter.textContent = `${pos} / ${count}`;
  if (modalSlider) modalSlider.value = String(pos);
  if (modalPrev) modalPrev.disabled = pos <= 1;
  if (modalNext) modalNext.disabled = pos >= count;
}

function openFixtureModalForViewer(viewer) {
  currentViewer = viewer;
  const ids = getViewerIds(viewer);
  const count = ids.length;
  const pos = parseInt(viewer.dataset.current || "1", 10) || 1;

  const modalSlider = document.getElementById('fixtureModalSlider');
  modalSlider.min = "1";
  modalSlider.max = String(count);

  setModalIndex(pos);
  document.getElementById('fixtureModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fixtureModalSliderChange(value) {
  if (!currentViewer) return;
  // Update both modal and preview (no arrows; slider is the only navigator)
  setModalIndex(value);
  setViewerIndex(currentViewer, value);
}

function fixtureModalStep(delta) {
  if (!currentViewer) return;
  const ids = getViewerIds(currentViewer);
  const count = ids.length;
  const cur = parseInt(currentViewer.dataset.current || "1", 10) || 1;
  const next = clamp(cur + delta, 1, count);
  if (next === cur) return;
  setModalIndex(next);
  setViewerIndex(currentViewer, next);
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('fixtureModal');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeFixtureModal();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      fixtureModalStep(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      fixtureModalStep(1);
    }
  }
});

// Close modal when clicking outside the image
document.getElementById('fixtureModal').addEventListener('click', function(e) {
  if (e.target === this) closeFixtureModal();
});

function initFixtureViewers() {
  const viewers = document.querySelectorAll('.fixture-viewer');
  viewers.forEach(function(viewer) {
    // Sort styles by order (minimum style number in each group)
    sortViewerByStyleOrder(viewer);
    
    // Initialize to the first image
    setViewerIndex(viewer, 1);

    const slider = viewer.querySelector('.fixture-inline-slider');
    const preview = viewer.querySelector('.fixture-preview');
    if (slider) {
      // Ensure slider max matches the actual id list length (if provided)
      const ids = getViewerIds(viewer);
      slider.max = String(ids.length);
      slider.addEventListener('input', function() {
        setViewerIndex(viewer, this.value);
      });
    }

    // Click (or Enter/Space) opens modal. Slider stays usable both inline & in modal.
    if (preview) {
      preview.addEventListener('click', function() {
        openFixtureModalForViewer(viewer);
      });
      preview.addEventListener('keydown', function(ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          openFixtureModalForViewer(viewer);
        }
      });
    }
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFixtureViewers);
} else {
  initFixtureViewers();
}
</script>

