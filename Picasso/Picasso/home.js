const rotatingLink = document.getElementById("rotating-link");
const homeLinks = document.getElementById("home-links");

const items = [
  { label: "Data Sculptures", href: "./data-sculptures.html" },
  { label: "NFTs", href: "./nfts.html" },
];

let idx = 0;
const FADE_MS = 620;
const DISPLAY_MS = 2500;
const LINKS_REVEAL_DELAY_MS = 180;

function render() {
  const item = items[idx];
  rotatingLink.textContent = item.label;
  rotatingLink.href = item.href;
}

render();

function showFinalLinks() {
  rotatingLink.hidden = true;
  homeLinks.hidden = false;
  setTimeout(() => {
    requestAnimationFrame(() => {
      homeLinks.classList.add("is-visible");
    });
  }, LINKS_REVEAL_DELAY_MS);
}

function step() {
  if (idx >= items.length - 1) {
    showFinalLinks();
    return;
  }

  rotatingLink.classList.add("is-fading");
  setTimeout(() => {
    idx += 1;
    render();
    rotatingLink.classList.remove("is-fading");
    setTimeout(step, DISPLAY_MS);
  }, FADE_MS);
}

setTimeout(step, DISPLAY_MS);
