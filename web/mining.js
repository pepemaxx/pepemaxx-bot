// خواندن مقدار قبلی از localStorage
let token = parseFloat(localStorage.getItem("maxxToken")) || 0;
let secondsLeft = parseInt(localStorage.getItem("secondsLeft")) || 86400; // 24 ساعت = 86400 ثانیه

// گرفتن عناصر از صفحه
const tokenDisplay = document.getElementById("tokenCount");
const countdownDisplay = document.getElementById("countdown");

// تابع نمایش تایمر
function updateCountdown() {
  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// تابع افزایش توکن
function updateToken() {
  token = parseFloat(token + 0.05).toFixed(2);
  tokenDisplay.textContent = token;
  localStorage.setItem("maxxToken", token);
}

// مقدار اولیه
tokenDisplay.textContent = token;
updateCountdown();

// شروع تایمر
let timer = setInterval(() => {
  if (secondsLeft > 0) {
    secondsLeft--;
    updateCountdown();
    updateToken();
    localStorage.setItem("secondsLeft", secondsLeft);
  } else {
    clearInterval(timer);
  }
}, 1000);