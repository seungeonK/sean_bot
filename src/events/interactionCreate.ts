import { Client, Events, Collection, GatewayIntentBits, ClientOptions } from 'discord.js';
import colors from 'colors';

colors.enable();

/* Client#event:interactionCreate -> execute code when your application receives an "interaction" */
module.exports  = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        /* only handles slash commands */
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No comand matching ${interaction.commandName} was found`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}

// client.on(Events.InteractionCreate, async (interaction) => {
//     console.log('interactionCreated in');
//     /* only handles slash commands */
//     if (!interaction.isChatInputCommand()) return;

//     const command = interaction.client.commands.get(interaction.commandName);
//     console.log(`command:${command}`);

//     if (!command) {
//         console.error(`No comand matching ${interaction.commandName} was found`);
//         return;
//     }

//     try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}
// })