import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
            .setName('server')
            .setDescription('Provide information about the server'),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    },
};
// export default {
//     data: new SlashCommandBuilder()
//             .setName('server')
//             .setDescription('Provide information about the server'),
//     async execute(interaction) {
//         // interaction.guild is the object representing the Guild in which the command was run
// 		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
//     },
// }
// {
//     default: {
//       data: SlashCommandBuilder {
//         options: [],
//         name: 'server',
//         name_localizations: undefined,
//         description: 'Provide information about the server',
//         description_localizations: undefined,
//         default_permission: undefined,
//         default_member_permissions: undefined,
//         dm_permission: undefined
//       },
//       execute: [Function: execute]
//     }
// }