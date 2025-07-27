// سیستم کلیک سکه
document.getElementById('claim-btn')?.addEventListener('click', function() {
    alert('پاداش دریافت شد!');
});

// سیستم کپی لینک دعوت
document.querySelector('.copy-btn')?.addEventListener('click', function() {
    const link = document.querySelector('.invite-link code').textContent;
    navigator.clipboard.writeText(link);
    alert('لینک کپی شد!');
});

// سیستم کوئست‌ها
document.querySelectorAll('.quest-item input').forEach(item => {
    item.addEventListener('change', function() {
        const parent = this.closest('.quest-item');
        if (this.checked) {
            parent.classList.add('completed');
            parent.querySelector('.status-badge').textContent = 'تکمیل شد';
        }
    });
});

// تایمر ماینینگ
function updateTimer() {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 1);
    endTime.setHours(0, 0, 0, 0);
    
    setInterval(() => {
        const now = new Date();
        const diff = endTime - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.querySelector('.timer').textContent = 
            ---${hours}h ${mins}m ${secs}s---;
    }, 1000);
}

// راه‌اندازی اولیه
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.mining-container')) {
        updateTimer();
    }
});