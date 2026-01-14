# Fixtures

Each kitchen scene contains a wide variety of interactable fixtures. Specifically, RoboCasa includes a total of 456 fixtures spanning 12 distinct categories.

| Category | Unique models |
|----------|---------------|
| Blender | 22 |
| Coffee machine | 48 |
| Dishwasher | 25 |
| Electric kettle | 25 |
| Fridge | 50 |
| Microwave | 50 |
| Oven | 21 |
| Sink | 49 |
| Stand mixer | 25 |
| Stove | 50 |
| Toaster | 44 |
| Toaster oven | 47 |
| **Total** | **456** |

<style>
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
</style>

<!-- Modal HTML -->
<div id="fixtureModal" class="fixture-modal">
  <span class="modal-close" onclick="closeFixtureModal()">&times;</span>
  <span class="modal-nav modal-prev" onclick="navigateFixtureModal(-1)">&#10094;</span>
  <span class="modal-nav modal-next" onclick="navigateFixtureModal(1)">&#10095;</span>
  <div class="modal-content">
    <img id="fixtureModalImage" src="" alt="Fixture">
    <div id="fixtureModalLabel" class="modal-label"></div>
  </div>
  <div class="modal-slider-container">
    <span class="modal-counter" id="fixtureModalCounter">1 / 1</span>
    <input type="range" class="modal-slider" id="fixtureModalSlider" min="0" value="0" onchange="fixtureSliderChange(this.value)" oninput="fixtureSliderChange(this.value)">
  </div>
</div>

<div class="fixture-section collapsed" id="microwaveSection">
  <div class="fixture-section-header" onclick="toggleFixtureSection('microwaveSection')">
    <span class="fixture-toggle">▼</span>
    <h2>Microwave</h2>
  </div>
  <div class="fixture-section-content">
    <div class="fixture-grid" id="microwaveGrid">
      <div class="fixture-item" data-id="1"><img src="../_static/fixtures/microwaves/1.png"><div class="label">Microwave 1</div></div>
      <div class="fixture-item" data-id="2"><img src="../_static/fixtures/microwaves/2.png"><div class="label">Microwave 2</div></div>
      <div class="fixture-item" data-id="3"><img src="../_static/fixtures/microwaves/3.png"><div class="label">Microwave 3</div></div>
      <div class="fixture-item" data-id="4"><img src="../_static/fixtures/microwaves/4.png"><div class="label">Microwave 4</div></div>
      <div class="fixture-item" data-id="5"><img src="../_static/fixtures/microwaves/5.png"><div class="label">Microwave 5</div></div>
      <div class="fixture-item" data-id="6"><img src="../_static/fixtures/microwaves/6.png"><div class="label">Microwave 6</div></div>
      <div class="fixture-item" data-id="7"><img src="../_static/fixtures/microwaves/7.png"><div class="label">Microwave 7</div></div>
      <div class="fixture-item" data-id="8"><img src="../_static/fixtures/microwaves/8.png"><div class="label">Microwave 8</div></div>
      <div class="fixture-item" data-id="9"><img src="../_static/fixtures/microwaves/9.png"><div class="label">Microwave 9</div></div>
      <div class="fixture-item" data-id="10"><img src="../_static/fixtures/microwaves/10.png"><div class="label">Microwave 10</div></div>
      <div class="fixture-item" data-id="11"><img src="../_static/fixtures/microwaves/11.png"><div class="label">Microwave 11</div></div>
      <div class="fixture-item" data-id="12"><img src="../_static/fixtures/microwaves/12.png"><div class="label">Microwave 12</div></div>
      <div class="fixture-item" data-id="13"><img src="../_static/fixtures/microwaves/13.png"><div class="label">Microwave 13</div></div>
      <div class="fixture-item" data-id="14"><img src="../_static/fixtures/microwaves/14.png"><div class="label">Microwave 14</div></div>
      <div class="fixture-item" data-id="15"><img src="../_static/fixtures/microwaves/15.png"><div class="label">Microwave 15</div></div>
      <div class="fixture-item" data-id="16"><img src="../_static/fixtures/microwaves/16.png"><div class="label">Microwave 16</div></div>
      <div class="fixture-item" data-id="17"><img src="../_static/fixtures/microwaves/17.png"><div class="label">Microwave 17</div></div>
      <div class="fixture-item" data-id="18"><img src="../_static/fixtures/microwaves/18.png"><div class="label">Microwave 18</div></div>
      <div class="fixture-item" data-id="19"><img src="../_static/fixtures/microwaves/19.png"><div class="label">Microwave 19</div></div>
      <div class="fixture-item" data-id="20"><img src="../_static/fixtures/microwaves/20.png"><div class="label">Microwave 20</div></div>
      <div class="fixture-item" data-id="21"><img src="../_static/fixtures/microwaves/21.png"><div class="label">Microwave 21</div></div>
      <div class="fixture-item" data-id="22"><img src="../_static/fixtures/microwaves/22.png"><div class="label">Microwave 22</div></div>
      <div class="fixture-item" data-id="23"><img src="../_static/fixtures/microwaves/23.png"><div class="label">Microwave 23</div></div>
      <div class="fixture-item" data-id="24"><img src="../_static/fixtures/microwaves/24.png"><div class="label">Microwave 24</div></div>
      <div class="fixture-item" data-id="25"><img src="../_static/fixtures/microwaves/25.png"><div class="label">Microwave 25</div></div>
      <div class="fixture-item" data-id="26"><img src="../_static/fixtures/microwaves/26.png"><div class="label">Microwave 26</div></div>
      <div class="fixture-item" data-id="27"><img src="../_static/fixtures/microwaves/27.png"><div class="label">Microwave 27</div></div>
      <div class="fixture-item" data-id="28"><img src="../_static/fixtures/microwaves/28.png"><div class="label">Microwave 28</div></div>
      <div class="fixture-item" data-id="29"><img src="../_static/fixtures/microwaves/29.png"><div class="label">Microwave 29</div></div>
      <div class="fixture-item" data-id="30"><img src="../_static/fixtures/microwaves/30.png"><div class="label">Microwave 30</div></div>
      <div class="fixture-item" data-id="31"><img src="../_static/fixtures/microwaves/31.png"><div class="label">Microwave 31</div></div>
      <div class="fixture-item" data-id="32"><img src="../_static/fixtures/microwaves/32.png"><div class="label">Microwave 32</div></div>
      <div class="fixture-item" data-id="33"><img src="../_static/fixtures/microwaves/33.png"><div class="label">Microwave 33</div></div>
      <div class="fixture-item" data-id="34"><img src="../_static/fixtures/microwaves/34.png"><div class="label">Microwave 34</div></div>
      <div class="fixture-item" data-id="35"><img src="../_static/fixtures/microwaves/35.png"><div class="label">Microwave 35</div></div>
      <div class="fixture-item" data-id="36"><img src="../_static/fixtures/microwaves/36.png"><div class="label">Microwave 36</div></div>
      <div class="fixture-item" data-id="37"><img src="../_static/fixtures/microwaves/37.png"><div class="label">Microwave 37</div></div>
      <div class="fixture-item" data-id="38"><img src="../_static/fixtures/microwaves/38.png"><div class="label">Microwave 38</div></div>
      <div class="fixture-item" data-id="39"><img src="../_static/fixtures/microwaves/39.png"><div class="label">Microwave 39</div></div>
      <div class="fixture-item" data-id="40"><img src="../_static/fixtures/microwaves/40.png"><div class="label">Microwave 40</div></div>
      <div class="fixture-item" data-id="41"><img src="../_static/fixtures/microwaves/41.png"><div class="label">Microwave 41</div></div>
      <div class="fixture-item" data-id="42"><img src="../_static/fixtures/microwaves/42.png"><div class="label">Microwave 42</div></div>
      <div class="fixture-item" data-id="43"><img src="../_static/fixtures/microwaves/43.png"><div class="label">Microwave 43</div></div>
      <div class="fixture-item" data-id="44"><img src="../_static/fixtures/microwaves/44.png"><div class="label">Microwave 44</div></div>
      <div class="fixture-item" data-id="45"><img src="../_static/fixtures/microwaves/45.png"><div class="label">Microwave 45</div></div>
      <div class="fixture-item" data-id="46"><img src="../_static/fixtures/microwaves/46.png"><div class="label">Microwave 46</div></div>
      <div class="fixture-item" data-id="47"><img src="../_static/fixtures/microwaves/47.png"><div class="label">Microwave 47</div></div>
      <div class="fixture-item" data-id="48"><img src="../_static/fixtures/microwaves/48.png"><div class="label">Microwave 48</div></div>
      <div class="fixture-item" data-id="49"><img src="../_static/fixtures/microwaves/49.png"><div class="label">Microwave 49</div></div>
      <div class="fixture-item" data-id="50"><img src="../_static/fixtures/microwaves/50.png"><div class="label">Microwave 50</div></div>
    </div>
  </div>
</div>

<script>
// Toggle collapsible sections
function toggleFixtureSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.classList.toggle('collapsed');
}

// Fixture modal variables
let currentFixtures = [];
let currentFixtureIndex = 0;
let currentFixtureGridId = '';

function openFixtureModal(gridId, index) {
  currentFixtureGridId = gridId;
  const grid = document.getElementById(gridId);
  currentFixtures = Array.from(grid.querySelectorAll('.fixture-item'));
  currentFixtureIndex = index;
  
  const slider = document.getElementById('fixtureModalSlider');
  slider.max = currentFixtures.length - 1;
  slider.value = currentFixtureIndex;
  
  updateFixtureModalContent();
  document.getElementById('fixtureModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFixtureModal() {
  document.getElementById('fixtureModal').classList.remove('active');
  document.body.style.overflow = '';
}

function updateFixtureModalContent() {
  const item = currentFixtures[currentFixtureIndex];
  const img = item.querySelector('img');
  const label = item.querySelector('.label');
  
  document.getElementById('fixtureModalImage').src = img.src;
  document.getElementById('fixtureModalLabel').textContent = label.textContent;
  document.getElementById('fixtureModalSlider').value = currentFixtureIndex;
  document.getElementById('fixtureModalCounter').textContent = (currentFixtureIndex + 1) + ' / ' + currentFixtures.length;
}

function navigateFixtureModal(direction) {
  currentFixtureIndex += direction;
  if (currentFixtureIndex < 0) currentFixtureIndex = currentFixtures.length - 1;
  if (currentFixtureIndex >= currentFixtures.length) currentFixtureIndex = 0;
  updateFixtureModalContent();
}

function fixtureSliderChange(value) {
  currentFixtureIndex = parseInt(value);
  updateFixtureModalContent();
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('fixtureModal');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'Escape') closeFixtureModal();
    if (e.key === 'ArrowLeft') navigateFixtureModal(-1);
    if (e.key === 'ArrowRight') navigateFixtureModal(1);
  }
});

// Close modal when clicking outside the image
document.getElementById('fixtureModal').addEventListener('click', function(e) {
  if (e.target === this) closeFixtureModal();
});

// Add click handlers to fixture items
function initFixtureClicks() {
  // Add all fixture grid IDs here as you add more fixture categories
  const fixtureGridIds = ['microwaveGrid'];
  
  fixtureGridIds.forEach(function(gridId) {
    const grid = document.getElementById(gridId);
    if (grid) {
      const items = grid.querySelectorAll('.fixture-item');
      items.forEach(function(item, index) {
        item.onclick = function() { openFixtureModal(gridId, index); };
      });
    }
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFixtureClicks);
} else {
  initFixtureClicks();
}
</script>

