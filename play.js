class Play extends Screen {
    constructor(engine, game) {
        super(engine);
        this.game = game;
    }

    update(current_time) {
        this.game.frame_update(current_time);
        if (this.game.finish) {
            new Finish(this.engine, this.game).enter_state(current_time);
        }
    }

    render(current_time) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        // CLEAR SCREEN
        this.engine.ctx.clearRect(0, 0, w, h);

        // this.engine.ctx.beginPath();
        // this.engine.ctx.strokeStyle = 'rgb(255, 255, 255)';
        // this.engine.ctx.moveTo(mid_x, 0);
        // this.engine.ctx.lineTo(mid_x, h);
        // this.engine.ctx.moveTo(0, mid_y);
        // this.engine.ctx.lineTo(w, mid_y);
        // this.engine.ctx.stroke();

        // PRINT BOARD
        this.engine.ctx.beginPath();
        this.engine.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.lineWidth = Math.ceil(tile_size / 16);
        for (let r = 0; r < 20; r++) {
            for (let c = 0; c < 10; c++) {
                if (this.game.board[r][c] == null) {
                    this.engine.ctx.rect(mid_x + (-5 + c) * tile_size, mid_y + (9 - r) * tile_size, tile_size, tile_size);
                }
            }
        }
        this.engine.ctx.stroke();
        for (let r = 0; r < 40; r++) {
            for (let c = 0; c < 10; c++) {
                if (this.game.board[r][c] != null && (r < 20 || this.game.board[r][c] != 'x')) {
                    this.engine.ctx.fillStyle = this.game.colors[this.game.board[r][c]];
                    this.engine.ctx.fillRect(mid_x + (-5 + c) * tile_size, mid_y + (9 - r) * tile_size, tile_size, tile_size);
                }
            }
        }

        // PRINT TARGET PIECE
        this.engine.ctx.fillStyle = this.game.colors['x'];
        if (this.game.customizations.target) {
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = Tetris.MINOS[this.game.piece][this.game.target.rotation][i];
                let left = mid_x + (-5 + this.game.target.position[0] + dc) * tile_size;
                let top = mid_y + (9 - this.game.target.position[1] - dr) * tile_size;
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
        }

        // PRINT GHOST PIECE
        if (this.game.customizations.ghost) {
            this.engine.ctx.globalAlpha = 0.5;
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = Tetris.MINOS[this.game.piece][this.game.rotation][i];
                let left = mid_x + (-5 + this.game.position[0] + dc) * tile_size;
                let top = mid_y + (9 - this.game.position[1] - dr + this.game.height) * tile_size;
                this.engine.ctx.fillStyle = this.game.colors[this.game.piece];
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
            this.engine.ctx.globalAlpha = 1.0;
        }

        // PRINT CURRENT PIECE
        this.engine.ctx.fillStyle = this.game.colors[this.game.piece];
        for (let i = 0; i < 4; i++) {
            let [dc, dr] = Tetris.MINOS[this.game.piece][this.game.rotation][i];
            let left = mid_x + (-5 + this.game.position[0] + dc) * tile_size;
            let top = mid_y + (9 - this.game.position[1] - dr) * tile_size;
            this.engine.ctx.fillRect(left, top, tile_size, tile_size);
        }

        // PRINT HELD PIECE
        if (this.game.held != null) {
            if (this.game.hold_used) {
                this.engine.ctx.fillStyle = this.game.colors['x'];
            } else {
                this.engine.ctx.fillStyle = this.game.colors[this.game.held];
            }
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = Tetris.MINOS[this.game.held][0][i];
                let left = mid_x + (-10 + dc) * tile_size;
                let top = mid_y + (-9 - dr) * tile_size;
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
        }

        // PRINT NEXT PIECES
        for (let j = 0; j < this.game.customizations.next; j++) {
            this.engine.ctx.fillStyle = this.game.colors[this.game.queue[j]];
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = Tetris.MINOS[this.game.queue[j]][0][i];
                let left = mid_x + (6 + dc) * tile_size;
                let top = mid_y + (-9 - dr + 3 * j) * tile_size;
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
        }

        // PRINT TEXT
        this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.textBaseline = 'bottom';

        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.fillText(this.game.stats.mode, mid_x + (0) * tile_size, mid_y + (12) * tile_size);

        this.engine.ctx.textAlign = 'left';
        // this.engine.ctx.fillText(this.engine.debug, mid_x + (6) * tile_size, mid_y + (3) * tile_size);
        this.engine.ctx.fillText(this.game.stats.score, mid_x + (6) * tile_size, mid_y + (6) * tile_size);
        this.engine.ctx.fillText(((current_time - this.game.stats.time) / 1000).toFixed(3), mid_x + (6) * tile_size, mid_y + (9) * tile_size);

        this.engine.ctx.textAlign = 'right';
        this.engine.ctx.fillText(this.game.stats.pieces, mid_x + (-6) * tile_size, mid_y + (3) * tile_size);
        this.engine.ctx.fillText(this.game.stats.lines, mid_x + (-6) * tile_size, mid_y + (6) * tile_size);
        this.engine.ctx.fillText(this.game.stats.level, mid_x + (-6) * tile_size, mid_y + (9) * tile_size);

        this.engine.ctx.font = `${tile_size}px Arial`;
        this.engine.ctx.textAlign = 'left';
        // this.engine.ctx.fillText(this.engine.debug ? 'debug:' : '', mid_x + (6) * tile_size, mid_y + (1) * tile_size);
        this.engine.ctx.fillText('score:', mid_x + (6) * tile_size, mid_y + (4) * tile_size);
        this.engine.ctx.fillText('time:', mid_x + (6) * tile_size, mid_y + (7) * tile_size);

        this.engine.ctx.textAlign = 'right';
        this.engine.ctx.fillText((this.game.b2b > 0) ? `${this.game.b2b} B2B` : '', mid_x + (-6) * tile_size, mid_y + (-5) * tile_size);
        this.engine.ctx.fillText(this.game.last_clear, mid_x + (-6) * tile_size, mid_y + (-4) * tile_size);
        this.engine.ctx.fillText((this.game.combo > 0) ? `${this.game.combo} combo` : '', mid_x + (-6) * tile_size, mid_y + (-3) * tile_size);
        this.engine.ctx.fillText('pieces:', mid_x + (-6) * tile_size, mid_y + (1) * tile_size);
        this.engine.ctx.fillText('lines:', mid_x + (-6) * tile_size, mid_y + (4) * tile_size);
        this.engine.ctx.fillText('level:', mid_x + (-6) * tile_size, mid_y + (7) * tile_size);
    }

    keyDownHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['quit']:
                this.game.on_pause(current_time);
                new Pause(this.engine, this.game).enter_state(current_time);
                break;
            case this.game.bindings['reset']:
                this.game.on_reset(current_time);
                new Ready(this.engine, this.game).enter_state(current_time);
                break;
            case this.game.bindings['hold']:
                this.game.on_hold(current_time);
                break;
            case this.game.bindings['move_left']:
                this.game.on_move_left_press(current_time);
                break;
            case this.game.bindings['move_right']:
                this.game.on_move_right_press(current_time);
                break;
            case this.game.bindings['rotate_cw']:
                this.game.on_rotate_cw(current_time);
                break;
            case this.game.bindings['rotate_180']:
                this.game.on_rotate_180(current_time);
                break;
            case this.game.bindings['rotate_ccw']:
                this.game.on_rotate_ccw(current_time);
                break;
            case this.game.bindings['soft_drop']:
                this.game.on_soft_drop_press(current_time);
                break;
            case this.game.bindings['hard_drop']:
                this.game.on_hard_drop(current_time);
                break;
        }
    }

    keyUpHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['move_left']:
                this.game.on_move_left_unpress(current_time);
                break;
            case this.game.bindings['move_right']:
                this.game.on_move_right_unpress(current_time);
                break;
            case this.game.bindings['soft_drop']:
                this.game.on_soft_drop_unpress(current_time);
                break;
        }
    }
}