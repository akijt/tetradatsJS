class Finish extends Screen {
    constructor(index) {
        super();
        this.index = index;
        this.result = '';
        if (!this.index.game.lose) {
            if (this.index.game.stats.mode == 'sprint') {
                this.result = new Date(this.index.game.stats.time).toISOString().replace(/.*T[0:]{0,7}|Z$/g, '');
            } else if (this.index.game.stats.mode == 'finesse') {
                this.result = this.index.game.stats.pieces;
            } else if (this.index.game.stats.mode == 'cheese') {
                this.result = new Date(this.index.game.stats.time).toISOString().replace(/.*T[0:]{0,7}|Z$/g, '');
            } else if (this.index.game.stats.mode == '4-wide') {
                this.result = this.index.game.stats.lines;
            } else {
                this.result = this.index.game.stats.score;
            }
        }
    }

    update(current_time) {
    }

    render(current_time, w, h, size) {
        // PRINT TEXT
        this.index.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.index.ctx.textBaseline = 'bottom';
        this.index.ctx.textAlign = 'center';
        this.index.ctx.font = `${size}px Arial`;
        this.index.ctx.fillText('press r to try again', w / 2 + 0 * size, h / 2 + 0 * size);
        this.index.ctx.fillText(this.result, w / 2 + 0 * size, h / 2 - 2 * size);
    }

    keyDownHandler(e, current_time) {
        switch (e.key) {
            case this.index.bindings['quit']:
                this.exit_state();
                this.prev_state.exit_state();
                this.prev_state.prev_state.exit_state();
                break;
            case this.index.bindings['reset']:
                this.index.game.reset(this.index.handling, this.index.mode, this.index.level, this.index.get_key_hold(), current_time);
                this.exit_state();
                this.prev_state.exit_state();
                this.prev_state.prev_state.countdown = current_time;
        }
    }

    keyUpHandler(e, current_time) {
    }

    clickHandler(e, current_time, w, h, size) {
    }

    moveHandler(e, current_time, w, h, size) {
    }
}