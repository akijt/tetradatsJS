class Finish extends Screen {
    constructor(engine, game) {
        super(engine);
        this.game = game;
        this.result = '';
        if (this.game.finish == 1) {
            if (this.game.stats.mode == 'sprint') {
                this.result = ((this.game.stats.time) / 1000).toFixed(3);
            } else if (this.game.stats.mode == 'finesse') {
                this.result = `${this.game.stats.pieces} pieces`
            } else if (this.game.stats.mode == 'cheese') {
                this.result = ((this.game.stats.time) / 1000).toFixed(3);
            } else if (this.game.stats.mode == '4-wide') {
                this.result = `${this.game.stats.lines} lines`;
            } else {
                this.result = `${this.game.stats.score} pts`;
            }
        } else {
            this.result = 'GAME OVER';
        }
        this.reset_key = this.game.bindings['reset'].replace(/^(Key|Digit|Arrow)/, '');
    }

    update(current_time) {
    }

    render(current_time) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        // CLEAR SCREEN
        this.engine.ctx.clearRect(0, 0, w, h);

        // PRINT TEXT
        this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.textBaseline = 'bottom';
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.font = `${tile_size}px Arial`;
        this.engine.ctx.fillText(`press ${this.reset_key} to try again`, mid_x + 0 * tile_size, mid_y + 0 * tile_size);
        this.engine.ctx.fillText(this.result, mid_x + 0 * tile_size, mid_y - 2 * tile_size);
    }

    keyDownHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['quit']:
                this.exit_state(2);
                break;
            case this.game.bindings['reset']:
                this.game.reset(current_time);
                this.exit_state();
                new Ready(this.engine, this.game).enter_state(current_time);
                break;
        }
    }
}