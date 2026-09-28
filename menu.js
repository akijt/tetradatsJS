class Menu extends Screen {
    constructor(engine, game) {
        super(engine);
        this.game = game;
        this.selection = '';
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
        this.engine.ctx.fillText(this.selection, mid_x + (0) * tile_size, mid_y + (12) * tile_size);

        // PRINT BUTTONS
        this.engine.ctx.beginPath();
        this.engine.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.lineWidth = Math.ceil(tile_size / 8);
        this.engine.ctx.rect(mid_x + (-4) * tile_size, mid_y + (-4) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-1) * tile_size, mid_y + (-4) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (2) * tile_size, mid_y + (-4) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-1) * tile_size, mid_y + (-1) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-4) * tile_size, mid_y + (2) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (-1) * tile_size, mid_y + (2) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.rect(mid_x + (2) * tile_size, mid_y + (2) * tile_size, 2 * tile_size, 2 * tile_size);
        this.engine.ctx.stroke();

        // PRINT GEAR
        const tooth_size = 0.4;
        const gear_x = mid_x + (9) * tile_size;
        const gear_y = mid_y + (3) * tile_size;
        this.engine.ctx.save();
        this.engine.ctx.translate(gear_x, gear_y);
        for (let i = 0; i < 4; i++) {
            this.engine.ctx.rotate(45 * Math.PI / 180);
            this.engine.ctx.fillRect(-tooth_size / 2 * tile_size, -2 / 2 * tile_size, tooth_size * tile_size, 2 * tile_size);
        }
        this.engine.ctx.restore();

        this.engine.ctx.beginPath();
        this.engine.ctx.arc(gear_x, gear_y, .8 * tile_size, 0, 2 * Math.PI);
        this.engine.ctx.fill();

        this.engine.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.engine.ctx.beginPath();
        this.engine.ctx.arc(gear_x, gear_y, .4 * tile_size, 0, 2 * Math.PI);
        this.engine.ctx.fill();
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
        if (this.selection == 'settings') {
            document.body.style.cursor = 'default';
            new Settings(this.engine, this.game).enter_state(current_time);
        } else if (this.selection != '') {
            document.body.style.cursor = 'default';
            this.game.set_mode(this.selection);
            this.game.set_level(1);
            this.game.reset(current_time);
            new Play(this.engine, this.game).enter_state(current_time);
            new Ready(this.engine, this.game).enter_state(current_time);
        }
    }

    moveHandler(e, current_time) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        this.selection = '';
        if (mid_y + (-4) * tile_size < e.clientY && e.clientY < mid_y + (-2) * tile_size) {
            if (mid_x + (-4) * tile_size < e.clientX && e.clientX < mid_x + (-2) * tile_size) {
                this.selection = 'marathon';
            } else if (mid_x + (-1) * tile_size < e.clientX && e.clientX < mid_x + (1) * tile_size) {
                this.selection = 'sprint';
            } else if (mid_x + (2) * tile_size < e.clientX && e.clientX < mid_x + (4) * tile_size) {
                this.selection = 'blitz';
            }
        } else if (mid_y + (-1) * tile_size < e.clientY && e.clientY < mid_y + (1) * tile_size) {
            if (mid_x + (-1) * tile_size < e.clientX && e.clientX < mid_x + (1) * tile_size) {
                this.selection = 'classic';
            }
        } else if (mid_y + (2) * tile_size < e.clientY && e.clientY < mid_y + (4) * tile_size) {
            if (mid_x + (-4) * tile_size < e.clientX && e.clientX < mid_x + (-2) * tile_size) {
                this.selection = 'cheese';
            } else if (mid_x + (-1) * tile_size < e.clientX && e.clientX < mid_x + (1) * tile_size) {
                this.selection = 'finesse';
            } else if (mid_x + (2) * tile_size < e.clientX && e.clientX < mid_x + (4) * tile_size) {
                this.selection = '4-wide';
            } else if (mid_x + (8) * tile_size < e.clientX && e.clientX < mid_x + (10) * tile_size) {
                this.selection = 'settings';
            }
        }
        if (this.selection) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }
}