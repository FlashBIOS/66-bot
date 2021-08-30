const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.commands = new Collection();

// Automatically read the available commands.
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(`Found command ${command.data.name}`);
	client.commands.set(command.data.name, command);
}

// Automatically read the available events.
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	console.log(`Found event ${event.name}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token).then();
