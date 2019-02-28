require('dotenv').config()

const tmi = require('tmi.js');

let prefix = '!';
let discordLink = 'discordapp.com/invite/cmh6NmH';
let youtubeLink = 'youtube.com/paynos';
const respectStr = ['respekts', 'respects', 'respect', 'respekt', 'respecc'];
const womenStr = ['woman', 'women', 'womans', 'womens', 'wamens', 'wamen'];

let options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.AUTH_KEY
    },
    channels: [process.env.TWITCH_CHANNEL]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomBool() {
    return Math.round(Math.random());
}

let client = new tmi.client(options);
client.connect();

client.on('chat', (channel, user, message, self) => {

    if (self) return;
    if (!message.startsWith(prefix)) return

    let command = message.split(" ")[0]
    command = command.slice(prefix.length)
    command = command.toLowerCase()

    let args = message.split(" ").slice(1)

    if (command === 'hate') {
        client.say(channel, '"I have a complete disdain for twitch chat bots, I think they are the worst thing ever" - PaynosTV 2018');
    } else if (command === 'yeet') {
        let eNumber = getRandomInt(10);
        client.say(channel, `YEE${'E'.repeat(eNumber)}T`);
    } else if (command === 'respectwomen') {
        let replyStr = '';
        replyStr += user['display-name'];
        replyStr += ' ';
        randomBool() ? (
            replyStr += respectStr[getRandomInt(respectStr.length)].toUpperCase()
        ) : (
            replyStr += respectStr[getRandomInt(respectStr.length)].toLowerCase()
        )
        replyStr += ' ';

        randomBool() ? (
            replyStr += womenStr[getRandomInt(womenStr.length)].toUpperCase()
        ) : (
            replyStr += womenStr[getRandomInt(womenStr.length)].toLowerCase()
        )
        replyStr += '!';

        client.say(channel, replyStr); 
    } else if (command === 'discord') {
        client.say(channel, discordLink);
    } else if (command === 'youtube') {
        client.say(channel, youtubeLink)
    }
});

client.on('connected', (address, port) => {
    console.log(`Connected to ${address}:${port}`);
});