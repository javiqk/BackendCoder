const { Container } = require("./container");
const { knexSqLite3 } = require("../options/sqLite3");

class Chat extends Container {
  constructor() {
    super("Historial");
  }
}

const chatHistorial = new Chat();
chatHistorial.get(knexSqLite3);

module.exports = { Chat };