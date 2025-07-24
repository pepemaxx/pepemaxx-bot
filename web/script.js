const tg = window.Telegram.WebApp;
tg.expand();

let count = localStorage.getItem('score') || 0;
const counter = document.getElementById("count");
const clickBtn = document.getElementById("clickBtn");
const saveBtn = document.getElementById("saveBtn");

// نمایش نام کاربر
if (tg.initDataUnsafe?.user) {
  document.getElementById("username").textContent = 
    `👋 ${tg.initDataUnsafe.user.first_name || 'کاربر'}!`;
}

// مدیریت کلیک
clickBtn.addEventListener("click", () => {
  count++;
  counter.textContent = count;
  tg.HapticFeedback.impactOccurred("light");
});

// ذخیره امتیاز
saveBtn.addEventListener("click", () => {
  localStorage.setItem('score', count);
  tg.sendData(JSON.stringify({ score: count }));
  tg.close();
});