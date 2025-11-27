const wheel = document.getElementById("wheel");

// Prêmios na ordem das fatias
const prizes = [
  { text: "R$ 50", class: "win" },
  { text: "Nada", class: "nada" },
  { text: "R$ 0,05", class: "kit" },
  { text: "Nada", class: "nada" },
  { text: "R$ 1,50", class: "kit" },
  { text: "Nada", class: "nada" }
];

const sliceAngle = 360 / prizes.length;

// Criar fatias
prizes.forEach((item, i) => {
  const slice = document.createElement("div");
  slice.className = `slice ${item.class}`;
  slice.style.transform = `rotate(${i * sliceAngle}deg) skewY(${90 - sliceAngle}deg)`;
  slice.innerHTML = `
    <span style="
      transform: skewY(${-(90 - sliceAngle)}deg) rotate(${sliceAngle / 2}deg);
      position: absolute; 
      left: 10px;
    ">
      ${item.text}
    </span>`;
  wheel.appendChild(slice);
});

let wheelOpened = false;

function spin() {
  const targetRotation = 183 * 9;

  wheel.style.transform = `rotate(${targetRotation}deg)`;

  const btn = document.getElementById("spinBtn");
  if (btn) btn.style.display = "none";
}

wheel.addEventListener("transitionend", () => {
  if (!wheelOpened) return;

  document.getElementById("winPopup").style.display = "flex";

  const winLight = document.getElementById("win-light");
  winLight.classList.add("active");

  setTimeout(() => {
    winLight.classList.remove("active");
  }, 1200);
});

document.getElementById("openWheelBtn").addEventListener("click", () => {
  document.getElementById("openWheelBtn").style.display = "none";
  document.querySelector(".wheel-container").style.display = "flex";
  wheelOpened = true;
});

document.getElementById("claimPrizeBtn").addEventListener("click", () => {
  document.getElementById("winPopup").style.display = "none";
  document.getElementById("prizeModal").style.display = "flex";
});
