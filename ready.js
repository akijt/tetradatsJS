class Ready {
    constructor(index, current_time) {
        this.index = index;
        this.countdown = current_time;
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
        if (current_time - this.countdown > 3000) {
            this.index.game.start(current_time);
            new Play(this.index).enter_state();
        }
    }

    render(current_time, w, h, size) {
        // PRINT BOARD
        for (let r = 0; r < 40; r++) {
            for (let c = 0; c < 10; c++) {
                if (this.index.game.board[r][c] != null) {
                    this.index.ctx.beginPath();
                    this.index.ctx.fillStyle = this.index.colors[this.index.game.board[r][c]];
                    this.index.ctx.fillRect(w / 2 + (-5 + c) * size, h / 2 + (9 - r) * size, size, size);
                    this.index.ctx.fill();
                    this.index.ctx.closePath();
                } else if (r < 20) {
                    this.index.ctx.beginPath();
                    this.index.ctx.strokeStyle = 'rgb(255, 255, 255)';
                    this.index.ctx.rect(w / 2 + (-5 + c) * size, h / 2 + (9 - r) * size, size, size);
                    this.index.ctx.stroke();
                    this.index.ctx.closePath();
                }
            }
        }

        // PRINT NEXT PIECES
        for (let j = 0; j < this.index.game.customizations.next; j++) {
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = this.index.game.minos[this.index.game.queue[j]][0][i];
                let left = w / 2 + (6 + dc) * size;
                let top = h / 2 + (-9 - dr + 3 * j) * size;
                this.index.ctx.beginPath();
                this.index.ctx.fillStyle = this.index.colors[this.index.game.queue[j]];
                this.index.ctx.fillRect(left, top, size, size);
                this.index.ctx.fill();
                this.index.ctx.closePath();
            }
        }

        // PRINT TEXT
        this.index.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.index.ctx.textBaseline = 'bottom';

        this.index.ctx.textAlign = 'left';
        this.index.ctx.font = `${size}px Arial`;
        // this.index.ctx.fillText(this.index.debug ? 'debug:' : '', w / 2 + (6) * size, h / 2 + (1) * size);
        this.index.ctx.fillText('score:', w / 2 + (6) * size, h / 2 + (4) * size);
        this.index.ctx.fillText('time:', w / 2 + (6) * size, h / 2 + (7) * size);
        this.index.ctx.font = `${size * 2}px Arial`;
        // this.index.ctx.fillText(this.index.debug, w / 2 + (6) * size, h / 2 + (3) * size);
        this.index.ctx.fillText(0, w / 2 + (6) * size, h / 2 + (6) * size);
        this.index.ctx.fillText('0.000', w / 2 + (6) * size, h / 2 + (9) * size);

        this.index.ctx.textAlign = 'right';
        this.index.ctx.font = `${size}px Arial`;
        this.index.ctx.fillText('pieces:', w / 2 + (-6) * size, h / 2 + (1) * size);
        this.index.ctx.fillText('lines:', w / 2 + (-6) * size, h / 2 + (4) * size);
        this.index.ctx.fillText('level:', w / 2 + (-6) * size, h / 2 + (7) * size);
        this.index.ctx.font = `${size * 2}px Arial`;
        this.index.ctx.fillText(0, w / 2 + (-6) * size, h / 2 + (3) * size);
        this.index.ctx.fillText(0, w / 2 + (-6) * size, h / 2 + (6) * size);
        this.index.ctx.fillText(this.index.game.stats.level, w / 2 + (-6) * size, h / 2 + (9) * size);

        this.index.ctx.textAlign = 'center';
        this.index.ctx.font = `${size * 2}px Arial`;
        this.index.ctx.fillText(this.index.game.stats.mode, w / 2 + (0) * size, h / 2 + (12) * size);

        // PRINT COUNTDOWN
        this.index.ctx.beginPath();
        this.index.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.index.ctx.fillRect(w / 2 + (-4) * size, h / 2 + (-1) * size, 8 * size, 2 * size);
        this.index.ctx.fill();
        this.index.ctx.closePath();

        this.index.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.index.ctx.textBaseline = 'bottom';
        this.index.ctx.textAlign = 'center';
        this.index.ctx.font = `${size * 2}px Arial`;
        this.index.ctx.fillText(Math.ceil(3 - (current_time - this.countdown) / 1000), w / 2 + (0) * size, h / 2 + (1) * size);
    }

    keyDownHandler(e, current_time) {
        switch (e.key) {
            case this.index.bindings['quit']:
                this.exit_state();
                break;
            case this.index.bindings['reset']:
                this.index.game.reset(this.index.handling, this.index.mode, this.index.level, this.index.get_key_hold(), current_time);
                this.countdown = current_time;
                break;
            case this.index.bindings['move_left']:
                this.index.game.move_press('move_left', 'move_right', current_time);
                break;
            case this.index.bindings['move_right']:
                this.index.game.move_press('move_right', 'move_left', current_time);
                break;
            case this.index.bindings['soft_drop']:
                this.index.game.soft_drop(current_time);
                break;
        }
    }

    keyUpHandler(e, current_time) {
        switch (e.key) {
            case this.index.bindings['move_left']:
                this.index.game.move_unpress('move_left', 'move_right', current_time);
                break;
            case this.index.bindings['move_right']:
                this.index.game.move_unpress('move_right', 'move_left', current_time);
                break;
            case this.index.bindings['soft_drop']:
                this.index.game.unsoft_drop();
                break;
        }
    }

    clickHandler(e, current_time, w, h, size) {
    }

    moveHandler(e, current_time, w, h, size) {
    }
}