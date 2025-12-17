const images = Array.from(document.querySelectorAll(".jubilee-scroll img"));

const lightbox = document.getElementById("jubilee-lightbox");
const lightboxImg = document.getElementById("jubilee-lightbox-img");
const prevBtn = document.getElementById("jubilee-prev");
const nextBtn = document.getElementById("jubilee-next");
const autoplayToggle = document.getElementById("jubilee-autoplay-toggle");

const snowContainer = document.getElementById("jubilee-snow-container");

let index = 0;
let autoplay = true;
let autoplayTimer;
let snowflakes = [];
let snowActive = false;

/* Thumbnail → Lightbox */
images.forEach((img, i) => {
  img.addEventListener("click", () => {
    index = i;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.style.display = "flex";
  updateImage();
  startAutoplay();
  startSnow();
}

function updateImage() {
  lightboxImg.src = images[index].src;
}

/* Navigation */
nextBtn.onclick = () => {
  index = (index + 1) % images.length;
  updateImage();
};

prevBtn.onclick = () => {
  index = (index - 1 + images.length) % images.length;
  updateImage();
};

/* Lightbox schließen */
lightbox.onclick = e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    stopAutoplay();
    stopSnow();
  }
};

/* Autoplay */
function startAutoplay() {
  if (!autoplay) return;
  autoplayTimer = setInterval(() => {
    index = (index + 1) % images.length;
    updateImage();
  }, 3000);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

autoplayToggle.onclick = () => {
  autoplay = !autoplay;
  autoplayToggle.textContent = autoplay ? "||" : "▶︎";
  autoplay ? startAutoplay() : stopAutoplay();
};

/* Schnee */
function startSnow() {
  if (snowActive) return;
  snowActive = true;

  snowContainer.style.display = "block";

  for (let i = 0; i < 80; i++) {
    const flake = document.createElement("div");
    flake.className = "jubilee-snowflake";

    const size = Math.random() * 4 + 2;
    flake.style.width = size + "px";
    flake.style.height = size + "px";
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.animationDuration = Math.random() * 3 + 3 + "s";
    flake.style.animationDelay = Math.random() * 5 + "s";

    snowContainer.appendChild(flake);
    snowflakes.push(flake);
  }
}

function stopSnow() {
  snowActive = false;
  snowContainer.style.display = "none";
  snowflakes.forEach(flake => flake.remove());
  snowflakes = [];
}
