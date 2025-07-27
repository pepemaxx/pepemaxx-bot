let token = parseFloat(localStorage.getItem("maxxToken")) || 0;
let secondsLeft = parseInt(localStorage.getItem("secondsLeft")) || 86400;

const tokenDisplay = document.getElementById("tokenCount");
const countdownDisplay = document.getElementById("countdown");

function updateCountdown() {
  const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  countdownDisplay.textContent = `${h}:${m}:${s}`;
}

function updateToken() {
  token = parseFloat(token + 0.05).toFixed(2);
  tokenDisplay.textContent = token;
  localStorage.setItem("maxxToken", token);
}

tokenDisplay.textContent = token;
updateCountdown();

const timer = setInterval(() => {
  if (secondsLeft > 0) {
    secondsLeft--;
    updateCountdown();
    updateToken();
    localStorage.setItem("secondsLeft", secondsLeft);
  } else {
    clearInterval(timer);
  }
}, 1000);