// تابع برای تنظیم تب فعال
function setActiveTab() {
  const currentPage = window.location.pathname.split('/').pop();
  const pageMap = {
    'index.html': 0,
    'quest.html': 1,
    'wallet.html': 2,
    'profile.html': 3
  };
  
  const tabs = document.querySelectorAll('.tab');
  const tabIndex = pageMap[currentPage] || 0;
  
  tabs.forEach((tab, index) => {
    if (index === tabIndex) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

// تابع برای بارگذاری محتوای داینامیک
async function loadContent(url, containerId) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
    setActiveTab();
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// رویدادهای کلیک برای تب‌ها
document.addEventListener('DOMContentLoaded', function() {
  setActiveTab();
  
  // جلوگیری از بارگذاری کامل صفحه برای لینک‌های تب بار
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
      if (!this.classList.contains('active')) {
        e.preventDefault();
        window.history.pushState({}, '', this.href);
        setActiveTab();
        // در اینجا می‌توانید محتوای صفحه را با AJAX بارگیری کنید
      }
    });
  });
});

// مدیریت تغییر مسیر با دکمه‌های جلو/عقب مرورگر
window.addEventListener('popstate', function() {
  setActiveTab();
});