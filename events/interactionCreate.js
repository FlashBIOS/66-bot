module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) {
			console.log(`${interaction.user.tag} in ${interaction.guild.name}#${interaction.channel.name} triggered an interaction.`);
			return;
		}

		try {
			const command = interaction.client.commands.get(interaction.commandName);
			console.log(`${interaction.user.tag} in ${interaction.guild.name}#${interaction.channel.name} triggered the command, "${interaction.commandName}".`);

			await command.execute(interaction);
		}
		catch (e) {
			console.error(e);

			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};