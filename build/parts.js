/* Generated by Babel */
//General sprite size
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 50;
var HEIGHT = 50;

var Pipe = (function (_Phaser$Sprite) {
    _inherits(Pipe, _Phaser$Sprite);

    function Pipe(x, y, state, sprite, draggable) {
        _classCallCheck(this, Pipe);

        _get(Object.getPrototypeOf(Pipe.prototype), 'constructor', this).call(this, game, x, y, sprite);
        this.w = WIDTH;
        this.h = HEIGHT;
        this.state = state;

        this.animations.add('on', [1, 2], 10, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;
        //game.add.existing(this);

        //Drag functions
        this.inputEnabled = true;
        if (draggable) this.input.enableDrag();
        this.input.enableSnap(WIDTH / 2, HEIGHT / 2, false, true);
        this.events.onDragStop.add(state.updateConnection, state);

        //Keep pipe count
        this.id = state.pipeCount;
        state.pipeCount++;
    }

    return Pipe;
})(Phaser.Sprite);

var Mill = (function (_Phaser$Sprite2) {
    _inherits(Mill, _Phaser$Sprite2);

    function Mill(x, y, state) {
        _classCallCheck(this, Mill);

        _get(Object.getPrototypeOf(Mill.prototype), 'constructor', this).call(this, game, x, y, 'mill');
        this.w = WIDTH * 2;
        this.h = HEIGHT * 2;
        this.state = state;
        this.maxSpeed = this.state.pump.voltage;

        this.animations.add('on', [1, 2, 3, 4, 5, 6, 7], this.maxSpeed, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;

        //Drag functions
        this.inputEnabled = true;
        this.input.enableDrag();
        this.input.enableSnap(WIDTH / 2, HEIGHT / 2, false, true);
        this.events.onDragStop.add(state.updateConnection, state);

        //Keep pipe count
        this.id = state.pipeCount;
        state.pipeCount++;
    }

    return Mill;
})(Phaser.Sprite);

var Pump = (function (_Phaser$Sprite3) {
    _inherits(Pump, _Phaser$Sprite3);

    function Pump(x, y, state) {
        _classCallCheck(this, Pump);

        _get(Object.getPrototypeOf(Pump.prototype), 'constructor', this).call(this, game, x, y, 'pump');
        this.w = WIDTH * 2;
        this.h = HEIGHT * 2;
        this.voltage = 6;
        this.state = state;

        this.animations.add('on', [1, 2, 3, 4], 10, true);

        //drag resize
        /*
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputDown.add(changeVoltage, this);
        */

        this.anchor.setTo(0.5, 0.5);

        this.isConnectedSource = false;
        this.isConnectedSink = false;
    }

    return Pump;
})(Phaser.Sprite);

var Resistor = (function (_Phaser$Sprite4) {
    _inherits(Resistor, _Phaser$Sprite4);

    function Resistor(x, y, state, sprite, resistance) {
        _classCallCheck(this, Resistor);

        _get(Object.getPrototypeOf(Resistor.prototype), 'constructor', this).call(this, game, x, y, sprite);
        this.w = WIDTH;
        this.h = HEIGHT;
        this.state = state;
        this.resistance = resistance;

        this.animations.add('on', [1, 2], 20, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;

        //Drag functions
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag();
        this.input.enableSnap(WIDTH / 2, HEIGHT / 2, false, true);
        this.events.onDragStop.add(state.updateConnection, state);

        //Keep pipe count
        this.id = state.pipeCount;
        state.pipeCount++;
    }

    return Resistor;
})(Phaser.Sprite);

var Source = (function (_Phaser$Sprite5) {
    _inherits(Source, _Phaser$Sprite5);

    function Source(x, y, state) {
        _classCallCheck(this, Source);

        _get(Object.getPrototypeOf(Source.prototype), 'constructor', this).call(this, game, x, y, 'source');
        this.w = WIDTH;
        this.h = HEIGHT;
        this.isConnectedSource = true;
        this.isConnectedSink = false;
        //game.add.existing(this);
        //this.inputEnabled = true;
        //this.input.enableDrag();
        //this.events.onDragStop.add(updateConnection, this);

        //Assuming only one source
        this.id = 0;
        //state.g.setNode("0", this);
    }

    return Source;
})(Phaser.Sprite);

var Sink = (function (_Phaser$Sprite6) {
    _inherits(Sink, _Phaser$Sprite6);

    function Sink(x, y, state) {
        _classCallCheck(this, Sink);

        _get(Object.getPrototypeOf(Sink.prototype), 'constructor', this).call(this, game, x, y, 'sink');
        this.w = WIDTH;
        this.h = HEIGHT;
        this.isConnectedSource = false;
        this.isConnectedSink = true;
        //game.add.existing(this);
        //this.inputEnabled = true;
        //this.input.enableDrag();
        //this.events.onDragStop.add(updateConnection, this);

        //Assuming only one source
        this.id = 1;
        //state.g.setNode("1", this);
    }

    return Sink;
})(Phaser.Sprite);

var Robot = (function (_Phaser$Sprite7) {
    _inherits(Robot, _Phaser$Sprite7);

    function Robot(x, y, state) {
        _classCallCheck(this, Robot);

        _get(Object.getPrototypeOf(Robot.prototype), 'constructor', this).call(this, game, x, y, 'robot1');
        this.maxCurrent = 3; //amps

        this.animations.add('turningOn', [1, 2, 3, 4, 5, 6], 10, false);
        this.animations.add('on', [5, 6], 20, true);
        this.animations.add('die', [7, 8], 10, false);
    }

    return Robot;
})(Phaser.Sprite);

var displayText = (function (_Phaser$Text) {
    _inherits(displayText, _Phaser$Text);

    function displayText(game, x, y, text) {
        _classCallCheck(this, displayText);

        _get(Object.getPrototypeOf(displayText.prototype), 'constructor', this).call(this, game, x, y, text, { font: "20px Arial", fill: "#ff0044", align: "center" });

        this.game.stage.addChild(this);
    }

    //END CLASSES

    return displayText;
})(Phaser.Text);

function increaseVoltage(sprite, pointer) {
    var pump = this.pump;
    if (pump.voltage <= 20) {
        pump.scale.setTo(pump.scale.x + 0.1, pump.scale.y + 0.1);
        pump.voltage += 2;
    }
    if (this.voltageText != null) this.voltageText.text = pump.voltage + "V";
}
function decreaseVoltage(sprite, pointer) {

    var pump = this.pump;
    if (pump.voltage >= 2) {
        pump.scale.setTo(pump.scale.x - 0.1, pump.scale.y - 0.1);
        pump.voltage -= 2;
    }
    if (this.voltageText != null) this.voltageText.text = pump.voltage + "V";
}

function checkResistance(state) {
    //If pipes connected, check if resistor is in circuit
    var pipes = state.pipes;
    var circuit = graphlib.alg.preorder(state.g, "0");
    var resistance = 10;

    for (var i in circuit) {
        var k = circuit[i];
        if (pipes[k].resistance != null) resistance = pipes[k].resistance;
    }
    //console.log(resistance);
    return resistance;
}

function setCurrent(state, resistance) {
    //Dictates how fast the wheel spinss
    var pipes = state.pipes;
    state.mill.animations.currentAnim.speed = mapCurrent(state.pump.voltage / resistance);
    if (state.LEDText != null) {
        state.LEDText.text = state.pump.voltage / resistance + "amps";
    };
    return state.pump.voltage / resistance;
}

function animatePipes(state) {
    var pipes = state.pipes;
    var robot = state.robot;
    //Check if resistor in circuit
    var resistance = checkResistance(state);
    var current = setCurrent(state, resistance);
    //console.log(current);
    for (var i in pipes) {
        //I only have animation files for 2 types, i gotta fix this shit up lol
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill' || pipes[i].key == 'resistor' || pipes[i].key == 'resistor2') {
            //if connected to source
            if (pipes[i].isConnectedSource) pipes[i].animations.play('on');
        }
    }
    state.pump.animations.play('on');

    if (robot != null) {
        //Animate robot shit
        if (current > robot.maxCurrent) {
            state.robot.animations.play('die');
        } else if (current <= robot.maxCurrent) {
            state.robot.animations.play('turningOn');
            console.log(current);
            console.log(mapCurrent(current));
            state.robot.animations.currentAnim.speed = mapCurrent(current);
        } else {
            state.robot.animations.play('turningOn');
            state.robot.animations.currentAnim.speed = 10;
        }
    }
}

function stopAnimate(state) {
    var pipes = state.pipes;
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill' || pipes[i].key == 'resistor' || pipes[i].key == 'resistor2') {
            //if connected to source
            pipes[i].animations.stop();
            //Sets to no water marks
            pipes[i].frame = 0;
        }
    }
    state.pump.animations.stop();

    if (state.robot != null) {
        state.robot.animations.stop();
        state.robot.frame = 0;
    }
}

function makePipes(state) {
    var pipes = state.pipes;
    var startx = 50;
    var starty = 225;

    pipes[0] = new Source(startx + 25, starty, state);
    pipes[1] = new Sink(startx + 25, starty + 50, state);
    state.pump = new Pump(startx + 75, starty + 50, state);
    //  Make pipe

    pipes.push(new Pipe(startx + 50, starty + 100, state, 'elbow4', false));
    pipes.push(new Pipe(startx + 100, starty + 100, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 150, starty + 100, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 200, starty + 100, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 250, starty + 100, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 300, starty + 100, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 350, starty + 100, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 400, starty + 100, state, 'pipeh', false));

    pipes.push(new Pipe(startx + 440, starty + 100, state, 'elbow3', false));
    pipes.push(new Pipe(startx + 400, starty - 50, state, 'elbow2', false));
    pipes.push(new Pipe(startx + 50, starty - 50, state, 'elbow1', false));

    pipes.push(new Pipe(startx + 440, starty + 50, state, 'pipe', false));

    pipes.push(new Pipe(startx + 150, starty - 50, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 100, starty - 50, state, 'pipeh', false));
    //pipes.push(new Pipe(startx+200, starty-50, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 250, starty - 50, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 300, starty - 50, state, 'pipeh', false));
    pipes.push(new Pipe(startx + 350, starty - 50, state, 'pipeh', false));

    state.mill = new Mill(startx + 375, starty, state);

    pipes.push(state.mill);

    //pipes.push(new Resistor(50, 425, state, 'resistor', 30)); 
}

function addPipes(state) {
    //Addes pipe to graph and to game
    var pipes = state.pipes;

    for (var i in pipes) {
        state.add.existing(pipes[i]);
        state.g.setNode('' + pipes[i].id, pipes[i]);
    }
    state.add.existing(state.pump);
}

function addToState(state, thing) {
    state.pipes.push(thing);
    state.add.existing(thing);
    state.g.setNode('' + thing.id, thing);
}