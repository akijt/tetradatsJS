// console.log();
// console.error();

const engine = new Engine();
const game = new Tetris();
const menu = new Menu(engine, game);
engine.run(menu);