class Tetris { // TODO: review 180 kicks
    static MINOS = {'i': [[[0, 2], [1, 2], [2, 2], [3, 2]], [[2, 0], [2, 1], [2, 2], [2, 3]], [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 0], [1, 1], [1, 2], [1, 3]]],
                    'j': [[[0, 2], [1, 2], [2, 2], [0, 3]], [[1, 1], [1, 2], [1, 3], [2, 3]], [[0, 2], [1, 2], [2, 2], [2, 1]], [[1, 1], [1, 2], [1, 3], [0, 1]]],
                    'l': [[[0, 2], [1, 2], [2, 2], [2, 3]], [[1, 1], [1, 2], [1, 3], [2, 1]], [[0, 2], [1, 2], [2, 2], [0, 1]], [[1, 1], [1, 2], [1, 3], [0, 3]]],
                    'o': [[[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]]],
                    's': [[[1, 2], [1, 3], [0, 2], [2, 3]], [[1, 2], [2, 2], [1, 3], [2, 1]], [[1, 2], [1, 1], [2, 2], [0, 1]], [[1, 2], [0, 2], [1, 1], [0, 3]]],
                    't': [[[1, 2], [0, 2], [1, 3], [2, 2]], [[1, 2], [1, 3], [2, 2], [1, 1]], [[1, 2], [2, 2], [1, 1], [0, 2]], [[1, 2], [1, 1], [0, 2], [1, 3]]],
                    'z': [[[1, 2], [1, 3], [2, 2], [0, 3]], [[1, 2], [2, 2], [1, 1], [2, 3]], [[1, 2], [1, 1], [0, 2], [2, 1]], [[1, 2], [0, 2], [1, 3], [0, 1]]]};
    static DEFAULT_KICKS = {'t': [[[[ 0, 0]],
                                   [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
                                   [[ 0, 0], [ 0, 1]],
                                   [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]]],
                                  [[[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
                                   [[ 0, 0], [ 1, 0]]],
                                  [[[ 0, 0], [ 0,-1]],
                                   [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]]],
                                  [[[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
                                   [[ 0, 0], [-1, 0]],
                                   [[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
                                   [[ 0, 0]]]],
                            'i': [[[[ 0, 0]],
                                   [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]],
                                   [[ 0, 0], [ 0, 1]],
                                   [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]]],
                                  [[[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]],
                                   [[ 0, 0], [ 1, 0]]],
                                  [[[ 0, 0], [ 0,-1]],
                                   [[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]]],
                                  [[[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
                                   [[ 0, 0], [-1, 0]],
                                   [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]],
                                   [[ 0, 0]]]]};
    static FINESSE = {'o': [[1, 2, 2, 1, 0, 1, 2, 2, 1],
                            [1, 2, 2, 1, 0, 1, 2, 2, 1],
                            [1, 2, 2, 1, 0, 1, 2, 2, 1],
                            [1, 2, 2, 1, 0, 1, 2, 2, 1]],
                      'i': [[1, 2, 1, 0, 1, 2, 1],
                            [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
                            [1, 2, 1, 0, 1, 2, 1],
                            [2, 2, 2, 2, 1, 1, 2, 2, 2, 2]],
                      's': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2],
                            [1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2]],
                      'z': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2],
                            [1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2]],
                      't': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 3, 2, 1, 2, 3, 3, 2],
                            [3, 4, 3, 2, 3, 4, 4, 3],
                            [2, 3, 2, 1, 2, 3, 3, 2, 2]],
                      'j': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 3, 2, 1, 2, 3, 3, 2],
                            [3, 4, 3, 2, 3, 4, 4, 3],
                            [2, 3, 2, 1, 2, 3, 3, 2, 2]],
                      'l': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 3, 2, 1, 2, 3, 3, 2],
                            [3, 4, 3, 2, 3, 4, 4, 3],
                            [2, 3, 2, 1, 2, 3, 3, 2, 2]]};
    static ORIENTATIONS = {'o': 1, 'i': 2, 's': 2, 'z': 2, 'j': 4, 'l': 4, 't': 4};
    static STAT_NAMES = ['mode', 'time', 'score', 'pieces', 'lines', 'level',
                         'DAS', 'ARR', 'SDF', 'keys', 'holds', 'finesse',
                         'single', 'double', 'triple', 'tetris',
                         'mini t-spin null', 'mini t-spin single', 'mini t-spin double',
                         't-spin null', 't-spin single', 't-spin double', 't-spin triple',
                         'perfect clear single', 'perfect clear double', 'perfect clear triple',
                         'perfect clear tetris', 'max b2b', 'max combo'];
    static CLEAR_STRINGS     = {0: 'null', 1: 'single', 2: 'double', 3: 'triple', 4: 'tetris'};
    static PC_SCORES         = {1: 800, 2: 1200, 3: 1800, 4: 2000};
    static TSPIN_SCORES      = {0: 400, 1: 800,  2: 1200, 3: 1600};
    static MINI_TSPIN_SCORES = {0: 100, 1: 200,  2: 400};
    static LINE_SCORES       = {1: 100, 2: 300,  3: 500,  4: 800};

    constructor() {
        this.colors = {'z': 'rgb(255,   0,   0)',
                       'l': 'rgb(255, 165,   0)',
                       'o': 'rgb(255, 255,   0)',
                       's': 'rgb(  0, 255,   0)',
                       'i': 'rgb(  0, 255, 255)',
                       'j': 'rgb(  0,   0, 255)',
                       't': 'rgb(160,  32, 240)', 
                       'x': 'rgb(127, 127, 127)'};
        this.key_hold = [0, 0, 0]; // [move_left, soft_drop, move_right]
        this.lock = {'time': 500, 'count': 15};
        this.mode = '';
        this.level = 0;
        this.bindings = {'quit'      : 'Escape',
                         'reset'     : 'KeyR',
                         'hold'      : 'KeyV',
                         'move_left' : 'ArrowLeft',
                         'move_right': 'ArrowRight',
                         'rotate_cw' : 'KeyC',
                         'rotate_180': 'KeyZ',
                         'rotate_ccw': 'KeyX',
                         'soft_drop' : 'ArrowDown',
                         'hard_drop' : 'ArrowUp'};
        this.handling = {'DAS': 150, 'ARR': 30, 'SDF': 20};
    }

    on_move_left_press(time)    {this.move_press(-1, time);}
    on_move_left_unpress(time)  {this.move_unpress(-1, time);}
    on_move_right_press(time)   {this.move_press(1, time);}
    on_move_right_unpress(time) {this.move_unpress(1, time);}
    on_soft_drop_press(time)    {this.soft_drop(time);}
    on_soft_drop_unpress(time)  {this.unsoft_drop();}
    on_rotate_cw(time)          {this.rotate(1, time);}
    on_rotate_180(time)         {this.rotate(2, time);}
    on_rotate_ccw(time)         {this.rotate(3, time);}
    on_hard_drop(time)          {this.hard_drop(time);}
    on_hold(time)               {this.hold(time);}
    on_pause(time)              {this.pause(time);}
    on_reset(time)              {this.reset(time);}

    shuffle(a, duplicates) {
        if (duplicates) return Array.from({ length: a.length }, () => a[Math.floor(Math.random() * a.length)]);
        const arr = [...a];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    set_mode(mode) {
        this.mode = mode;
    }

    set_level(level) {
        this.level = level;
    }

    set_bindings(bindings) {
        Object.assign(this.bindings, bindings);
    }

    set_handling(handling) {
        Object.assign(this.handling, handling);
    }

    reset_mode() {
        // Lock Delay Types (this.customizations.lock_type):
        // 0: Classic Lock (Strict timer)
        // 1: Extended Lock (Timer resets on action with action cap)
        // 2: Infinite Lock (Timer resets on action with no action cap)
        switch (this.mode) {
            case 'classic':
                this.customizations.kick = false;
                this.customizations.r180 = false;
                this.customizations.queue_type = 1;
                this.customizations.allow_hold = false;
                this.customizations.allow_hd = false;
                this.customizations.sd_type = 1;
                this.customizations.lock_type = 0;
                this.customizations.ghost = false;
                this.customizations.next = 1;
                this.stats.DAS = 300;
                this.stats.ARR = 100;
                this.stats.SDF = 33;
                break;
            case 'finesse':
                this.customizations.allow_hold = false;
                // this.customizations.ghost = false;
                this.customizations.next = 0;
                this.customizations.target = true;
                break;
            case 'cheese':
                this.customizations.cheese = 5;
                this.add_cheese(this.customizations.cheese);
                break;
            case '4-wide':
                this.customizations.four_wide = true;
                for (let r = 0; r < 40; r++) this.board[r] = ['x', 'x', 'x', null, null, null, null, 'x', 'x', 'x'];
                this.board[0][3] = 'x';
                this.board[1][3] = 'x';
                this.board[1][4] = 'x';
                break;
        }
    }

    reset(current_time) {
        this.paused = true;
        this.board = [...new Array(40)].map(() => new Array(10).fill(null));

        this.stats = {};
        Tetris.STAT_NAMES.forEach(x => this.stats[x] = 0);
        Object.keys(this.handling).forEach(x => this.stats[x] = this.handling[x]);
        this.stats.mode = this.mode;
        this.stats.level = this.level;

        this.customizations = {'kick': true, 'r180': true, 'queue_type': 0, 'allow_hold': true, 'allow_hd': true, 'sd_type': 0, 'lock_type': 1, 'ghost': true, 'next': 3, 'target': false, 'cheese': 0, 'four_wide': false};
        this.reset_mode();
        this.kicks = structuredClone(Tetris.DEFAULT_KICKS);
        if (!this.customizations.kick) ['t', 'i'].forEach(x => [0, 1, 2, 3].forEach(y => [0, 1, 2, 3].forEach(z => this.kicks[x][y][z] = [[0, 0]])));
        if (!this.customizations.r180) ['t', 'i'].forEach(x => [0, 1, 2, 3].forEach(y => this.kicks[x][y][(y + 2) % 4] = []));
        

        this.queue = this.shuffle(Object.keys(Tetris.MINOS), this.customizations.queue_type);
        this.held = null;
        this.hold_used = false;
        this.gravity = (0.8 - (this.stats.level - 1) * 0.007) ** (this.stats.level - 1) * 1000; // TODO: validate gravity
        
        this.b2b = -1;
        this.combo = -1;
        this.last_clear = '';
        this.finesse_keys = 0;
        this.finish = 0;

        this.move_time = 0;
        const key_hold_old = this.key_hold;
        this.key_hold = [0, 0, 0];
        if (key_hold_old[1] === 1) this.soft_drop(current_time);
        if (key_hold_old[0] === 1) this.move_press(-1, current_time);
        else if (key_hold_old[2] === 1) this.move_press(1, current_time);
        if (key_hold_old[0] === 2) this.move_press(-1, current_time);
        else if (key_hold_old[2] === 2) this.move_press(1, current_time);
    }

    start(current_time) {
        this.paused = false;
        this.stats.time = current_time;
        this.stats.keys = 0;

        if (this.move_time) this.move_time = Math.max(this.move_time, current_time - this.stats.ARR);

        this.new_piece(this.queue.shift(), current_time);
    }

    new_piece(piece, current_time) {
        this.piece = piece;
        this.position = [3, 18];
        this.rotation = 0;

        if (this.collision()) {
            this.finish = -1;
            return;
        }
        if (this.queue.length < 8) this.queue.push(...this.shuffle(Object.keys(Tetris.MINOS), this.customizations.queue_type));

        this.gravity_time = current_time - this.gravity;
        this.lock_time = 0;
        this.lock_count = 0;
        this.lock_lowest = 18;
        this.set_height();
        this.set_lock(current_time);
        this.last_action = '';
        this.finesse_keys = 0;
        if (this.customizations.target) this.set_target();
    }

    set_target() {
        this.target = {};
        this.target.rotation = Math.floor(Math.random() * 4);
        this.target.location = Math.floor(Math.random() * Tetris.FINESSE[this.piece][this.target.rotation].length);
        const minos_piece_rotation = Tetris.MINOS[this.piece][this.target.rotation];
        this.target.position = [
            this.target.location - Math.min(...minos_piece_rotation.map(x => x[0])),
            -Math.min(...minos_piece_rotation.map(x => x[1]))];
    }

    hold(current_time) {
        if (this.customizations.allow_hold) {
            this.stats.keys++;
            if (!this.hold_used) {
                this.stats.holds++;
                this.hold_used = true;
                if (this.held === null) {
                    this.held = this.piece;
                    this.new_piece(this.queue.shift(), current_time);
                } else {
                    const temp = this.held;
                    this.held = this.piece;
                    this.new_piece(temp, current_time);
                }
            }
        }
    }

    move(distance, current_time) {
        const step = (distance > 0) ? 1 : -1;
        let i = 0;
        while (i < Math.abs(distance)) {
            this.position[0] += step;
            if (this.collision()) {
                this.position[0] -= step;
                if (i === 0) return;
                break;
            }
            i++;
        }
        this.set_height();
        this.set_lock(current_time, i);
        this.last_action = 'move';
    }

    rotate(turns, current_time) {
        this.stats.keys++;
        const actions = (turns % 2 === 1) ? 1 : 2;
        this.finesse_keys += actions;
        const orig_position = [...this.position];
        const orig_rotation = this.rotation;
        this.rotation = (this.rotation + turns) % 4;
        const kicks_piece_rotation = this.kicks[(this.piece === 'i') ? 'i' : 't'][orig_rotation][this.rotation];
        for (let i = 0; i < kicks_piece_rotation.length; i++) {
            const [x, y] = kicks_piece_rotation[i];
            this.position = [orig_position[0] + x, orig_position[1] + y];
            if (!this.collision()) {
                this.set_height();
                this.set_lock(current_time, actions);
                this.last_action = `rotate${i}`;
                return;
            }
        }
        this.position = orig_position;
        this.rotation = orig_rotation;
    }

    drop(distance, current_time) {
        distance = Math.min(distance, this.height);
        if (distance <= 0) return;
        this.position[1] -= distance;
        this.set_height();
        this.set_lock(current_time);
        if (this.position[1] < this.lock_lowest) {
            this.lock_lowest = this.position[1];
            this.lock_count = 0;
        }
        this.stats.score += distance * this.key_hold[1];
        this.last_action = 'drop';
    }

    soft_drop(current_time) {
        this.stats.keys++;
        this.finesse_keys++;
        this.key_hold[1] = 1;
        if (this.stats.SDF <= 1) {
            this.gravity = 0;
        } else {
            if (this.customizations.sd_type === 0) {
                this.gravity /= this.stats.SDF;
            } else if (this.gravity > this.stats.SDF) {
                this.gravity = this.stats.SDF;
            }
            this.gravity_time = current_time - this.gravity;
        }
    }

    unsoft_drop() {
        this.key_hold[1] = 0;
        this.gravity = (0.8 - (this.stats.level - 1) * 0.007) ** (this.stats.level - 1) * 1000;
    }

    hard_drop(current_time) {
        if (this.customizations.allow_hd) {
            this.stats.keys++;
            if (this.height > 0) {
                this.position[1] -= this.height;
                this.stats.score += this.height * 2;
                this.last_action = 'drop';
            }
            this.place(current_time);
        }
    }

    place(current_time) {
        if (Tetris.MINOS[this.piece][this.rotation].every(d => this.position[1] + d[1] >= 20)) {
            this.finish = -1;
            return;
        }

        this.stats.pieces++;
        this.f_check();
        if (!this.customizations.target) {
            Tetris.MINOS[this.piece][this.rotation].forEach(d => this.board[this.position[1] + d[1]][this.position[0] + d[0]] = this.piece);
            this.clear();
        }
        this.new_piece(this.queue.shift(), current_time);
        this.hold_used = false;
    }

    clear() {
        const t_score = this.t_check();
        let rows = 0;
        let cheese_cleared = 0;
        for (let r = 0; r < 40; r++) {
            if (this.board[r].some(x => x === null)) {
                this.board[rows] = this.board[r];
                rows++;
            } else if (r < this.customizations.cheese) {
                cheese_cleared++;
            }
        }
        const clear_count = 40 - rows;
        const is_pc = rows === 0;
        for (rows; rows < 40; rows++) {
            if (this.customizations.four_wide)
                this.board[rows] = ['x', 'x', 'x', null, null, null, null, 'x', 'x', 'x'];
            else
                this.board[rows] = new Array(10).fill(null);
        }
        this.add_cheese(cheese_cleared);
        const clear_string = Tetris.CLEAR_STRINGS[clear_count];
        if (clear_count > 0) {
            if (clear_count === 4 || t_score >= 10) {
                this.b2b++;
                if (this.b2b > this.stats['max b2b']) this.stats['max b2b'] = this.b2b;
            } else {
                this.b2b = -1;
            }
        }
        if (is_pc) {
            this.stats.score += Tetris.PC_SCORES[clear_count] * ((this.b2b > 0) ? 1.6 : 1) * this.stats.level;
            this.last_clear = `perfect clear ${clear_string}`;
        } else if (t_score > 10) {
            this.stats.score += Tetris.TSPIN_SCORES[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = `t-spin ${clear_string}`;
        } else if (t_score === 10) {
            this.stats.score += Tetris.MINI_TSPIN_SCORES[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = `mini t-spin ${clear_string}`;
        } else if (clear_count > 0) {
            this.stats.score += Tetris.LINE_SCORES[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = clear_string;
        }
        if (clear_count > 0 || t_score >= 10) this.stats[this.last_clear]++;
        if (clear_count > 0) {
            this.combo++;
            this.stats.score += 50 * this.combo * this.stats.level;
            if (this.combo > this.stats['max combo']) this.stats['max combo'] = this.combo;
            this.stats.lines += clear_count;
            if (this.stats.lines >= this.stats.level * 10) {
                this.stats.level++;
                this.gravity = (0.8 - (this.stats.level - 1) * 0.007) ** (this.stats.level - 1) * 1000;
            }
        } else {
            this.combo = -1;
            if (this.customizations.four_wide) this.finish = -1;
        }
    }

    t_check() {
        let t_score = 0;
        if (this.piece === 't' && this.last_action[0] === 'r') {
            const corners = [[0, 3], [2, 3], [2, 1], [0, 1]];
            for (let i = 0; i < 4; i++) {
                const [dc, dr] = corners[i];
                const c = this.position[0] + dc;
                const r = this.position[1] + dr;
                if (r < 0 || c < 0 || c > 9 || this.board[r][c] !== null) {
                    if (i === this.rotation || i === (this.rotation + 1) % 4) {
                        t_score += 4;
                    } else {
                        t_score += 3;
                    }
                }
            }
            t_score += this.last_action[6] === '4';
        }
        return t_score;
    }

    f_check() {
        const col = this.position[0] + Math.min(...Tetris.MINOS[this.piece][this.rotation].map(d => d[0]));
        if (this.customizations.target) {
            if (this.rotation % Tetris.ORIENTATIONS[this.piece] !== this.target.rotation % Tetris.ORIENTATIONS[this.piece] || col !== this.target.location) {
                this.stats.pieces--;
                this.finish = -1;
                return;
            }
        }
        for (let i = 0; i < 4; i++) {
            const [dc, dr] = Tetris.MINOS[this.piece][this.rotation][i];
            const c = this.position[0] + dc;
            const r = this.position[1] + dr;
            for (let j = r + 1; j < 22; j++) {
                if (this.board[j][c] !== null) return;
            }
        }
        if (this.finesse_keys > Tetris.FINESSE[this.piece][this.rotation][col]) {
            this.stats.finesse++;
            if (this.customizations.target) {
                this.stats.pieces--;
                this.finish = -1;
            }
        }
    }

    add_cheese(n, aligned = false) {
        if (n <= 0) return;
        for (let r = 40 - n; r < 40; r++) {
            if (this.board[r].some(x => x !== null)) {
                this.finish = -1;
                return;
            }
        }
        const aligned_gap = Math.floor(Math.random() * 10);
        const new_cheese = [];
        for (let i = 0; i < n; i++) {
            const row = new Array(10).fill('x');
            const gap = aligned ? aligned_gap : Math.floor(Math.random() * 10);
            row[gap] = null;
            new_cheese.push(row);
        }
        this.board.splice(40 - n, n);
        this.board.unshift(...new_cheese);
    }

    set_height() {
        const board = this.board;
        const minos_piece_rotation = Tetris.MINOS[this.piece][this.rotation];
        const pos_x = this.position[0];
        const pos_y = this.position[1];

        let new_height = 40;
        for (let i = 0; i < 4; i++) {
            const block = minos_piece_rotation[i];
            const c = pos_x + block[0];
            let r = pos_y + block[1] - 1;

            let drop = 0;
            while (r >= 0 && board[r][c] === null) {
                drop++;
                r--;
            }
            if (drop < new_height) {
                new_height = drop;
                if (new_height === 0) break;
            }
        }
        this.height = new_height;
    }

    collision() {
        const board = this.board;
        const minos_piece_rotation = Tetris.MINOS[this.piece][this.rotation];
        const pos_x = this.position[0];
        const pos_y = this.position[1];

        for (let i = 0; i < 4; i++) {
            const block = minos_piece_rotation[i];
            const c = pos_x + block[0];
            const r = pos_y + block[1];
            if (c < 0 || c > 9 || r < 0 || board[r][c] !== null) return true;
        }
        return false;
    }

    move_press(direction, current_time) {
        this.stats.keys++;
        this.finesse_keys++;
        this.key_hold[direction + 1] = this.key_hold[1 - direction] + 1;
        this.move_time = current_time + this.stats.DAS - this.stats.ARR;

        if (!this.paused) this.move(direction, current_time);
    }

    move_unpress(direction, current_time) {
        const opposite = 1 - direction;
        this.key_hold[direction + 1] = 0;
        if (this.key_hold[opposite] === 0) {
            this.move_time = 0;
        } else if (this.key_hold[opposite] === 1) {
            this.move_time = current_time + this.stats.DAS - this.stats.ARR; // DAS added back to prevent "DAS skip"
        } else {
            this.key_hold[opposite] = 1;
        }
    }

    move_hold(current_time) {
        if (this.move_time > 0) {
            const step = this.key_hold[2] - this.key_hold[0];
            const move_timer = current_time - this.move_time;
            if (move_timer >= this.stats.ARR) {
                if (this.stats.ARR === 0) {
                    this.move_time = current_time;
                    this.move(9 * step, current_time);
                } else {
                    const distance = Math.floor(move_timer / this.stats.ARR);
                    this.move_time += this.stats.ARR * distance;
                    this.move(distance * step, current_time);
                }
            }
        }
    }

    gravity_drop(current_time) {
        const gravity_timer = current_time - this.gravity_time;
        if (gravity_timer >= this.gravity) {
            if (this.gravity === 0) {
                this.gravity_time = current_time;
                this.drop(40, current_time);
            } else {
                const distance = Math.floor(gravity_timer / this.gravity);
                this.gravity_time += this.gravity * distance;
                this.drop(distance, current_time);
            }
        }
    }

    set_lock(current_time, actions = 0) {
        if (actions > 0 && this.customizations.lock_type > 0) {
            if (this.lock_time > 0 || this.height === 0 || this.lock_count > 0)
                this.lock_count += actions;
            if (this.lock_time > 0)
                this.lock_time = current_time;
        }
        if (this.height === 0 && this.lock_time === 0) {
            this.lock_time = current_time;
        } else if (this.height > 0) {
            this.lock_time = 0;
        }
    }

    piece_lock(current_time) {
        if (this.lock_time > 0) {
            const lock_timer = current_time - this.lock_time;
            if (lock_timer >= this.lock['time'] || (this.lock_count >= this.lock['count'] && this.customizations.lock_type === 1))
                this.place(current_time);
        }
    }

    finish_check(current_time) {
        if (this.finish !== -1) {
            if ((this.stats.mode === 'sprint' && this.stats.lines >= 40) || (this.stats.mode === 'blitz' && current_time - this.stats.time >= 120000)) {
                this.finish = 1;
            }
        }
        if (this.finish !== 0) {
            this.stats.time = current_time - this.stats.time;
            if (['marathon', 'classic', 'finesse', '4-wide'].includes(this.stats.mode)) this.finish = 1;
        }
    }

    frame_update(current_time) {
        this.move_hold(current_time);
        this.gravity_drop(current_time);
        this.piece_lock(current_time);
        this.finish_check(current_time);
    }

    pause(current_time) {
        this.stats.time = current_time - this.stats.time;
        this.gravity_time = current_time - this.gravity_time;
        // if (this.move_time > 0)
        //     this.move_time = current_time - this.move_time;
        if (this.lock_time > 0)
            this.lock_time = current_time - this.lock_time;
        if (this.paused) {
            const left = this.key_hold[0];
            const right = this.key_hold[2];

            this.key_hold[0] = 0;
            this.key_hold[2] = 0;
            this.move_time = 0;

            if (left === 1) this.move_press(-1, current_time);
            else if (right === 1) this.move_press(1, current_time);
            if (left === 2) this.move_press(-1, current_time);
            else if (right === 2) this.move_press(1, current_time);

            this.paused = false; // needs to come after the move_press() calls
        } else {
            this.paused = true;
        }
    }
}