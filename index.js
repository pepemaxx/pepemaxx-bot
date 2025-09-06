from telegram.ext import Updater, CommandHandler
import logging
 
logging.basicConfig(level=logging.INFO)

BOT_TOKEN = "توکن باتت که از BotFather گرفتی"

def start(update, context):
    args = context.args
    referral_id = args[0] if args else None

    if referral_id:
        # اینجا referral_id رو داری
        # می‌تونی کاربر رو به Mini App با referral بفرستی
        frontend_url = f"https://your-frontend-url.com?referral={referral_id}"
        update.message.reply_text(
            f"خوش اومدی! برای ادامه بازی کلیک کن:\n{frontend_url}"
        )
    else:
        update.message.reply_text("سلام! برای شروع روی دکمه زیر کلیک کن 👇")

updater = Updater(BOT_TOKEN)
dp = updater.dispatcher
dp.add_handler(CommandHandler("start", start))

updater.start_polling()