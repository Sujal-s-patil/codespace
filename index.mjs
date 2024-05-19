import TelegramBot from 'node-telegram-bot-api';
import schedule from 'node-schedule';

// Replace with your Telegram bot's token (obtained from BotFather)
const botToken = '6812681662:AAFkVDvZNTXIMOQrvl0Y8UxH-arh3Ju1wMc';

// The message you want the bot to send
const message = 'Your message here';

// Create a Telegram bot instance
const bot = new TelegramBot(botToken);

// Function to send the message
const sendMessage = async (chatId) => {
  try {
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Schedule function to send the message every 2 minutes
const job = schedule.scheduleJob('*/2 * * * *', async () => {
  // Retrieve chat ID from conversation history (replace with specific chat ID if needed)
  const conversationHistory = await bot.getUpdates();
  const latestUpdate = conversationHistory.pop();

  if (latestUpdate?.message) {
    const chatId = latestUpdate.message.chat.id;
    await sendMessage(chatId);
  } else {
    console.log('No recent chat found. Consider providing a specific chat ID for targeted messaging.');
  }
});

console.log('Bot is running and sending messages every 2 minutes.');
