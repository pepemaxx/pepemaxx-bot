// فعال کردن تب‌ها
document.addEventListener('DOMContentLoaded', function() {
  // تشخیص صفحه فعلی
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // علامت گذاری تب فعال
  document.querySelectorAll('.tab').forEach(tab => {
    if (tab.getAttribute('href') === currentPage) {
      tab.classList.add('active');
    }
  });
  
  // می‌توانید توابع مشترک دیگر را اینجا اضافه کنید
});

// تابع برای تغییر صفحه بدون رفرش کامل
function navigateTo(page) {
  // در یک برنامه واقعی، اینجا از AJAX یا Router استفاده می‌شد
  window.location.href = page;
}