//Копия https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/src/modules/events.js

const { readdirSync } = require("fs");

module.exports = (bot) => {
  const eventFiles = readdirSync("./events/").filter((file) =>
    file.endsWith(".js")
  );

  eventFiles.forEach((file) => {
    const event = require(`../events/${file}`);

    if (!event.execute)
      throw new TypeError(
        `[ERROR]: execute! (${file})`
      );

    if (!event.name)
      throw new TypeError(`[ERROR]: Имя! (${file})`);

    bot.on(event.name, event.execute.bind(null, bot));

    delete require.cache[require.resolve(`../events/${file}`)];
  });
};