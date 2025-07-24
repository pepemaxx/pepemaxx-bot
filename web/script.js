document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  const counter = document.getElementById("count");
  const clickBtn = document.getElementById("clickBtn");
  const saveBtn = document.getElementById("saveBtn");

  let count = parseInt(localStorage.getItem("score")) || 0;
  counter.textContent = count;

  // نمایش نام کاربر
  const user = tg.initDataUnsafe?.user;
  if (user) {
    document.getElementById("username").textContent =
      `👋 سلام ${user.first_name || "کاربر"}!`;
  }

  const startTime = parseInt(localStorage.getItem("startTime"));

  // اگر تایمر قبلاً شروع شده
  if (startTime) {
    const timePassed = Date.now() - startTime;
    const timeLeft = 24 * 60 * 60 * 1000 - timePassed;

    if (timeLeft > 0) {
      // هنوز تایمر ادامه داره
      showCountdown(timeLeft);
      clickBtn.disabled = true;
    } else {
      // تایمر تمام شده
      localStorage.removeItem("startTime");
      clickBtn.disabled = false;
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

  function showCountdown(timeLeft) {
    const countdownDiv = document.createElement("div");
    countdownDiv.id = "countdown";
    countdownDiv.style.marginTop = "15px";
    document.querySelector(".container").appendChild(countdownDiv);

    const interval = setInterval(() => {
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownDiv.textContent = `⏳ باقی‌مانده: ${hours}ساعت ${minutes}دقیقه ${seconds}ثانیه`;

      timeLeft -= 1000;

      if (timeLeft <= 0) {
        clearInterval(interval);
        countdownDiv.remove();
        localStorage.removeItem("startTime");
        clickBtn.disabled = false;
      }
    }, 1000);
  }
});