const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`سلام ${ctx.from.first_name}! به بازی PepeMaxx خوش آمدید!`, {
    reply_markup: {
      inline_keyboard: [
        [{ 
          text: "🚀 ورود به بازی", 
          web_app: { url: "https://pepemaxx-bot.vercel.app/web" } 
        }]
      ]
    }
  });
});

module.exports = async (req, res) => {
  if (req.method === "POST") {
    await bot.handleUpdate(req.body);
    res.status(200).send("OK");
  } else {
    res.status(200).send("Use POST for Telegram updates!");
  }
};