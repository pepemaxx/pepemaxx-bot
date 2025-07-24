const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const clicks = {};

// فرمان /start
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

// کلیک روی دکمه
bot.on("callback_query", (ctx) => {
  const id = ctx.from.id;
  if (!clicks[id]) clicks[id] = 0;
  clicks[id] += 1;
  ctx.editMessageText(
    `تعداد کلیک‌های شما: ${clicks[id]}`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: "👆 دوباره کلیک کن!", callback_data: "click" }]],
      },
    }
  );
});

// تنظیم Webhook فقط یک بار (در پروژه اصلی بهتره در route جداگانه باشه)
bot.telegram.setWebhook("https://x-bot.vercel.app");

// هندلر Vercel
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
    console.error("Error handling update:", err);
    return res.status(500).send("Something went wrong");
  }
};