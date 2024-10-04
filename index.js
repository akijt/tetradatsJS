// document.write();
// window.alert();
// console.log();
// console.error();

class Index {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.game = new Tetris();
        this.colors = {'z': 'rgb(255,   0,   0)',
                       'l': 'rgb(255, 165,   0)',
                       'o': 'rgb(255, 255,   0)',
                       's': 'rgb(  0, 255,   0)',
                       'i': 'rgb(  0, 255, 255)',
                       'j': 'rgb(  0,   0, 255)',
                       't': 'rgb(160,  32, 240)', 
                       'x': 'rgb(127, 127, 127)'};

        this.bindings = {'quit'      : 'q',
                         'reset'     : 'r',
                         'hold'      : 'f',
                         'move_left' : 'm',
                         'move_right': '.',
                         'rotate_cw' : 'd',
                         'rotate_180': 'a',
                         'rotate_ccw': 's',
                         'soft_drop' : ',',
                         'hard_drop' : ' '};
        this.key_state = {};
        Object.values(this.bindings).forEach(x => this.key_state[x] = 0);
        this.handling = {'DAS': 100, 'ARR': 0, 'SDF': 0};

        this.state_stack = [];
        this.debug = '';

        this.mode = '';
        this.level = 0;
    }

    get_key_hold() {
        let key_hold_new = {};
        Object.keys(this.game.key_hold).forEach(x => key_hold_new[x] = Math.sign(this.key_state[this.bindings[x]]));
        if (this.key_state[this.bindings['move_left']] > this.key_state[this.bindings['move_right']]) key_hold_new['move_left'] = key_hold_new['move_right'] + 1;
        else if (this.key_state[this.bindings['move_right']] > this.key_state[this.bindings['move_left']]) key_hold_new['move_right'] = key_hold_new['move_left'] + 1;
        return key_hold_new;
    }

    run() {
        new Menu(this).enter_state();
        setInterval(this.game_loop.bind(this), 1000 / 60);
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        document.addEventListener('keyup', this.keyUpHandler.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
        document.addEventListener('mousemove', this.moveHandler.bind(this));
    }

    game_loop() {
        const current_time = Date.now();

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const size = Math.min(w / 40, h / 30);
        // this.debug = size;

        this.state_stack[this.state_stack.length - 1].update(current_time);
        this.state_stack[this.state_stack.length - 1].render(current_time, w, h, size);
    }

    keyDownHandler(e) {
        const current_time = Date.now();
        if (Object.values(this.bindings).indexOf(e.key) >= 0 && this.key_state[e.key] == 0) {
            this.key_state[e.key] = current_time;
            this.state_stack[this.state_stack.length - 1].keyDownHandler(e, current_time);
        }
    }

    keyUpHandler(e) {
        const current_time = Date.now();
        if (Object.values(this.bindings).indexOf(e.key) >= 0) {
            this.key_state[e.key] = 0;
            this.state_stack[this.state_stack.length - 1].keyUpHandler(e, current_time);
        }
    }

    clickHandler(e) {
        const current_time = Date.now();
        const w = this.canvas.width;
        const h = this.canvas.height;
        const size = Math.min(w / 40, h / 30);
        this.state_stack[this.state_stack.length - 1].clickHandler(e, current_time, w, h, size);
    }

    moveHandler(e) {
        const current_time = Date.now();
        const w = this.canvas.width;
        const h = this.canvas.height;
        const size = Math.min(w / 40, h / 30);
        this.state_stack[this.state_stack.length - 1].moveHandler(e, current_time, w, h, size);
    }
}

let index = new Index();
index.run();