const DIE_SKILLED = ':green_square:';
const DIE_UNSKILLED = ':red_square:';
const DIE_LUCKY = ':white_large_square:';
const DIE_UNLUCKY = ':brown_square:';

class Result {
	constructor(value, isSuccess, die) {
		this.value = value;
		this.isSuccess = isSuccess;
		this.die = die;
	}
}

class Die {
	constructor(sides, successfulSides, emoji) {
		this.sides = sides;
		this.successfulSides = successfulSides;
		this.emoji = emoji;
	}
}

class Dice {
	constructor(skilled, unskilled, lucky, unlucky) {
		this.skilled = skilled;
		this.unskilled = unskilled;
		this.lucky = lucky;
		this.unlucky = unlucky;
	}

	roll() {
		const skilledResults = this.skilled.map(d => this.rollDie(d));
		const unskilledResults = this.unskilled.map(d => this.rollDie(d));
		const luckyResults = this.lucky.map(d => this.rollDie(d));
		const unluckyResults = this.unlucky.map(d => this.rollDie(d));

		const skillResults = skilledResults.concat(unskilledResults);
		const skillSuccesses = skillResults.reduce((previousValue, currentResult) => {
			if (currentResult.isSuccess) return previousValue + 1;
			return previousValue;
		}, 0);
		const luckResults = luckyResults.concat(unluckyResults);
		const luckSuccesses = luckResults.reduce((previousValue, currentResult) => currentResult.isSuccess ? previousValue + 1 : previousValue, 0);

		return {
			skillResults,
			skillSuccesses,
			luckResults,
			luckSuccesses,
		};
	}

	rollDie(die) {
		const value = this.getRandomInt(die.sides);
		let isSuccess = false;

		if (value > die.sides - die.successfulSides) {
			isSuccess = true;
		}

		return new Result(value, isSuccess, die);
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * max) + 1;
	}

	static createFromString(diceString) {
		const regexpDice = /([0-6])s([0-6])l/;
		const match = diceString.match(regexpDice);
		const numSkilled = parseInt(match[1]);
		const numUnskilled = 3 - numSkilled;
		const numLucky = parseInt(match[2]);
		const numUnlucky = 3 - numLucky;

		return new Dice(
			new Array(numSkilled).fill(skilledDie),
			new Array(numUnskilled).fill(unskilledDie),
			new Array(numLucky).fill(luckyDie),
			new Array(numUnlucky).fill(unluckyDie),
		);
	}
}

const skilledDie = new Die(6, 4, DIE_SKILLED);
const unskilledDie = new Die(6, 2, DIE_UNSKILLED);
const luckyDie = new Die(6, 4, DIE_LUCKY);
const unluckyDie = new Die(6, 2, DIE_UNLUCKY);

module.exports = { Dice, Die, Result };