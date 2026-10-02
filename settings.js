class Settings extends Screen {
    constructor(engine, game) {
        super(engine);
        this.game = game;
        this.selection = '';

        this.last_binding = null;
        this.flash_time = 0;
    }

    update(current_time) { // TODO: cookies to save state (future update)
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
        this.engine.ctx.fillText('SETTINGS', mid_x + (0) * tile_size, mid_y + (-8) * tile_size);
        
        // PRINT BINDINGS
        this.engine.ctx.font = `${tile_size}px Arial`;
        const actions = ['pause/back', 'reset', 'move left', 'move right', 'soft drop', 'hard drop', 'rotate left', 'rotate right', 'rotate 180', 'hold'];
        const bind_keys = ['quit', 'reset', 'move_left', 'move_right', 'soft_drop', 'hard_drop', 'rotate_ccw', 'rotate_cw', 'rotate_180', 'hold'];
        this.engine.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.lineWidth = tile_size / 16;
        this.engine.ctx.beginPath();
        for (let i = 0; i < 10; i++){
            this.engine.ctx.textAlign = 'right';
            this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
            this.engine.ctx.fillText(actions[i], mid_x + (-10) * tile_size, mid_y + (-6 + 2 * i) * tile_size);
            this.engine.ctx.textAlign = 'left';
            if (this.game.bindings[bind_keys[i]] === '##########' && this.flash_time > current_time) {
                let brightness = Math.floor(255 * (Math.sin(((this.flash_time - current_time) / 1000 + 0.25) * 2 * Math.PI) + 1) / 2);
                this.engine.ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            }
            else
                this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
            this.engine.ctx.fillText(this.game.bindings[bind_keys[i]], mid_x + (-8) * tile_size, mid_y + (-6 + 2 * i) * tile_size);
            this.engine.ctx.rect(mid_x + (-8 - 0.1) * tile_size, mid_y + (-7 - 0.1 + 2 * i) * tile_size, (7 + 0.2) * tile_size, (1 + 0.2) * tile_size);
        }
        this.engine.ctx.stroke();
        this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';

        // PRINT HANDLING
        this.engine.ctx.fillText('DAS', mid_x + (1) * tile_size, mid_y + (-6) * tile_size);
        this.engine.ctx.fillText('ARR', mid_x + (1) * tile_size, mid_y + (-1) * tile_size);
        this.engine.ctx.fillText('SDF', mid_x + (1) * tile_size, mid_y + (4) * tile_size);
        this.engine.ctx.textAlign = 'right';
        this.engine.ctx.fillText(this.game.handling['DAS'] + ' ms', mid_x + (11) * tile_size, mid_y + (-6) * tile_size);
        this.engine.ctx.fillText(this.game.handling['ARR'] + ' ms', mid_x + (11) * tile_size, mid_y + (-1) * tile_size);
        this.engine.ctx.fillText((this.game.handling['SDF'] === 0 ? 'instant' : this.game.handling['SDF'] + 'x'), mid_x + (11) * tile_size, mid_y + (4) * tile_size);

        this.engine.ctx.save();
        this.engine.ctx.lineWidth = Math.ceil(tile_size / 4);
        this.engine.ctx.lineCap = 'round';
        this.engine.ctx.beginPath();
        this.engine.ctx.moveTo(mid_x + (1) * tile_size, mid_y + (-5) * tile_size);
        this.engine.ctx.lineTo(mid_x + (11) * tile_size, mid_y + (-5) * tile_size);
        this.engine.ctx.moveTo(mid_x + (1) * tile_size, mid_y + (0) * tile_size);
        this.engine.ctx.lineTo(mid_x + (11) * tile_size, mid_y + (0) * tile_size);
        this.engine.ctx.moveTo(mid_x + (1) * tile_size, mid_y + (5) * tile_size);
        this.engine.ctx.lineTo(mid_x + (11) * tile_size, mid_y + (5) * tile_size);
        this.engine.ctx.stroke();
        this.engine.ctx.restore();

        let norm_das = (this.game.handling['DAS'] - 20) / (300 - 20)
        let norm_arr = (this.game.handling['ARR'] - 0) / (100 - 0)
        let norm_sdf = ((this.game.handling['SDF'] === 0 ? 41 : this.game.handling['SDF']) -  5) / (41 - 5)
        this.engine.ctx.beginPath();
        this.engine.ctx.arc(mid_x + (norm_das * (11 - 1) + 1) * tile_size, mid_y + (-5) * tile_size, .5 * tile_size, 0, 2 * Math.PI);
        this.engine.ctx.fill();
        this.engine.ctx.beginPath();
        this.engine.ctx.arc(mid_x + (norm_arr * (11 - 1) + 1) * tile_size, mid_y + (0) * tile_size, .5 * tile_size, 0, 2 * Math.PI);
        this.engine.ctx.fill();
        this.engine.ctx.beginPath();
        this.engine.ctx.arc(mid_x + (norm_sdf * (11 - 1) + 1) * tile_size, mid_y + (5) * tile_size, .5 * tile_size, 0, 2 * Math.PI);
        this.engine.ctx.fill();

        // PRINT BACK
        this.engine.ctx.save();
        this.engine.ctx.lineWidth = Math.ceil(tile_size / 4);
        this.engine.ctx.lineJoin = 'round';
        this.engine.ctx.beginPath();
        this.engine.ctx.moveTo(mid_x + (-12) * tile_size, mid_y + (-10.00) * tile_size);
        this.engine.ctx.lineTo(mid_x + (-12) * tile_size, mid_y + (-8.50) * tile_size);
        this.engine.ctx.lineTo(mid_x + (-13.4) * tile_size, mid_y + (-9.25) * tile_size);
        this.engine.ctx.closePath();
        this.engine.ctx.stroke();
        this.engine.ctx.fill();
        this.engine.ctx.restore();

        // PRINT GEARS
        for (let x = -7; x <= 7; x += 14) {
            const tooth_size = 0.4;
            const gear_x = mid_x + (x) * tile_size;
            const gear_y = mid_y + (-9.25) * tile_size;
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
            this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
        }
    }

    updateSlider(e) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        const minX = mid_x + 1 * tile_size;
        const maxX = mid_x + 11 * tile_size;
        const clampedX = Math.max(minX, Math.min(maxX, e.clientX));
        const norm = (clampedX - minX) / (maxX - minX);

        const ranges = {'DAS': [20, 300], 'ARR': [0, 100], 'SDF': [5, 41]};
        const [minVal, maxVal] = ranges[this.selection];
        let new_value = Math.round(minVal + norm * (maxVal - minVal));
        if (this.selection === 'SDF' && new_value === 41) new_value = 0;

        this.game.set_handling({[this.selection]: new_value});
    }

    mouseDownHandler(e, current_time) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        if (['DAS', 'ARR', 'SDF'].includes(this.selection)) {
            this.updateSlider(e);
        }
    }

    keyDownHandler(e, current_time) {
        if (this.last_binding) {
            for (const [action, code] of Object.entries(this.game.bindings)) {
                if (code === e.code)
                    this.game.set_bindings({[action]: '##########'});
            }
            this.game.set_bindings({[this.selection]: e.code});
            this.last_binding = null;
            return;
        }
        switch (e.code) {
            case this.game.bindings['quit']:
                if (Object.values(this.game.bindings).includes('##########'))
                    this.flash_time = current_time + 3000;
                else
                    this.exit_state();
                break;
        }
    }

    clickHandler(e, current_time) {
        if (this.last_binding) {
            this.game.set_bindings({[this.selection]: this.last_binding});
            this.last_binding = null;
        } else if (this.selection === 'back') {
            if (Object.values(this.game.bindings).includes('##########'))
                this.flash_time = current_time + 3000;
            else
                this.exit_state();
        } else if (this.selection === 'developer') {
            document.body.style.cursor = 'default';
            this.game.set_bindings({'quit'      : 'KeyQ',
                                    'reset'     : 'KeyR',
                                    'hold'      : 'KeyF',
                                    'move_left' : 'KeyM',
                                    'move_right': 'Period',
                                    'rotate_cw' : 'KeyD',
                                    'rotate_180': 'KeyA',
                                    'rotate_ccw': 'KeyS',
                                    'soft_drop' : 'Comma',
                                    'hard_drop' : 'Space'});
            this.game.set_handling({'DAS': 100, 'ARR': 0, 'SDF': 0})
        } else if (this.selection != '' && !['DAS', 'ARR', 'SDF'].includes(this.selection)) {
            document.body.style.cursor = 'default';
            this.last_binding = this.game.bindings[this.selection];
            this.game.set_bindings({[this.selection]: '...'});
        }
    }

    moveHandler(e, current_time) {
        const {w, h, tile_size, mid_x, mid_y} = this.engine;

        if (['DAS', 'ARR', 'SDF'].includes(this.selection) && this.engine.input_state['Mouse0']) {
            this.updateSlider(e);
        } else if (!this.last_binding) {
            this.selection = '';
            const bind_keys = ['quit', 'reset', 'move_left', 'move_right', 'soft_drop', 'hard_drop', 'rotate_ccw', 'rotate_cw', 'rotate_180', 'hold'];
            if (mid_x + (-8) * tile_size < e.clientX && e.clientX < mid_x + (-1) * tile_size) {
                for (let i = 0; i < 10; i++) {
                    if (mid_y + (-7 + 2 * i) * tile_size < e.clientY && e.clientY < mid_y + (-6 + 2 * i) * tile_size) {
                        this.selection = bind_keys[i];
                        break;
                    }
                }
            } else if (mid_x + (1) * tile_size < e.clientX && e.clientX < mid_x + (11) * tile_size) {
                if (mid_y + (-6) * tile_size < e.clientY && e.clientY < mid_y + (-4) * tile_size)
                    this.selection = 'DAS';
                if (mid_y + (-1) * tile_size < e.clientY && e.clientY < mid_y + (1) * tile_size)
                    this.selection = 'ARR';
                if (mid_y + (4) * tile_size < e.clientY && e.clientY < mid_y + (6) * tile_size)
                    this.selection = 'SDF';
            }
            if (mid_x + (-14) * tile_size < e.clientX && e.clientX < mid_x + (-12) * tile_size) {
                if (mid_y + (-10.25) * tile_size < e.clientY && e.clientY < mid_y + (-8.25) * tile_size)
                    this.selection = 'back';
            } else if (mid_x + (6) * tile_size < e.clientX && e.clientX < mid_x + (8) * tile_size) {
                if (mid_y + (-10.25) * tile_size < e.clientY && e.clientY < mid_y + (-8.25) * tile_size)
                    this.selection = 'developer';
            }
            if (this.selection) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        }
    }
}