import { InteractionReplyOptions } from "discord.js";

const { SlashCommandBuilder } = require('discord.js');

// A slash command also requires a function to run when the command is used, to respond to the interaction

/* The data property, which will provide the command definition shown above for registering to Discord. */
/* The execute method, which will contain the functionality to run from our event handler when the command is used. */
module.exports = {
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with Pong!'),
    async execute(interaction) {
        console.dir(interaction);
        const replyOption: InteractionReplyOptions = {
            content: `${interaction.user.username} just pinged! Only you can see this message`,
            ephemeral: true
        }
        await interaction.reply(replyOption);
    }
}
