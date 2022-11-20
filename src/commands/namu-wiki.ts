const child_process = require('child_process');
const { SlashCommandBuilder } = require('discord.js');
import { InteractionReplyOptions } from "discord.js";


const data = new SlashCommandBuilder()
	.setName('wiki')
	.setDescription('Search in Namu Wiki')
	.addStringOption(option =>
		option.setName('search').setDescription('What do you wanna search?')
    );

const execute = async (interaction) => {
    // namu wiki
    const BASE_URL = 'https://namu.wiki/w/';
    const query = interaction.options.getString('search');
    child_process.exec(`open ${BASE_URL}${query}`);
    const replyOption: InteractionReplyOptions = {
        content: `Here it is!`,
        ephemeral: true
    }
    await interaction.reply(replyOption);
}

module.exports = {
    data,
    execute
}