const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const clicks = {};

// شروع بازی: دکمه وب‌اپ نمایش داده می‌شود
bot.start((ctx) => {
  ctx.reply(
    `سلام ${ctx.from.first_name}!\nبه بازی PepeMaxx خوش آمدی!`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 ورود به بازی",
              web_app: {
                url: "https://pepemaxx-bot.vercel.app/web"
              }
            }
          ]
        ]
      }
    }
  );
});

// ثبت کلیک‌ها (در صورت نیاز به کلیک داخل تلگرام)
bot.on("callback_query", async (ctx) => {
  const id = ctx.from.id;
  if (!clicks[id]) clicks[id] = 0;
  clicks[id] += 1;

  await ctx.answerCbQuery(`تعداد کلیک‌های شما: ${clicks[id]}`, { show_alert: false });

  await ctx.reply(`🔥 کلیک ثبت شد! تعداد کلیک‌های شما: ${clicks[id]}`, {
    reply_markup: {
      inline_keyboard: [[{ text: "👆 دوباره کلیک کن!", callback_data: "click" }]],
    },
  });
});

// تنظیم Webhook
bot.telegram.setWebhook("https://pepemaxx-bot.vercel.app");

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
    console.error("❌ Error handling update:", err);
    return res.status(500).send("Internal Server Error");
  }
};