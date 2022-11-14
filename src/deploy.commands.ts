import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import colors from 'colors';

const { clientId, guildId, token } = require('./config.json');

colors.enable();

console.log(`clientID: ${clientId}`);
const commands: any[] = [];

// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
                    .readdirSync(`${__dirname}/commands`)
                    .filter((file: string) => file.endsWith('.js'));

console.log("---Available Commands---".green);
// Grab the SlashCommandBuilder.toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (Object.keys(command).length !== 0){
        const body = command.data.toJSON()
        commands.push(body);
        console.log(body.name.blue);
    }
}




// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`.green);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		) as any[];
		console.log(`Successfully reloaded ${data.length} application (/) commands.`.green);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();