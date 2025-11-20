// Object to keep track of the current slide for each carousel by ID
let carouselIndices = {};

// Initialize the index for a specific carousel
function initCarousel(carouselId) {
    carouselIndices[carouselId] = 0; // Start with the first slide
}

// Move to the previous set of videos for a specific carousel
function prevSlide(carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
    const totalSlides = slides.length;

    // Decrease the index and loop back if at the beginning
    carouselIndices[carouselId] = (carouselIndices[carouselId] > 0) ? carouselIndices[carouselId] - 1 : totalSlides - 1;
    updateCarousel(carouselId);
}

// Move to the next set of videos for a specific carousel
function nextSlide(carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
    const totalSlides = slides.length;

    // Increase the index and loop back if at the end
    carouselIndices[carouselId] = (carouselIndices[carouselId] < totalSlides - 1) ? carouselIndices[carouselId] + 1 : 0;
    updateCarousel(carouselId);
}

// Update the carousel by shifting the track for a specific carousel
function updateCarousel(carouselId) {
    const currentIndex = carouselIndices[carouselId];
    const track = document.querySelector(`#${carouselId} .carousel-track`);
    
    // Calculate the new transform value based on the current index
    const newTransform = -currentIndex * 100;
    
    // Apply the transform to shift the carousel
    track.style.transform = `translateX(${newTransform}%)`;
}

// Object to keep track of the current example for each example carousel by ID
let exampleIndices = {};

// Initialize the index for a specific example carousel
function initExampleCarousel(exampleId) {
    exampleIndices[exampleId] = 0; // Start with the first example
}

// Move to the previous example for a specific carousel
function prevExample(exampleId) {
    const examples = document.querySelectorAll(`#${exampleId} .example-slide`);
    const totalExamples = examples.length;

    // Decrease the index and loop back if at the beginning
    exampleIndices[exampleId] = (exampleIndices[exampleId] > 0) ? exampleIndices[exampleId] - 1 : totalExamples - 1;
    updateExampleCarousel(exampleId);
}

// Move to the next example for a specific carousel
function nextExample(exampleId) {
    const examples = document.querySelectorAll(`#${exampleId} .example-slide`);
    const totalExamples = examples.length;

    // Increase the index and loop back if at the end
    exampleIndices[exampleId] = (exampleIndices[exampleId] < totalExamples - 1) ? exampleIndices[exampleId] + 1 : 0;
    updateExampleCarousel(exampleId);
}

// Update the example carousel by shifting the track for a specific carousel
function updateExampleCarousel(exampleId) {
    const currentExampleIndex = exampleIndices[exampleId];
    const track = document.querySelector(`#${exampleId} .example-track`);

    // Calculate the new transform value based on the current example index
    const newTransform = -currentExampleIndex * 100;
    
    // Apply the transform to shift the example carousel
    track.style.transform = `translateX(${newTransform}%)`;
}
