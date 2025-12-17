// <script>
  /* Script for Jubilee Gallery (Lightbox + Snowfall without canvas) */

  const images = Array.from(document.querySelectorAll(".jubilee-gallery img"));
  const lightbox = document.getElementById("jubilee-lightbox");
  const lightboxImg = document.getElementById("jubilee-lightbox-img");
  const prevBtn = document.getElementById("jubilee-prev");
  const nextBtn = document.getElementById("jubilee-next");

  const snowContainer = document.getElementById("jubilee-snow-container");
  let index = 0;
  let snowflakes = [];
  let snowActive = false;

  /* ---------------------------
  Event Listener for thumbnails
  --------------------------- */
  images.forEach((img, i) => {
  img.addEventListener("click", () => {
    index = i;
    showImage();
  });
});

  /* ---------------------------
  Lightbox anzeigen
  --------------------------- */
  function showImage() {
  lightboxImg.src = images[index].src;
  lightbox.style.display = "flex";
  startSnow();
}

  /* ---------------------------
  Navigation
  --------------------------- */
  nextBtn.onclick = () => {
  index = (index + 1) % images.length;
  showImage();
};

  prevBtn.onclick = () => {
  index = (index - 1 + images.length) % images.length;
  showImage();
};

  /* ---------------------------
  Lightbox schließen
  --------------------------- */
  lightbox.onclick = e => {
  if (e.target === lightbox) {
  lightbox.style.display = "none";
  stopSnow();
}
};

  /* ---------------------------
  Schneefall starten
  --------------------------- */
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

  /* ---------------------------
  Schneefall stoppen
  --------------------------- */
  function stopSnow() {
  snowActive = false;
  snowContainer.style.display = "none";

  snowflakes.forEach(flake => flake.remove());
  snowflakes = [];
}
// </script>
