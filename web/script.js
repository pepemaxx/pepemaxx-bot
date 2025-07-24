document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  const counter = document.getElementById("count");
  const clickBtn = document.getElementById("clickBtn");
  const saveBtn = document.getElementById("saveBtn");
  const countdownEl = document.getElementById("countdown");

  let scoreRaw = localStorage.getItem("score");
  let count = scoreRaw !== null ? parseInt(scoreRaw) : 0;
  counter.textContent = count;

  const user = tg.initDataUnsafe?.user;
  if (user) {
    document.getElementById("username").textContent =
      `👋 سلام ${user.first_name || "کاربر"}!`;
  }

  const startRaw = localStorage.getItem("startTime");
  const startTime = startRaw !== null ? parseInt(startRaw) : null;

  if (startTime) {
    const timePassed = Date.now() - startTime;
    const timeLeft = 24 * 60 * 60 * 1000 - timePassed;

    if (timeLeft > 0) {
      clickBtn.disabled = true;
      showCountdown(timeLeft);
    } else {
      localStorage.removeItem("startTime");
    }
  }

  clickBtn.addEventListener("click", () => {
    count++;
    counter.textContent = count;
    localStorage.setItem("score", count);

    const now = Date.now();
    localStorage.setItem("startTime", now);

    clickBtn.disabled = true;
    showCountdown(24 * 60 * 60 * 1000);

    tg.HapticFeedback.impactOccurred("light");
  });

  saveBtn.addEventListener("click", () => {
    tg.sendData(JSON.stringify({ score: count }));
    tg.close();
  });

  let countdownInterval = null;

  function showCountdown(timeLeft) {
    clearInterval(countdownInterval);
    updateCountdown(timeLeft);

    countdownInterval = setInterval(() => {
      timeLeft -= 1000;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownEl.textContent = "";
        clickBtn.disabled = false;
        localStorage.removeItem("startTime");
        return;
      }

      updateCountdown(timeLeft);
    }, 1000);
  }

  function updateCountdown(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    countdownEl.textContent = `⏳ زمان باقی‌مانده: ${hours}ساعت ${minutes}دقیقه ${seconds}ثانیه`;
  }
});