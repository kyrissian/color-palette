const generateBtn = document.getElementById("generate-btn");
const colors = document.getElementsByClassName("color");

function rgbToHex(r, g, b) {
  return (
    "#" + [r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")
  );
}

// Generate random colors and update the UI with color values
function generateColors() {
  for (const color of colors) {
    // Skip locked colors
    if (color.getAttribute("data-locked") === "true") continue;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const rgbString = `rgb(${r}, ${g}, ${b})`;
    const hexString = rgbToHex(r, g, b);

    color.style.backgroundColor = rgbString;

    const p = color.querySelector("p");
    p.textContent = hexString;
  }
  generateBtn.classList.add("rotate"); //start animation
  setTimeout(() => {
    generateBtn.classList.remove("rotate"); //stop animation
  }, 500);
}

generateBtn.addEventListener("click", generateColors);

window.addEventListener("DOMContentLoaded", generateColors);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.key.toLowerCase() === "g") {
    generateColors();
  }
});

// Add click event to each lock icon to lock/unlock color
for (const color of colors) {
  const lockSpan = color.querySelector(".lock-icon");

  if (lockSpan) {
    lockSpan.innerHTML = '<i class="fa-solid fa-unlock"></i>';
    lockSpan.addEventListener("click", () => {
      const isLocked = color.getAttribute("data-locked") === "true";

      if (isLocked === true) {
        color.setAttribute("data-locked", "false");
        lockSpan.innerHTML = '<i class="fa-solid fa-unlock"></i>';
      } else {
        color.setAttribute("data-locked", "true");
        lockSpan.innerHTML = '<i class="fa-solid fa-lock"></i>';
      }
    });
  }
}
