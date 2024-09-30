class Play {
    constructor(index) {
        this.index = index;
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
        this.index.game.frame_update(current_time);
        if (this.index.game.finish) {
            new Finish(this.index).enter_state();
        }
    }

    render(current_time, w, h, size) {
        // this.index.ctx.beginPath();
        // this.index.ctx.strokeStyle = 'rgb(255, 255, 255)';
        // this.index.ctx.moveTo(w / 2, 0);
        // this.index.ctx.lineTo(w / 2, h);
        // this.index.ctx.moveTo(0, h / 2);
        // this.index.ctx.lineTo(w, h / 2);
        // this.index.ctx.stroke();
        // this.index.ctx.closePath();

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

        // PRINT TARGET PIECE
        if (this.index.game.customizations.target) {
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = this.index.game.minos[this.index.game.piece][this.index.game.target.rotation][i];
                let left = w / 2 + (-5 + this.index.game.target.position[0] + dc) * size;
                let top = h / 2 + (9 - this.index.game.target.position[1] - dr) * size;
                this.index.ctx.beginPath();
                this.index.ctx.fillStyle = this.index.colors['x'];
                this.index.ctx.fillRect(left, top, size, size);
                this.index.ctx.fill();
                this.index.ctx.closePath();
            }
        }

        // PRINT GHOST PIECE
        if (this.index.game.customizations.ghost) {
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = this.index.game.minos[this.index.game.piece][this.index.game.rotation][i];
                let left = w / 2 + (-5 + this.index.game.position[0] + dc) * size;
                let top = h / 2 + (9 - this.index.game.position[1] - dr + this.index.game.height) * size;
                this.index.ctx.beginPath();
                this.index.ctx.strokeStyle = this.index.colors[this.index.game.piece];
                this.index.ctx.rect(left, top, size, size);
                this.index.ctx.stroke();
                this.index.ctx.closePath();
            }
        }

        // PRINT CURRENT PIECE
        for (let i = 0; i < 4; i++) {
            let [dc, dr] = this.index.game.minos[this.index.game.piece][this.index.game.rotation][i];
            let left = w / 2 + (-5 + this.index.game.position[0] + dc) * size;
            let top = h / 2 + (9 - this.index.game.position[1] - dr) * size;
            this.index.ctx.beginPath();
            this.index.ctx.fillStyle = this.index.colors[this.index.game.piece];
            this.index.ctx.fillRect(left, top, size, size);
            this.index.ctx.fill();
            this.index.ctx.closePath();
        }

        // PRINT HELD PIECE
        if (this.index.game.held != null) {
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = this.index.game.minos[this.index.game.held][0][i];
                let left = w / 2 + (-10 + dc) * size;
                let top = h / 2 + (-9 - dr) * size;
                this.index.ctx.beginPath();
                if (this.index.game.hold_used) {
                    this.index.ctx.fillStyle = this.index.colors['x'];
                } else {
                    this.index.ctx.fillStyle = this.index.colors[this.index.game.held];
                }
                this.index.ctx.fillRect(left, top, size, size);
                this.index.ctx.fill();
                this.index.ctx.closePath();
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
        this.index.ctx.fillText(this.index.game.stats.score, w / 2 + (6) * size, h / 2 + (6) * size);
        this.index.ctx.fillText(new Date(current_time - this.index.game.stats.time).toISOString().replace(/.*T[0:]{0,7}|Z$/g, ''), w / 2 + (6) * size, h / 2 + (9) * size);

        this.index.ctx.textAlign = 'right';
        this.index.ctx.font = `${size}px Arial`;
        this.index.ctx.fillText((this.index.game.b2b > 0) ? `${this.index.game.b2b} B2B` : '', w / 2 + (-6) * size, h / 2 + (-5) * size);
        this.index.ctx.fillText(this.index.game.last_clear, w / 2 + (-6) * size, h / 2 + (-4) * size);
        this.index.ctx.fillText((this.index.game.combo > 0) ? `${this.index.game.combo} combo` : '', w / 2 + (-6) * size, h / 2 + (-3) * size);
        this.index.ctx.fillText('pieces:', w / 2 + (-6) * size, h / 2 + (1) * size);
        this.index.ctx.fillText('lines:', w / 2 + (-6) * size, h / 2 + (4) * size);
        this.index.ctx.fillText('level:', w / 2 + (-6) * size, h / 2 + (7) * size);
        this.index.ctx.font = `${size * 2}px Arial`;
        this.index.ctx.fillText(this.index.game.stats.pieces, w / 2 + (-6) * size, h / 2 + (3) * size);
        this.index.ctx.fillText(this.index.game.stats.lines, w / 2 + (-6) * size, h / 2 + (6) * size);
        this.index.ctx.fillText(this.index.game.stats.level, w / 2 + (-6) * size, h / 2 + (9) * size);

        this.index.ctx.textAlign = 'center';
        this.index.ctx.font = `${size * 2}px Arial`;
        this.index.ctx.fillText(this.index.game.stats.mode, w / 2 + (0) * size, h / 2 + (12) * size);
    }

    keyDownHandler(e, current_time) {
        switch (e.key) {
            case this.index.bindings['quit']:
                new Pause(this.index, current_time).enter_state();
                break;
            case this.index.bindings['reset']:
                this.index.game.reset(this.index.handling, this.index.mode, this.index.level, this.index.get_key_hold(), current_time);
                this.exit_state();
                this.prev_state.countdown = current_time;
                break;
            case this.index.bindings['hold']:
                this.index.game.hold(current_time);
                break;
            case this.index.bindings['move_left']:
                this.index.game.move(-1, current_time);
                this.index.game.move_press('move_left', 'move_right', current_time);
                break;
            case this.index.bindings['move_right']:
                this.index.game.move(1, current_time);
                this.index.game.move_press('move_right', 'move_left', current_time);
                break;
            case this.index.bindings['rotate_cw']:
                this.index.game.rotate(1, current_time);
                break;
            case this.index.bindings['rotate_180']:
                this.index.game.rotate(2, current_time);
                break;
            case this.index.bindings['rotate_ccw']:
                this.index.game.rotate(3, current_time);
                break;
            case this.index.bindings['soft_drop']:
                this.index.game.soft_drop(current_time);
                break;
            case this.index.bindings['hard_drop']:
                this.index.game.hard_drop(current_time);
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