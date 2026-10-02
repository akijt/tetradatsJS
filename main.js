// console.log();
// console.error();

const engine = new Engine();
const game = new Tetra();
const menu = new Menu(engine, game);
engine.run(menu);