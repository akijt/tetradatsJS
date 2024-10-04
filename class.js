class Screen {
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
        console.error('update not implemented')
    }

    render(current_time, w, h, size) {
        console.error('render not implemented')
    }

    keyDownHandler(e, current_time) {
        console.error('keyDownHandler not implemented')
    }

    keyUpHandler(e, current_time) {
        console.error('keyUpHandler not implemented')
    }

    clickHandler(e, current_time, w, h, size) {
        console.error('clickHandler not implemented')
    }

    moveHandler(e, current_time, w, h, size) {
        console.error('moveHandler not implemented')
    }
}

class Tetris {
    constructor() {
        this.minos = {'i': [[[0, 2], [1, 2], [2, 2], [3, 2]], [[2, 0], [2, 1], [2, 2], [2, 3]], [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 0], [1, 1], [1, 2], [1, 3]]],
                      'j': [[[0, 2], [1, 2], [2, 2], [0, 3]], [[1, 1], [1, 2], [1, 3], [2, 3]], [[0, 2], [1, 2], [2, 2], [2, 1]], [[1, 1], [1, 2], [1, 3], [0, 1]]],
                      'l': [[[0, 2], [1, 2], [2, 2], [2, 3]], [[1, 1], [1, 2], [1, 3], [2, 1]], [[0, 2], [1, 2], [2, 2], [0, 1]], [[1, 1], [1, 2], [1, 3], [0, 3]]],
                      'o': [[[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]]],
                      's': [[[1, 2], [1, 3], [0, 2], [2, 3]], [[1, 2], [2, 2], [1, 3], [2, 1]], [[1, 2], [1, 1], [2, 2], [0, 1]], [[1, 2], [0, 2], [1, 1], [0, 3]]],
                      't': [[[1, 2], [0, 2], [1, 3], [2, 2]], [[1, 2], [1, 3], [2, 2], [1, 1]], [[1, 2], [2, 2], [1, 1], [0, 2]], [[1, 2], [1, 1], [0, 2], [1, 3]]],
                      'z': [[[1, 2], [1, 3], [2, 2], [0, 3]], [[1, 2], [2, 2], [1, 1], [2, 3]], [[1, 2], [1, 1], [0, 2], [2, 1]], [[1, 2], [0, 2], [1, 3], [0, 1]]]};
        this.bag = Object.keys(this.minos);
        this.all_kicks = {'t': [[[[ 0, 0]],
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
        this.finesse = {'o': [[1, 2, 2, 1, 0, 1, 2, 2, 1],
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
        this.orientations = {'o': 1, 'i': 2, 's': 2, 'z': 2, 'j': 4, 'l': 4, 't': 4}
        this.key_hold = {'soft_drop': 0, 'move_left': 0, 'move_right': 0};
        this.lock = {'time': 500, 'count': 15};
        this.stat_names = ['mode', 'time', 'score', 'pieces', 'lines', 'level',
                           'DAS', 'ARR', 'SDF', 'keys', 'holds', 'finesse',
                           'single', 'double', 'triple', 'tetris',
                           'mini t-spin null', 'mini t-spin single', 'mini t-spin double',
                           't-spin null', 't-spin single', 't-spin double', 't-spin triple',
                           'perfect clear single', 'perfect clear double', 'perfect clear triple',
                           'perfect clear tetris', 'max b2b', 'max combo'];
    }

    shuffle(a, duplicates) {
        // return new Array(7).fill('i') // for single piece finesse practice
        let arr = [...a];
        if (duplicates) {
            for (let i = 0; i < arr.length; i++) {
                let j = Math.floor(Math.random() * arr.length);
                arr[i] = a[j];
            }
        } else {
            for (let i = arr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        return arr;
    }

    reset_mode(mode) {
        switch (mode) {
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
                break;
            case '4-wide':
                this.customizations.four_wide = true;
                break;
        }
    }

    reset(handling, mode, level, key_hold_new, current_time) { // TODO: limit max gravity for classic mode
        this.stats = {};
        this.stat_names.forEach(x => this.stats[x] = 0);
        Object.keys(handling).forEach(x => this.stats[x] = handling[x]);
        this.stats.mode = mode;
        this.stats.level = level;

        let customizations = {'kick': true, 'r180': true, 'queue_type': 0, 'allow_hold': true, 'allow_hd': true, 'sd_type': 0, 'lock_type': 1, 'ghost': true, 'next': 3, 'target': false, 'cheese': 0, 'four_wide': false}
        this.customizations = JSON.parse(JSON.stringify(customizations));
        this.reset_mode(mode);
        this.kicks = JSON.parse(JSON.stringify(this.all_kicks));
        if (!this.customizations.kick) ['t', 'i'].forEach(x => [0, 1, 2, 3].forEach(y => [0, 1, 2, 3].forEach(z => this.kicks[x][y][z] = [[0, 0]])));
        if (!this.customizations.r180) ['t', 'i'].forEach(x => [0, 1, 2, 3].forEach(y => this.kicks[x][y][(y + 2) % 4] = []));
        
        this.board = [...new Array(40)].map(() => new Array(10).fill(null));
        this.queue = this.shuffle(this.bag, this.customizations.queue_type);
        this.held = null;
        this.hold_used = false;
        this.gravity = (0.8 - (this.stats.level - 1) * 0.007) ** (this.stats.level - 1) * 1000; // TODO: look over gravity
        
        this.b2b = -1;
        this.combo = -1;
        this.last_clear = '';
        this.finesse_keys = 0;
        this.finish = false;
        this.lose = false;

        this.add_cheese(this.customizations.cheese);
        if (this.customizations.four_wide) {
            for (let r = 0; r < 20; r++) {
                for (let c = 0; c < 10; c++) {
                    if (c < 3 || c > 6) this.board[r][c] = 'x';
                }
            }
            this.board[0][3] = 'x';
            this.board[1][3] = 'x';
            this.board[1][4] = 'x';
        }

        this.move_time = 0;
        this.key_hold = {'soft_drop': 0, 'move_left': 0, 'move_right': 0};
        if (key_hold_new['soft_drop'] == 1) this.soft_drop(current_time);
        if (key_hold_new['move_left'] == 1) this.move_press('move_left', 'move_right', current_time);
        else if (key_hold_new['move_right'] == 1) this.move_press('move_right', 'move_left', current_time);
        if (key_hold_new['move_left'] == 2) this.move_press('move_left', 'move_right', current_time);
        else if (key_hold_new['move_right'] == 2) this.move_press('move_right', 'move_left', current_time);
    }

    start(current_time) {
        this.stats.time = current_time;
        this.stats.keys = 0;
        this.new_piece(this.queue.shift(), current_time);
    }

    new_piece(piece, current_time) {
        this.piece = piece;
        this.position = [3, 18];
        this.rotation = 0;

        if (this.collision()) {
            this.lose = true;
            return;
        }
        if (this.queue.length < 8) this.queue.push(...this.shuffle(this.bag, this.customizations.queue_type));

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
        this.target.location = Math.floor(Math.random() * this.finesse[this.piece][this.target.rotation].length);
        this.target.position = [0, 0];
        this.target.position[0] = this.target.location - Math.min(...this.minos[this.piece][this.target.rotation].map(x => x[0]));
        this.target.position[1] = 0 - Math.min(...this.minos[this.piece][this.target.rotation].map(x => x[1]));
    }

    hold(current_time) {
        if (this.customizations.allow_hold) {
            this.stats.keys++;
            if (!this.hold_used) {
                this.stats.holds++;
                this.hold_used = true;
                if (this.held == null) {
                    this.held = this.piece;
                    this.new_piece(this.queue.shift(), current_time);
                } else {
                    let temp = this.held;
                    this.held = this.piece;
                    this.new_piece(temp, current_time);
                }
            }
        }
    }

    move(distance, current_time) {
        let step = (distance > 0) ? 1 : -1;
        let i = 0;
        for (i; i < Math.abs(distance); i++) {
            this.position[0] += step;
            if (this.collision()) {
                this.position[0] -= step;
                if (i == 0) return;
                break;
            }
        }
        this.set_height();
        this.set_lock(current_time, i);
        this.last_action = 'move';
    }

    rotate(turns, current_time) {
        this.stats.keys++;
        this.finesse_keys += (turns % 2 == 1) ? 1 : 2
        let orig_position = [...this.position];
        let orig_rotation = this.rotation;
        this.rotation = (this.rotation + turns) % 4;
        for (let i in this.kicks[(this.piece == 'i') ? 'i' : 't'][orig_rotation][this.rotation]) {
            let [x, y] = this.kicks[(this.piece == 'i') ? 'i' : 't'][orig_rotation][this.rotation][i]
            this.position = [orig_position[0] + x, orig_position[1] + y]
            if (!this.collision()) {
                this.set_height();
                this.set_lock(current_time, (turns % 2 == 1) ? 1 : 2);
                this.last_action = `rotate${i}`;
                return;
            }
        }
        this.position = orig_position;
        this.rotation = orig_rotation;
    }

    drop(distance, current_time) {
        distance = Math.min(distance, this.height);
        if (distance > 0) {
            this.position[1] -= distance;
            this.set_height();
            this.set_lock(current_time);
            if (this.position[1] < this.lock_lowest) {
                this.lock_lowest = this.position[1];
                this.lock_count = 0;
            }
            this.stats.score += distance * this.key_hold['soft_drop'];
            this.last_action = 'drop';
        }
    }

    soft_drop(current_time) {
        this.stats.keys++;
        this.finesse_keys++;
        this.key_hold['soft_drop'] = 1;
        if (this.stats.SDF <= 1) {
            this.gravity = 0;
        } else {
            if (this.customizations.sd_type == 0) {
                this.gravity /= this.stats.SDF;
            } else if (this.gravity > this.stats.SDF) {
                this.gravity = this.stats.SDF;
            }
            this.gravity_time = current_time - this.gravity;
        }
    }

    unsoft_drop() {
        this.key_hold['soft_drop'] = 0;
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
        if (this.minos[this.piece][this.rotation].every(d => this.position[1] + d[1] >= 20)) {
            this.lose = true;
            return;
        }

        this.stats.pieces++;
        this.f_check();
        if (!this.customizations.target) {
            this.minos[this.piece][this.rotation].forEach(d => this.board[this.position[1] + d[1]][this.position[0] + d[0]] = this.piece);
            this.clear();
        }
        this.new_piece(this.queue.shift(), current_time);
        this.hold_used = false;
    }

    clear() {
        let t_score = this.t_check();
        let rows = 0;
        let cheese_cleared = 0;
        for (let r = 0; r < 40; r++) {
            if (this.board[r].some(x => x == null)) {
                this.board[rows] = this.board[r];
                rows++;
            } else if (r < this.customizations.cheese) {
                cheese_cleared++;
            }
        }
        let clear_count = 40 - rows;
        for (rows; rows < 40; rows++) {
            this.board[rows] = new Array(10).fill(null);
            if (this.customizations.four_wide) this.board[rows - 20] = ['x', 'x', 'x', null, null, null, null, 'x', 'x', 'x'];
        }
        this.add_cheese(cheese_cleared);
        let clear_string = {0: 'null', 1: 'single', 2: 'double', 3: 'triple', 4: 'tetris'}[clear_count]
        if (clear_count == 4 || t_score >= 10 && clear_count > 0) {
            this.b2b++;
            if (this.b2b > this.stats['max b2b']) this.stats['max b2b'] = this.b2b;
        } else if (clear_count > 0) {
            this.b2b = -1;
        }
        if (this.board.every(r => r.every(x => x == null))) {
            this.stats.score += {1: 800, 2: 1200, 3: 1800, 4: 2000}[clear_count] * ((this.b2b > 0) ? 1.6 : 1) * this.stats.level;
            this.last_clear = `perfect clear ${clear_string}`;
        } else if (t_score > 10) {
            this.stats.score += {0: 400, 1: 800, 2: 1200, 3: 1600}[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = `t-spin ${clear_string}`;
        } else if (t_score == 10) {
            this.stats.score += {0: 100, 1: 200, 2: 400}[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = `mini t-spin ${clear_string}`;
        } else if (clear_count > 0) {
            this.stats.score += {1: 100, 2: 300, 3: 500, 4: 800}[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
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
            if (this.customizations.four_wide) this.lose = true;
        }
    }

    t_check() {
        let t_score = 0;
        if (this.piece == 't' && this.last_action[0] == 'r') {
            let corners = [[0, 3], [2, 3], [2, 1], [0, 1]];
            for (let i = 0; i < 4; i++) {
                let [dc, dr] = corners[i];
                let c = this.position[0] + dc;
                let r = this.position[1] + dr;
                if (r < 0 || c < 0 || c > 9 || this.board[r][c] != null) {
                    if (i == this.rotation || i == (this.rotation + 1) % 4) {
                        t_score += 4;
                    } else {
                        t_score += 3;
                    }
                }
            }
            t_score += this.last_action[6] == '4';
        }
        return t_score;
    }

    f_check() {
        let col = this.position[0] + Math.min(...this.minos[this.piece][this.rotation].map(d => d[0]))
        if (this.customizations.target) {
            if (this.rotation % this.orientations[this.piece] != this.target.rotation % this.orientations[this.piece] || col != this.target.location) {
                this.stats.pieces--;
                this.lose = true;
                return;
            }
        }
        for (let i = 0; i < 4; i++) {
            let [dc, dr] = this.minos[this.piece][this.rotation][i];
            let c = this.position[0] + dc;
            let r = this.position[1] + dr;
            for (let j = r + 1; j < 22; j++) {
                if (this.board[j][c] != null) return;
            }
        }
        if (this.finesse_keys > this.finesse[this.piece][this.rotation][col]) {
            this.stats.finesse++;
            if (this.customizations.target) {
                this.stats.pieces--;
                this.lose = true;
            }
        }
    }

    add_cheese(n) {
        for (let r = 0; r < n; r++) {
            if (this.board[39 - r].some(x => x != null)) {
                this.lose = true;
                return;
            }
        }
        for (let r = 39; r >= n; r--) {
            this.board[r] = this.board[r - n];
        }
        for (let r = n - 1; r >= 0; r--) {
            let row = new Array(10).fill('x');
            row[Math.floor(Math.random() * 10)] = null;
            this.board[r] = row;
        }
    }

    set_height() {
        this.height = 1;
        while (!this.collision(this.height)) {
            this.height++;
        }
        this.height--;
    }

    collision(lower = 0) {
        for (let i = 0; i < 4; i++) {
            let [dc, dr] = this.minos[this.piece][this.rotation][i];
            let c = this.position[0] + dc;
            let r = this.position[1] + dr - lower;
            if (r < 0 || c < 0 || c > 9 || this.board[r][c] != null) return true;
        }
        return false;
    }

    move_press(direction1, direction2, current_time) {
        this.stats.keys++;
        this.finesse_keys++;
        this.key_hold[direction1] = this.key_hold[direction2] + 1;
        this.move_time = current_time + this.stats.DAS - this.stats.ARR;
    }

    move_unpress(direction1, direction2, current_time) {
        this.key_hold[direction1] = 0;
        if (this.key_hold[direction2] == 0) {
            this.move_time = 0;
        } else if (this.key_hold[direction2] == 1) {
            this.move_time = current_time + this.stats.DAS - this.stats.ARR; // DAS added back to prevent "DAS skip"
        } else {
            this.key_hold[direction2] = 1;
        }
    }

    move_hold(current_time) {
        if (this.move_time > 0) {
            let step = this.key_hold['move_right'] - this.key_hold['move_left'];
            let move_timer = current_time - this.move_time;
            if (move_timer >= this.stats.ARR) {
                if (this.stats.ARR == 0) {
                    this.move_time = current_time;
                    this.move(9 * step, current_time);
                } else {
                    let distance = Math.floor(move_timer / this.stats.ARR);
                    this.move_time += this.stats.ARR * distance;
                    this.move(distance * step, current_time);
                }
            }
        }
    }

    gravity_drop(current_time) {
        let gravity_timer = current_time - this.gravity_time;
        if (gravity_timer >= this.gravity) {
            if (this.gravity == 0) {
                this.gravity_time = current_time;
                this.drop(40, current_time);
            } else {
                let distance = Math.floor(gravity_timer / this.gravity);
                this.gravity_time += this.gravity * distance;
                this.drop(distance, current_time);
            }
        }
    }

    set_lock(current_time, actions = 0) {
        if (actions > 0 && this.customizations.lock_type > 0) {
            if (this.lock_time > 0 || this.height == 0 || this.lock_count > 0)
                this.lock_count += actions;
            if (this.lock_time > 0)
                this.lock_time = current_time;
        }
        if (this.height == 0 && this.lock_time == 0) {
            this.lock_time = current_time;
        } else if (this.height > 0) {
            this.lock_time = 0;
        }
    }

    piece_lock(current_time) {
        if (this.lock_time > 0) {
            let lock_timer = current_time - this.lock_time;
            if (lock_timer >= this.lock['time'] || (this.lock_count >= this.lock['count'] && this.customizations.lock_type == 1))
                this.place(current_time);
        }
    }

    finish_check(current_time) {
        this.finish = this.lose ||
            (this.stats.mode == 'sprint' && this.stats.lines >= 40) ||
            (this.stats.mode == 'blitz' && current_time - this.stats.time >= 120000);
        if (this.finish) {
            this.stats.time = current_time - this.stats.time;
            if (['marathon', 'classic', 'finesse', '4-wide'].includes(this.stats.mode)) this.lose = false;
        }
    }

    frame_update(current_time) {
        this.move_hold(current_time);
        this.gravity_drop(current_time);
        this.piece_lock(current_time);
        this.finish_check(current_time);
    }

    pause(current_time, key_hold_new = null) {
        this.stats.time = current_time - this.stats.time;
        this.gravity_time = current_time - this.gravity_time;
        // if (this.move_time > 0)
        //     this.move_time = current_time - this.move_time;
        if (this.lock_time > 0)
            this.lock_time = current_time - this.lock_time;
        this.unsoft_drop();
        this.move_unpress('move_left', 'move_right', current_time);
        this.move_unpress('move_right', 'move_left', current_time);
        if (key_hold_new) {
            if (key_hold_new['soft_drop'] == 1) this.soft_drop(current_time);
            if (key_hold_new['move_left'] == 1) this.move_press('move_left', 'move_right', current_time);
            else if (key_hold_new['move_right'] == 1) this.move_press('move_right', 'move_left', current_time);
            if (key_hold_new['move_left'] == 2) this.move_press('move_left', 'move_right', current_time);
            else if (key_hold_new['move_right'] == 2) this.move_press('move_right', 'move_left', current_time);
        }
    }
}