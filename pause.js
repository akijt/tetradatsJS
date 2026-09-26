class Pause extends Screen {
    constructor(engine, game) {
        super(engine);
        this.game = game;
    }

    update(current_time) {
    }

    render(current_time) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        // CLEAR SCREEN
        this.engine.ctx.clearRect(0, 0, w, h);

        // PRINT BOARD
        this.engine.ctx.beginPath();
        this.engine.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.lineWidth = tile_size / 16;
        for (let r = 0; r < 20; r++) {
            for (let c = 0; c < 10; c++) {
                this.engine.ctx.rect(mid_x + (-5 + c) * tile_size, mid_y + (9 - r) * tile_size, tile_size, tile_size);
            }
        }
        this.engine.ctx.stroke();

        // PRINT TEXT
        this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.textBaseline = 'bottom';

        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.fillText(this.game.stats.mode, mid_x + (0) * tile_size, mid_y + (12) * tile_size);

        this.engine.ctx.textAlign = 'left';
        // this.engine.ctx.fillText(this.engine.debug, mid_x + (6) * tile_size, mid_y + (3) * tile_size);
        this.engine.ctx.fillText(this.game.stats.score, mid_x + (6) * tile_size, mid_y + (6) * tile_size);
        this.engine.ctx.fillText((this.game.stats.time / 1000).toFixed(3), mid_x + (6) * tile_size, mid_y + (9) * tile_size);

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
                this.game.pause(current_time);
                this.exit_state();
                break;
            case this.game.bindings['reset']:
                this.game.reset(current_time);
                this.exit_state();
                new Ready(this.engine, this.game).enter_state(current_time);
                break;
            case this.game.bindings['move_left']:
                this.game.move_press('move_left', 'move_right', current_time);
                break;
            case this.game.bindings['move_right']:
                this.game.move_press('move_right', 'move_left', current_time);
                break;
            case this.game.bindings['soft_drop']:
                this.game.soft_drop(current_time);
                break;
        }
    }

    keyUpHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['move_left']:
                this.game.move_unpress('move_left', 'move_right', current_time);
                break;
            case this.game.bindings['move_right']:
                this.game.move_unpress('move_right', 'move_left', current_time);
                break;
            case this.game.bindings['soft_drop']:
                this.game.unsoft_drop();
                break;
        }
    }
}