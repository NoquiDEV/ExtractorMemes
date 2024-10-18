require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js'); // Importa Client y GatewayIntentBits

// Crea una nueva instancia del cliente y especifica los intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Permite el acceso a eventos de guild
        GatewayIntentBits.GuildMessages, // Permite el acceso a eventos de mensajes de guild
        GatewayIntentBits.MessageContent // Permite acceder al contenido de los mensajes
    ]
});

const token = process.env.DISCORD_TOKEN;

let latestMessages = [];

client.once('ready', () => {
    console.log('Bot conectado!');
});

client.on('messageCreate', message => {
    if (!message.author.bot) {
        console.log(`Mensaje de ${message.author.username}: ${message.content}`);
        // Aquí puedes enviar los mensajes al cliente de Unity, por ejemplo, usando una API
    }

    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }

    if (!message.author.bot) {
        latestMessages.push({ author: message.author.username, content: message.content });
        if (latestMessages.length > 100) latestMessages.shift(); // Limita el almacenamiento de mensajes
        console.log(latestMessages); // Imprime los mensajes en consola o envíalos a otro sistema
    }
});


client.login(token);
