// =========================
//   ELEMENTOS DA INTERFACE
// =========================

const openWheelBtn = document.getElementById("openWheelBtn");
const wheelContainer = document.querySelector(".wheel-container");
const spinBtn = document.getElementById("spinBtn");
const wheel = document.getElementById("wheel");

// =========================
//   ABRIR ROLETA
// =========================

openWheelBtn.addEventListener("click", () => {
  openWheelBtn.style.display = "none";
  wheelContainer.style.display = "flex";
  wheelOpened = true;
});

// =========================
//     CRIAR ROLETA
// =========================

const prizes = [
  { text: "R$ 50", class: "win" },
  { text: "Nada", class: "nada" },
  { text: "R$0,05", class: "kit" },
  { text: "Nada", class: "nada" },
  { text: "R$1,50", class: "kit" },
  { text: "Nada", class: "nada" }
];

const sliceAngle = 360 / prizes.length;

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

// =========================
//      GIRAR ROLETA
// =========================

spinBtn.addEventListener("click", spin);

function spin() {
  const targetRotation = 183 * 9; // rotação fake
  wheel.style.transform = `rotate(${targetRotation}deg)`;
  spinBtn.style.display = "none";
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

// =========================
//   BOTÃO REIVINDICAR
// =========================

document.getElementById("claimPrizeBtn").addEventListener("click", () => {
  document.getElementById("winPopup").style.display = "none";
  document.getElementById("prizeModal").style.display = "flex";
});

// =========================
//         FORMULÁRIO
// =========================

document.getElementById("casinoLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.body.innerHTML = "";

  const msg = document.createElement("h1");
  msg.textContent = "PARABÉNS, VOCÊ ACABOU DE CAIR EM UM GOLPE";
  msg.style.fontSize = "32px";
  msg.style.color = "white";
  msg.style.textAlign = "center";
  msg.style.marginTop = "150px";
  msg.style.fontFamily = "Arial, sans-serif";

  document.body.appendChild(msg);
});

// =========================
//     MÁSCARA DE CPF
// =========================

const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, ""); // só números

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 9) {
    value = value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  } else if (value.length > 6) {
    value = value.replace(
      /(\d{3})(\d{3})(\d{3})/,
      "$1.$2.$3"
    );
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{3})/, "$1.$2");
  }

  this.value = value;
});
