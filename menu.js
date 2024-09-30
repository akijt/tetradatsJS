class Menu {
    constructor(index) {
        this.index = index;
        this.mode = '';
    }

    enter_state() {
        this.index.state_stack.push(this);
        if (this.index.state_stack.length > 1) {
            this.prev_state = this.index.state_stack[this.index.state_stack.length - 2]
        }
    }

    exit_state() {
        this.index.state_stack.pop();
    }

    update(current_time) {
    }

    render(current_time, w, h, size) {
        // PRINT TEXT
        this.index.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.index.ctx.textBaseline = 'bottom';
        this.index.ctx.textAlign = 'center';
        this.index.ctx.font = `${size * 2}px Arial`;
        this.index.ctx.fillText('TETRADATS', w / 2 + (0) * size, h / 2 + (-8) * size);
        this.index.ctx.fillText(this.mode, w / 2 + (0) * size, h / 2 + (12) * size);

        // PRINT BUTTONS
        this.index.ctx.beginPath();
        this.index.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.index.ctx.lineWidth = size / 8;
        this.index.ctx.rect(w / 2 + (-4) * size, h / 2 + (-4) * size, 2 * size, 2 * size);
        this.index.ctx.rect(w / 2 + (-1) * size, h / 2 + (-4) * size, 2 * size, 2 * size);
        this.index.ctx.rect(w / 2 + (2) * size, h / 2 + (-4) * size, 2 * size, 2 * size);
        this.index.ctx.rect(w / 2 + (-1) * size, h / 2 + (-1) * size, 2 * size, 2 * size);
        this.index.ctx.rect(w / 2 + (-4) * size, h / 2 + (2) * size, 2 * size, 2 * size);
        this.index.ctx.rect(w / 2 + (-1) * size, h / 2 + (2) * size, 2 * size, 2 * size);
        this.index.ctx.rect(w / 2 + (2) * size, h / 2 + (2) * size, 2 * size, 2 * size);
        this.index.ctx.stroke();
        this.index.ctx.closePath();
    }

    keyDownHandler(e, current_time) {
        switch (e.key) {
            case this.index.bindings['quit']:
                break;
            case this.index.bindings['reset']:
                this.index.mode = 'marathon';
                this.index.level = 1;
                this.index.game.reset(this.index.handling, this.index.mode, this.index.level, this.index.get_key_hold(), current_time);
                new Ready(this.index, current_time).enter_state();
                break;
            case this.index.bindings['hold']:
                break;
            case this.index.bindings['move_left']:
                break;
            case this.index.bindings['move_right']:
                break;
            case this.index.bindings['rotate_cw']:
                break;
            case this.index.bindings['rotate_180']:
                break;
            case this.index.bindings['rotate_ccw']:
                break;
            case this.index.bindings['soft_drop']:
                break;
            case this.index.bindings['hard_drop']:
                break;
        }
    }

    keyUpHandler(e, current_time) {
    }

    clickHandler(e, current_time, w, h, size) {
        if (this.mode != '') {
            document.body.style.cursor = 'default';
            this.index.mode = this.mode;
            this.index.game.reset(this.index.handling, this.index.mode, this.index.level, this.index.get_key_hold(), current_time);
            new Ready(this.index, current_time).enter_state();
        }
    }

    moveHandler(e, current_time, w, h, size) {
        this.mode = '';
        if (h / 2 + (-4) * size < e.clientY && e.clientY < h / 2 + (-2) * size) {
            if (w / 2 + (-4) * size < e.clientX && e.clientX < w / 2 + (-2) * size) {
                this.mode = 'marathon';
            } else if (w / 2 + (-1) * size < e.clientX && e.clientX < w / 2 + (1) * size) {
                this.mode = 'sprint';
            } else if (w / 2 + (2) * size < e.clientX && e.clientX < w / 2 + (4) * size) {
                this.mode = 'blitz';
            }
        } else if (h / 2 + (-1) * size < e.clientY && e.clientY < h / 2 + (1) * size) {
            if (w / 2 + (-1) * size < e.clientX && e.clientX < w / 2 + (1) * size) {
                this.mode = 'classic';
            }
        } else if (h / 2 + (2) * size < e.clientY && e.clientY < h / 2 + (4) * size) {
            if (w / 2 + (-4) * size < e.clientX && e.clientX < w / 2 + (-2) * size) {
                this.mode = 'cheese';
            } else if (w / 2 + (-1) * size < e.clientX && e.clientX < w / 2 + (1) * size) {
                this.mode = 'finesse';
            } else if (w / 2 + (2) * size < e.clientX && e.clientX < w / 2 + (4) * size) {
                this.mode = '4-wide';
            }
        }
        if (this.mode) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }
}