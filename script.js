// Configuration
const SLIDE_INTERVAL = 5000; // Time between slides in milliseconds
const STAR_COUNT = 150; // Number of stars in the background

// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        starsContainer.appendChild(star);
    }
}

// DOM Elements
const startButton = document.getElementById("timer");
const mainButton = document.getElementById("main");
const galleryButton = document.getElementById("gallery");
const cuteButton = document.getElementById("cute");

const textPart = document.querySelector(".text-part");
const timerDiv = document.querySelector(".timer");
const galleryContainer = document.querySelector(".gallery-container");
const gallerySlideshow = document.querySelector(".gallery-slideshow");
const galleryDots = document.querySelector(".gallery-dots");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const playPauseBtn = document.querySelector(".play-pause-btn");

// Gallery settings
let currentSlide = 0;
let slideInterval;
let isPlaying = true;

// Photo gallery data
const galleryImages = [
    { src: "media/photos/1.jpg" },
    { src: "media/photos/2.jpg" },
    { src: "media/photos/3.jpg" },
    { src: "media/photos/4.jpg" },
    { src: "media/photos/5.jpg" },
    { src: "media/photos/6.jpg" },
    { src: "media/photos/7.jpg" },
    { src: "media/photos/8.jpg" },
    { src: "media/photos/9.jpg" }
];

// Relationship start date
const startDate = new Date("2025-01-27T00:00:00");

// Helper Functions
function pluralize(value, forms) {
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (value === 1) return `${value} ${forms[0]}`;
    if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
        return `${value} ${forms[1]}`;
    }
    return `${value} ${forms[2]}`;
}

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("time-days").textContent = pluralize(days, ["dzień", "dni", "dni"]);
    document.getElementById("time-hours").textContent = pluralize(hours, ["godzina", "godziny", "godzin"]);
    document.getElementById("time-minutes").textContent = pluralize(minutes, ["minuta", "minuty", "minut"]);
    document.getElementById("time-seconds").textContent = pluralize(seconds, ["sekunda", "sekundy", "sekund"]);
}

// Gallery Functions
function createGallery() {
    galleryImages.forEach((image, index) => {
        const slide = document.createElement("img");
        slide.src = image.src;
        slide.alt = `Gallery Image ${index + 1}`;
        slide.classList.add("gallery-slide");
        if (index === 0) slide.classList.add("active");
        gallerySlideshow.appendChild(slide);
    });
}

function showSlide(index) {
    // Get all slides, captions and dots
    const slides = document.querySelectorAll(".gallery-slide");
    const captions = document.querySelectorAll(".gallery-caption");
    const dots = document.querySelectorAll(".gallery-dot");
    
    // Validate index
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    // Update current slide index
    currentSlide = index;
    
    // Hide all slides and captions
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
    
    captions.forEach(caption => {
        caption.style.display = "none";
    });
    
    dots.forEach(dot => {
        dot.classList.remove("active");
    });
    
    // Show current slide and caption
    slides[index].classList.add("active");
    captions[index].style.display = "block";
    dots[index].classList.add("active");
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    // Reset interval when manually changing slides
    clearInterval(slideInterval);
    showSlide(index);
    if (isPlaying) {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
}

function togglePlayPause() {
    if (isPlaying) {
        // Pause slideshow
        clearInterval(slideInterval);
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        // Resume slideshow
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function startGallery() {
    if (!gallerySlideshow.querySelector(".gallery-slide")) {
        createGallery();
    }
    
    // Start slideshow
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Show specific view
function showView(viewName) {
    // Hide all views first
    textPart.style.display = "none";
    timerDiv.style.display = "none";
    galleryContainer.style.display = "none";
    
    // Clear any active intervals
    clearInterval(timerInterval);
    clearInterval(slideInterval);
    
    // Show requested view
    switch(viewName) {
        case "main":
            textPart.style.display = "block";
            break;
        case "gallery":
            galleryContainer.style.display = "block";
            startGallery();
            break;
        case "timer":
            timerDiv.style.display = "block";
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
            break;
        // You can implement "cute" view here
    }
}

// Event Listeners
let timerInterval;

// Main view button
mainButton.addEventListener("click", () => {
    showView("main");
});

// Gallery button
galleryButton.addEventListener("click", () => {
    showView("gallery");
});

// Timer button
startButton.addEventListener("click", () => {
    showView("timer");
});

// Cute button - to be implemented
cuteButton.addEventListener("click", () => {
    // Placeholder for future implementation
    alert("To musze dokonczyc.. ❤️");
});

// Gallery controls
prevBtn.addEventListener("click", () => {
    prevSlide();
    // Reset interval when manually changing slides
    clearInterval(slideInterval);
    if (isPlaying) {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
});

nextBtn.addEventListener("click", () => {
    nextSlide();
    // Reset interval when manually changing slides
    clearInterval(slideInterval);
    if (isPlaying) {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
});

playPauseBtn.addEventListener("click", togglePlayPause);

// Initialize stars and app
createStars();
showView("main");