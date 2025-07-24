const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const clicks = {};

// شروع بازی
bot.start((ctx) => {
  const id = ctx.from.id;
  clicks[id] = 0;

  ctx.reply(
    `سلام ${ctx.from.first_name}!\nبه بازی PepeMaxx خوش آمدی!`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: "👆 کلیک کن!", callback_data: "click" }]],
      },
    }
  );
});

// ثبت کلیک‌ها
bot.on("callback_query", async (ctx) => {
  const id = ctx.from.id;
  if (!clicks[id]) clicks[id] = 0;
  clicks[id] += 1;

  // نمایش تعداد کلیک‌ها به صورت بازخورد سریع
  await ctx.answerCbQuery(`تعداد کلیک‌های شما: ${clicks[id]}`, { show_alert: false });

  // ارسال پیام جدید برای هر کلیک (به جای ادیت پیام قبلی)
  await ctx.reply(`🔥 کلیک ثبت شد! تعداد کلیک‌های شما: ${clicks[id]}`, {
    reply_markup: {
      inline_keyboard: [[{ text: "👆 دوباره کلیک کن!", callback_data: "click" }]],
    },
  });
});

// تنظیم Webhook
bot.telegram.setWebhook("https://pepemaxx-bot.vercel.app");

// هندلر اصلی برای Vercel
module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      await bot.handleUpdate(req.body);
      return res.status(200).send("OK");
    } else if (req.method === "GET") {
      return res.status(200).send("Bot is running!");
    } else {
      return res.status(405).send("Method Not Allowed");
    }
  } catch (err) {
    console.error("❌ Error handling update:", err);
    return res.status(500).send("Internal Server Error");
  }
};