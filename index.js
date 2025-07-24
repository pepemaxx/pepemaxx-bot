const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const clicks = {};

bot.start((ctx) => {
  const id = ctx.chat.id;
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

bot.on("callback_query", (ctx) => {
  const id = ctx.chat.id;
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

// اجرای اصلی برای Vercel
module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send("OK");
  } catch (err) {
    console.error("Error handling update:", err);
    res.status(500).send("Something went wrong");
  }
};