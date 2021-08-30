const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const expect = require('chai').expect;
const sinon = require('sinon');

const { Dice, Die } = require('../6d6-dice');

describe('TEST 6d6-dice', () => {
	it('should parse skilled', () => {
		const actual = Dice.createFromString('1s1l');
		const expected = [{
			emoji: ':green_square:',
			sides: 6,
			successfulSides: 4,
		}];

		expect(actual.skilled).to.deep.equal(expected);
	});

	it('should parse lucky', () => {
		const actual = Dice.createFromString('1s1l');
		const expected = [{
			emoji: ':white_large_square:',
			sides: 6,
			successfulSides: 4,
		}];

		expect(actual.lucky).to.deep.equal(expected);
	});

	it('should parse unskilled', () => {
		const actual = Dice.createFromString('1s2l');
		const expected = [
			{
				emoji: ':red_square:',
				sides: 6,
				successfulSides: 2,
			},
			{
				emoji: ':red_square:',
				sides: 6,
				successfulSides: 2,
			},
		];

		expect(actual.unskilled).to.deep.equal(expected);
	});

	it('should parse unlucky', () => {
		const actual = Dice.createFromString('1s1l');
		const expected = [
			{
				emoji: ':black_large_square:',
				sides: 6,
				successfulSides: 2,
			},
			{
				emoji: ':black_large_square:',
				sides: 6,
				successfulSides: 2,
			},
		];

		expect(actual.unlucky).to.deep.equal(expected);
	});

	it('should should have roll result below 7', () => {
		const dice = new Dice();
		const actual = dice.rollDie(new Die(6, 4, 'test'));

		expect(actual.value).to.be.below(7);
	});

	it('should should have roll result above 0', () => {
		const dice = new Dice();
		const actual = dice.rollDie(new Die(6, 4, 'test'));

		expect(actual.value).to.be.above(0);
	});

	it('should should have roll result of success', () => {
		const dice = new Dice();
		const actual = dice.rollDie(new Die(6, 6, 'test'));

		expect(actual.isSuccess).to.equal(true);
	});

	it('should should have roll result of failure', () => {
		const dice = new Dice();
		const actual = dice.rollDie(new Die(6, 0, 'test'));

		expect(actual.isSuccess).to.equal(false);
	});

	it('should roll dice with expected results', () => {
		sinon.stub(Math, 'random').returns(0.4);
		const dice = Dice.createFromString('3s1l');
		const actual = dice.roll();
		const expected = {
			'luckResults': [
				{
					'die': {
						'emoji': ':white_large_square:',
						'sides': 6,
						'successfulSides': 4,
					},
					'isSuccess': true,
					'value': 3,
				},
				{
					'die': {
						'emoji': ':black_large_square:',
						'sides': 6,
						'successfulSides': 2,
					},
					'isSuccess': false,
					'value': 3,
				},
				{
					'die': {
						'emoji': ':black_large_square:',
						'sides': 6,
						'successfulSides': 2,
					},
					'isSuccess': false,
					'value': 3,
				},
			],
			'luckSuccesses': 1,
			'skillResults': [
				{
					'die': {
						'emoji': ':green_square:',
						'sides': 6,
						'successfulSides': 4,
					},
					'isSuccess': true,
					'value': 3,
				},
				{
					'die': {
						'emoji': ':green_square:',
						'sides': 6,
						'successfulSides': 4,
					},
					'isSuccess': true,
					'value': 3,
				},
				{
					'die': {
						'emoji': ':green_square:',
						'sides': 6,
						'successfulSides': 4,
					},
					'isSuccess': true,
					'value': 3,
				},
			],
			'skillSuccesses': 3,
		};

		expect(actual).to.deep.equal(expected);
	});
});