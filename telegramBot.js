const TelegramBot = require("node-telegram-bot-api");

const TELEGRAM_BOT_TOKEN = "7728638362:AAFWINR1xPGwa5DBJ46a29KUCiSyewbttfE";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    const chatbotResponse = await getChatbotResponse(userMessage);
    bot.sendMessage(chatId, chatbotResponse);
});

async function getChatbotResponse(message) {
    try {
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.response || "Not a valid one";
    }

    catch (error) {
    console.error("Error fetching chatbot response:", error);
     return "Error processing your request.";
    }
    }

module.exports = bot;
