class Menu extends Screen {
    constructor(engine, game) {
        super(engine);
        this.game = game;
        this.mode = '';
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
        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.fillText('TETRADATS', mid_x + (0) * tile_size, mid_y + (-8) * tile_size); // Rename to TETRAPADATS or TETRAPADKI
        this.engine.ctx.fillText(this.mode, mid_x + (0) * tile_size, mid_y + (12) * tile_size);

        // PRINT BUTTONS
        this.engine.ctx.beginPath();
        this.engine.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.lineWidth = tile_size / 8;
        this.engine.ctx.rect(mid_x + (-4) * tile_size, mid_y + (-4) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-1) * tile_size, mid_y + (-4) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (2) * tile_size, mid_y + (-4) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-1) * tile_size, mid_y + (-1) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-4) * tile_size, mid_y + (2) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-1) * tile_size, mid_y + (2) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (2) * tile_size, mid_y + (2) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.stroke();
    }

    keyDownHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['reset']:
                document.body.style.cursor = 'default';
                this.game.set_mode('marathon');
                this.game.set_level(1);
                this.game.reset(current_time);
                new Play(this.engine, this.game).enter_state(current_time);
                new Ready(this.engine, this.game).enter_state(current_time);
                break;
        }
    }

    clickHandler(e, current_time) {
        if (this.mode != '') {
            document.body.style.cursor = 'default';
            this.game.set_mode(this.mode);
            this.game.set_level(1);
            this.game.reset(current_time);
            new Play(this.engine, this.game).enter_state(current_time);
            new Ready(this.engine, this.game).enter_state(current_time);
        }
    }

    moveHandler(e, current_time) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        this.mode = '';
        if (mid_y + (-4) * tile_size < e.clientY && e.clientY < mid_y + (-2) * tile_size) {
            if (mid_x + (-4) * tile_size < e.clientX && e.clientX < mid_x + (-2) * tile_size) {
                this.mode = 'marathon';
            } else if (mid_x + (-1) * tile_size < e.clientX && e.clientX < mid_x + (1) * tile_size) {
                this.mode = 'sprint';
            } else if (mid_x + (2) * tile_size < e.clientX && e.clientX < mid_x + (4) * tile_size) {
                this.mode = 'blitz';
            }
        } else if (mid_y + (-1) * tile_size < e.clientY && e.clientY < mid_y + (1) * tile_size) {
            if (mid_x + (-1) * tile_size < e.clientX && e.clientX < mid_x + (1) * tile_size) {
                this.mode = 'classic';
            }
        } else if (mid_y + (2) * tile_size < e.clientY && e.clientY < mid_y + (4) * tile_size) {
            if (mid_x + (-4) * tile_size < e.clientX && e.clientX < mid_x + (-2) * tile_size) {
                this.mode = 'cheese';
            } else if (mid_x + (-1) * tile_size < e.clientX && e.clientX < mid_x + (1) * tile_size) {
                this.mode = 'finesse';
            } else if (mid_x + (2) * tile_size < e.clientX && e.clientX < mid_x + (4) * tile_size) {
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