const startButton = document.getElementById("timer");
const mainButton = document.getElementById("main");
const galleryButton = document.getElementById("gallery");

const textPart = document.querySelector(".text-part");
const timerDiv = document.querySelector(".timer");
const gallery = document.querySelector(".gallery");

const startDate = new Date("2025-01-27T00:00:00");

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

let intervalId;

// Pokaż licznik
startButton.addEventListener("click", () => {
    textPart.style.display = "none";
    timerDiv.style.display = "block";
    gallery.style.display = "none";
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
});

// Powrót do głównego widoku
mainButton.addEventListener("click", () => {
    timerDiv.style.display = "none";
    gallery.style.display = "none";
    textPart.style.display = "block";
    clearInterval(intervalId);
});

// Galeria
galleryButton.addEventListener("click", () => {
    console.log("Przycisk galeria kliknięty");
    textPart.style.display = "none";
    timerDiv.style.display = "none";
    gallery.innerHTML = "";

    const images = [
        "media/photos/1.jpg",
        "media/photos/2.jpg",
        "media/photos/3.jpg",
        "media/photos/4.jpg"
    ];

    images.forEach((src) => {
        console.log(`Ładowanie obrazu: ${src}`);
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Gallery Image";
        img.classList.add("gallery-image");
        gallery.appendChild(img);
    });

    gallery.style.display = "flex"; // lub "grid"
});
