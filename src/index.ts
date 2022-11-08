import fs from 'node:fs'; // node file system module. 
import path from 'node:path'; // node native path utility module. 
import { Client, Events, Collection, GatewayIntentBits, ClientOptions } from 'discord.js';
import { token } from './config.json';
// Create a new client instance

interface IMyClient {
    commands: Collection<string, object>;
}

class MyClient extends Client implements IMyClient{
    commands: Collection<string, object>;
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }
}
const client = new MyClient({ intents: [GatewayIntentBits.Guilds] });


console.log(`%c __dirname: ${__dirname}`, 'background: #222; color: #bada55');

const commandsPath = path.join(__dirname, 'commands'); // helps to construct a path to the `commands` directory. ex) /src/commands
//returns an array of all the file names it contains, ['ping.js', 'server.js']
const commandsFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); 

commandsFiles.forEach(file => {
   const filePath = path.join(commandsPath, file); // /src/commands/ping.js
   const command = require(filePath); // obejct
   
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
});

client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
})

// client.once(Events.ClientReady, c => {
//     console.log(typeof c);
//     console.log(`Ready! Logged in as ${c.user.tag}`);
// })



// Log in to Discord with your client's token
client.login(token);