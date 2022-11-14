import fs from 'node:fs'; // node file system module. 
import path from 'node:path'; // node native path utility module. 
import { GatewayIntentBits } from 'discord.js';
import { MyClient } from './common/types';
import colors from 'colors';

import { token } from './config.json';


colors.enable();

/* Guild: A discord 'server' for end-users */
// Create a new client instance
const client = new MyClient({ intents: [GatewayIntentBits.Guilds] });

const commandsPath = path.join(__dirname, 'commands'); // helps to construct a path to the `commands` directory. ex) /src/commands
//returns an array of all the file names it contains, ['ping.js', 'server.js']
const commandsFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); 

commandsFiles.forEach(file => {
   const filePath = path.join(commandsPath, file); // /src/commands/ping.js
   const command = require(filePath); // obejct
   
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`.red);
    }
});

const eventPath = path.join(__dirname, 'events');
const eventFiles: string[] = fs.readdirSync(eventPath).filter(file => file.endsWith('.js')); 

for (const file of eventFiles) {
    const filePath = path.join(eventPath, file); // /src/events/interactionCreate.js
    // const event = await import(filePath);
    const event = require(filePath);
    if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => {
            event.execute(...args)
        });
	}
}

/* Log in to Discord with your client's token */
client.login(token);