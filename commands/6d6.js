const { SlashCommandBuilder } = require('@discordjs/builders');
const { stripIndent } = require('common-tags');
const { Dice } = require('../6d6-dice');

const diceChoices = [
	['0', 0],
	['1', 1],
	['2', 2],
	['3', 3],
];

function formatRollResult(results) {
	const output = results.map((result) => {
		const r = `${result.value} ${result.die.emoji}`;
		if (result.isSuccess) return `***${r}***`;
		return r;
	}).join('  ');

	console.log(output);
	return output;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('6d6')
		.setDescription('Roll 6d6 dice!')
		.addIntegerOption(option => option.setName('skill_dice')
			.setDescription('The number of skill dice to roll.')
			.setRequired(true)
			.addChoices(diceChoices),
		)
		.addIntegerOption(option => option.setName('luck_dice')
			.setDescription('The number of luck dice to roll.')
			.setRequired(true)
			.addChoices(diceChoices),
		),
	async execute(interaction) {
		const dice = Dice.createFromString(`${interaction.options.getInteger('skill_dice')}s${interaction.options.getInteger('luck_dice')}l`);
		const result = dice.roll();
		const formattedSkillResult = formatRollResult(result.skillResults);
		const formattedLuckResult = formatRollResult(result.luckResults);

		await interaction.reply(stripIndent`
		**Skill Successes: ${result.skillSuccesses}**
		${formattedSkillResult}
		**Luck Successes: ${result.luckSuccesses}**
		${formattedLuckResult}
		`);
	},
};