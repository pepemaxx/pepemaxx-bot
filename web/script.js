document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  let count = parseInt(localStorage.getItem('score')) || 0;

  const counter = document.getElementById("count");
  const clickBtn = document.getElementById("clickBtn");
  const saveBtn = document.getElementById("saveBtn");

  counter.textContent = count;

  // نمایش نام کاربر
  if (tg.initDataUnsafe?.user) {
    document.getElementById("username").textContent =
      `👋 ${tg.initDataUnsafe.user.first_name || 'کاربر'}!`;
  }

  // کلیک
  clickBtn.addEventListener("click", () => {
    count++;
    counter.textContent = count;
    tg.HapticFeedback.impactOccurred("light");
  });

  // ذخیره و خروج
  saveBtn.addEventListener("click", () => {
    localStorage.setItem('score', count);
    tg.sendData(JSON.stringify({ score: count }));
    tg.close();
  });
});