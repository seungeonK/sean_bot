const { Client, Events, GatewayIntentBits } = require('discord.js');
import { token } from './config.json';
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(typeof c);
    console.log(`Ready! Logged in as ${c.user.tag}`);
})
client.on('ready', () => {
    console.log(`${client.user}`);
});

// Log in to Discord with your client's token
client.login(token);