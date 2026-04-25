const generateBtn = document.getElementById("generate-btn");
const colors = document.getElementsByClassName("color");
const popup = document.querySelector(".copy-container");

function rgbToHex(r, g, b) {
  return (
    "#" + [r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")
  );
}

// change text color based on background color for better readability
function checkTextContrast(color, htmlElement) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    htmlElement.style.color = "#000";
  } else {
    htmlElement.style.color = "#fff";
  }
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
    checkTextContrast(rgbString, p);

    const lockSpan = color.querySelector(".lock-icon");
    checkTextContrast(rgbString, lockSpan);
  }

  generateBtn.classList.add("rotate"); //start animation
  setTimeout(() => {
    generateBtn.classList.remove("rotate"); //stop animation
  }, 500);
}

generateBtn.addEventListener("click", generateColors);

window.addEventListener("DOMContentLoaded", generateColors);

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "g") {
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

  const p = color.querySelector("p");
  p.addEventListener("click", () => {
    copyToClipboard(p);
  });
}

function copyToClipboard(hex) {
  const elem = document.createElement("textarea");
  elem.value = hex.innerText;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  const popupBox = popup.children[0];
  popup.classList.add("active");
  popupBox.classList.add("active");
}

popup.addEventListener("transitionend", () => {
  const popupBox = popup.children[0];
  popup.classList.remove("active");
  popupBox.classList.remove("active");
});

// Get all modal and button elements
const saveBtn = document.getElementById("save-btn");
const saveContainer = document.querySelector(".save-container");
const closeSave = document.querySelector(".close-save");
const saveSubmit = document.querySelector(".save-submit");
const saveName = document.querySelector(".save-name");

function openPalette() {
  const popup = saveContainer.children[0];
  popup.classList.add("active");
  saveContainer.classList.add("active");
}

function closePalette() {
  const popup = saveContainer.children[0];
  popup.classList.remove("active");
  saveContainer.classList.remove("active");
}

const savedPalettes = [];

// Save current colors as a new palette in local storage and render it in the library
function savePalette() {
  // hide modal after saving
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
  // get palette name from input
  const name = saveName.value;
  const hexColors = [];
  // get current hex color codes from the UI/divs
  const currentHexes = document.querySelectorAll(".color p");
  currentHexes.forEach((hex) => {
    hexColors.push(hex.innerText);
  });

  // create palette object with name and colors
  const paletteObject = { name: name, colors: hexColors };
  // add to savedPalettes array
  savedPalettes.push(paletteObject);
  // save to local storage
  localStorage.setItem("palettes", JSON.stringify(savedPalettes));
  // clear input field
  saveName.value = "";
}

saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
saveSubmit.addEventListener("click", savePalette);
