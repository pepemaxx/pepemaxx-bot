document.addEventListener("DOMContentLoaded", () => {
  let count = 0;

  const btn = document.getElementById("clickBtn");
  const counter = document.getElementById("count");

  if (btn && counter) {
    btn.addEventListener("click", () => {
      count++;
      counter.innerText = count;
    });
  }
});