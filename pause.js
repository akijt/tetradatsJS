class Pause extends Screen {
    constructor(index, current_time) {
        super();
        this.index = index;
        this.index.game.pause(current_time);
    }

    update(current_time) {
    }

    render(current_time, w, h, size) {
        // PRINT BOARD
        for (let r = 0; r < 20; r++) {
            for (let c = 0; c < 10; c++) {
                this.index.ctx.beginPath();
                this.index.ctx.strokeStyle = 'rgb(255, 255, 255)';
                this.index.ctx.rect(w / 2 + (-5 + c) * size, h / 2 + (9 - r) * size, size, size);
                this.index.ctx.stroke();
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
        this.index.ctx.fillText(new Date(this.index.game.stats.time).toISOString().replace(/.*T[0:]{0,7}|Z$/g, ''), w / 2 + (6) * size, h / 2 + (9) * size);

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
                this.index.game.pause(current_time, this.index.get_key_hold());
                this.exit_state();
                break;
            case this.index.bindings['reset']:
                this.index.game.reset(this.index.handling, this.index.mode, this.index.level, this.index.get_key_hold(), current_time);
                this.exit_state();
                this.prev_state.exit_state();
                this.prev_state.prev_state.countdown = current_time;
                break;
        }
    }

    keyUpHandler(e, current_time) {
    }

    clickHandler(e, current_time, w, h, size) {
    }

    moveHandler(e, current_time, w, h, size) {
    }
}