class Screen {
    constructor(engine) {
        this.engine = engine;
        this.enter_time = 0;
    }

    enter_state(current_time) {
        this.engine.state_stack.push(this);
        this.enter_time = current_time;
    }

    exit_state(count = 1) {
        while (count > 0 && this.engine.state_stack.length > 0) {
            this.engine.state_stack.pop();
            count--;
        }
    }

    update(current_time) {
        console.error('update not implemented')
    }

    render(current_time) {
        console.error('render not implemented')
    }

    keyDownHandler(e, current_time) {}
    keyUpHandler(e, current_time) {}
    mouseDownHandler(e, current_time) {}
    mouseUpHandler(e, current_time) {}
    clickHandler(e, current_time) {}
    auxClickHandler(e, current_time) {}
    contextMenuHandler(e, current_time) {}
    moveHandler(e, current_time) {}
}

class Engine {
    constructor(target_fps = 60) {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.w = 0;
        this.h = 0;
        this.tile_size = 0;
        this.mid_x = 0;
        this.mid_y = 0;

        const input_codes = [
            // Mouse
            'Mouse0', 'Mouse1', 'Mouse2',
            // Digits
            'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
            // Letters
            'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
            'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',
            'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM',
            // Symbols
            'Backquote', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 'Backslash',
            'Semicolon', 'Quote', 'Comma', 'Period', 'Slash', 'Space',
            // Other
            'Backspace', 'Tab', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight',
            'AltLeft', 'AltRight', 'CapsLock', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
            'Delete', 'Insert'
        ];
        this.input_state = {};
        input_codes.forEach(code => {this.input_state[code] = 0;});

        this.target_fps = target_fps;
        this.frame_interval = 1000 / this.target_fps;
        this.last_update_time = 0;

        // TODO: implement text input capabilities using e.key
        this.text_input_active = false;
        this.text_buffer = '';
        this.max_text_length = 15;

        this.state_stack = [];
        // this.debug = '';
    }

    run(screen) { // TODO: possibly change document to this.canvas for different mouse location data
        screen.enter_state();
        window.addEventListener('resize', this.resizeHandler.bind(this));
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        document.addEventListener('keyup', this.keyUpHandler.bind(this));
        document.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
        document.addEventListener('auxclick', this.auxClickHandler.bind(this));
        document.addEventListener('contextmenu', this.contextMenuHandler.bind(this));
        document.addEventListener('mousemove', this.moveHandler.bind(this));

        this.resizeHandler();
        this.last_update_time = performance.now();
        requestAnimationFrame(this.game_loop.bind(this));
    }

    game_loop() {
        requestAnimationFrame(this.game_loop.bind(this));
        const current_time = performance.now();
        if (current_time >= this.last_update_time + 10000) {
            this.last_update_time = current_time;
            this.state_stack[this.state_stack.length - 1]?.update(this.last_update_time);
        } else {
            while (current_time >= this.last_update_time + this.frame_interval) {
                this.last_update_time += this.frame_interval;
                this.state_stack[this.state_stack.length - 1]?.update(this.last_update_time);
            }
        }
        this.state_stack[this.state_stack.length - 1]?.render(current_time);
    }

    resizeHandler(e) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.tile_size = Math.floor(Math.min(this.w / 40, this.h / 30));
        this.mid_x = Math.floor(this.w / 2);
        this.mid_y = Math.floor(this.h / 2);
    }

    keyDownHandler(e) {
        if (e.repeat) return;
        const code = e.code;
        if (this.input_state[code] === 0) {
            const current_time = performance.now();
            this.input_state[code] = current_time;
            this.state_stack[this.state_stack.length - 1]?.keyDownHandler(e, current_time);
        }
    }

    keyUpHandler(e) {
        const code = e.code;
        if (this.input_state[code] > 0) {
            const current_time = performance.now();
            this.input_state[code] = 0;
            this.state_stack[this.state_stack.length - 1]?.keyUpHandler(e, current_time);
        }
    }

    mouseDownHandler(e) {
        const code = 'Mouse' + e.button;
        if (this.input_state[code] === 0) {
            const current_time = performance.now();
            this.input_state[code] = current_time;
            this.state_stack[this.state_stack.length - 1]?.mouseDownHandler(e, current_time);
        }
    }

    mouseUpHandler(e) {
        const code = 'Mouse' + e.button;
        if (this.input_state[code] > 0) {
            const current_time = performance.now();
            this.input_state[code] = 0;
            this.state_stack[this.state_stack.length - 1]?.mouseUpHandler(e, current_time);
        }
    }

    clickHandler(e) {
        const current_time = performance.now();
        this.state_stack[this.state_stack.length - 1]?.clickHandler(e, current_time);
    }

    auxClickHandler(e) {
        e.preventDefault();
        const current_time = performance.now();
        this.state_stack[this.state_stack.length - 1]?.auxClickHandler(e, current_time);
    }

    contextMenuHandler(e) {
        e.preventDefault();
        const current_time = performance.now();
        this.state_stack[this.state_stack.length - 1]?.contextMenuHandler(e, current_time);
    }

    moveHandler(e) {
        const current_time = performance.now();
        this.state_stack[this.state_stack.length - 1]?.moveHandler(e, current_time);
    }
}
