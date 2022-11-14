import { Client, Events, Collection, GatewayIntentBits, ClientOptions } from 'discord.js';
import colors from 'colors';

colors.enable();

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`.rainbow);
    }
}

// client.once(Events.ClientReady, c => {
//     console.log(typeof c);
//     console.log(`Ready! Logged in as ${c.user.tag}`);
// })