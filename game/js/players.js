var players = [];

function Player(options) {
  this.name = options.name,
  this.level = options.level,
  this.health = options.health,
  this.experience = options.experience,
  this.strength = options.strength,
  this.defense = options.defense,
  this.inventory = []
}

Alex = new Player({name: "Alex", level: 1, health: 100, experience: 0})
players.push(Alex)
