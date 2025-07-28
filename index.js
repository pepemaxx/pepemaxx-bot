const express = require('express');
const { Telegraf } = require('telegraf');
const path = require('path');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// سرویس فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'web')));

// روت‌های وب
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.get('/wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'wallet.html'));
});

// دستورات تلگرام
bot.start((ctx) => {
  ctx.reply('به بازی ما خوش آمدید!', {
    reply_markup: {
      keyboard: [
        [{ text: "📱 بازکردن وب اپ" }],
        [{ text: "💰 کیف پول" }, { text: "🎯 کوئست‌ها" }]
      ],
      resize_keyboard: true
    }
  });
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// راه‌اندازی ربات
bot.launch();