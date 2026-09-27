from maxbot.bot import Bot
from maxbot.dispatcher import Dispatcher
from maxbot.types import Message

bot = Bot("f9LHodD0cOJtPWVzylReGm_JW9g-ZVEg3BPZk0evyl0QTf3YIu6C1itueZSb8heiFAUg8W72gZa-4qdptTg2")
dp = Dispatcher(bot)

@dp.message()
async def on_message(message: Message):
    await bot.send_message(
        chat_id=message.sender.id,
        text=f"Ты написал: {message.text}"
    )

import asyncio

if __name__ == "__main__":
    asyncio.run(dp.run_polling())