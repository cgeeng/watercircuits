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

    function Pipe(x, y, state, sprite, draggable, reverse) {
        _classCallCheck(this, Pipe);

        _get(Object.getPrototypeOf(Pipe.prototype), 'constructor', this).call(this, game, x, y, sprite);
        this.w = WIDTH;
        this.h = HEIGHT;
        this.state = state;

        if (!reverse) {
            this.animations.add('on', [1, 2, 3, 4], 10, true);
        } else this.animations.add('on', [4, 3, 2, 1], 10, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;
        //game.add.existing(this);

        //Drag functions
        this.inputEnabled = true;
        this.draggable = draggable;
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
        this.current = 0;

        this.animations.add('on', [1, 2, 3, 4, 5, 6, 7], this.maxSpeed, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;

        //Drag functions
        /*
        this.inputEnabled = true;
        this.input.enableDrag();
        this.input.enableSnap(WIDTH/2, HEIGHT/2, false, true);
        this.events.onDragStop.add(state.updateConnection, state);
        */

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
        this.w = 2 * WIDTH;
        this.h = HEIGHT;
        this.state = state;
        this.resistance = resistance;

        this.animations.add('on', [1, 2, 3, 4], 10, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;

        //Drag functions
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag();
        //below is merely a note for me
        this.draggable = true;
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

    function Robot(x, y, state, spritesheet) {
        _classCallCheck(this, Robot);

        _get(Object.getPrototypeOf(Robot.prototype), 'constructor', this).call(this, game, x, y, spritesheet);
        this.maxCurrent = 1.6; //amps

        this.animations.add('turningOn', [1, 2, 3, 4, 5, 6], 10, false);
        this.animations.add('on', [2, 3, 4, 3], 5, true);
        this.animations.add('die', [5, 6, 7], 10, false);
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
        pump.scale.setTo(pump.scale.x + 0.05, pump.scale.y + 0.05);
        pump.voltage += 1;
    }
    if (this.voltageText != null) this.voltageText.text = pump.voltage + "V";
}
function decreaseVoltage(sprite, pointer) {

    var pump = this.pump;
    if (pump.voltage >= 2.1) {
        pump.scale.setTo(pump.scale.x - 0.05, pump.scale.y - 0.05);
        pump.voltage -= 1;
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
    state.mill.current = current;
    //console.log(current);
    for (var i in pipes) {
        //don't have animation for these
        if (pipes[i].key != 'elbow1' && pipes[i].key != 'circuitResistor' && pipes[i].key != 'wire') {
            //if connected to source
            if (pipes[i].isConnectedSource) {
                pipes[i].animations.play('on');
            }
        }
    }
    state.pump.animations.play('on');
    state.pump.animations.currentAnim.speed = mapCurrent(current);
    if (robot != null) {
        //Animate robot shit
        if (current <= robot.maxCurrent / 8) {
            state.robot.frame = 1;
            //state.heart.frame = 1;
            state.bubble.visible = false;
        } else if (current >= robot.maxCurrent) {
            state.robot.animations.play('die');
            //state.heart.frame = 5;
            state.bubble.visible = false;
            //state.resetButton.visible = true;
        } else if (current <= robot.maxCurrent) {
                state.robot.animations.play('on');
                state.bubble.animations.play('on');
                state.bubble.visible = true;
                /*
                if (current <= robot.maxCurrent/4) state.heart.frame = 2;
                else if (current <= robot.maxCurrent/2) state.heart.frame = 3;
                else if (current <= 3*robot.maxCurrent/4) state.heart.frame = 4;
                */

                console.log(current);
                //console.log(mapCurrent(current));
                state.robot.animations.currentAnim.speed = mapCurrent(current);
                state.bubble.animations.currentAnim.speed = mapCurrent(current);
            } else {
                state.robot.animations.play('turningOn');
                state.robot.animations.currentAnim.speed = 10;
            }
    }
    //Heart shit
    if (state.heart != null) {
        if (current >= state.targetCurrent * 1.5) state.heart.frame = 6;else if (current >= state.targetCurrent * 1.25) state.heart.frame = 5;else if (current >= state.targetCurrent) state.heart.frame = 4;else if (current >= 3 * state.targetCurrent / 4) state.heart.frame = 3;else if (current >= state.targetCurrent / 2) {
            state.heart.frame = 2;
            state.bubbleText.text = "That is way too little power.";
        } else {
            state.heart.frame = 1;
            state.bubbleText.text = "That is way too little power.";
        }
    }

    //lightbulb
    if (state.bulb != null) {
        if (current >= state.robot.maxCurrent) state.bulb.frame = 5;else if (current >= state.targetCurrent) state.bulb.frame = 4;else if (current >= 3 * state.targetCurrent / 4) state.bulb.frame = 3;else if (current >= state.targetCurrent / 2) state.bulb.frame = 2;else state.bulb.frame = 1;
    }
}

function stopAnimate(state) {
    var pipes = state.pipes;
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key != 'elbow1' && pipes[i].key != 'circuitResistor' && pipes[i].key != 'wire') {
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
        state.heart.frame = 0;
        state.bubble.visible = false;
    }

    //lightbulb
    if (state.bulb != null) state.bulb.frame = 0;
    state.bubbleText.text = state.defaultText;
}

function makePipes(state) {
    var pipes = state.pipes;
    var startx = 50;
    var starty = 225;

    pipes[0] = new Source(startx + 25, starty, state);
    pipes[1] = new Sink(startx + 25, starty + 50, state);
    state.pump = new Pump(startx + 75, starty + 50, state);
    //  Make pipe

    pipes.push(new Pipe(startx + 50, starty + 100, state, 'elbow4', false, false));
    pipes.push(new Pipe(startx + 100, starty + 100, state, 'pipeh', false, true));
    pipes.push(new Pipe(startx + 150, starty + 100, state, 'pipeh', false, true));
    pipes.push(new Pipe(startx + 200, starty + 100, state, 'pipeh', false, true));
    pipes.push(new Pipe(startx + 250, starty + 100, state, 'pipeh', false, true));
    pipes.push(new Pipe(startx + 300, starty + 100, state, 'pipeh', false, true));
    pipes.push(new Pipe(startx + 350, starty + 100, state, 'pipeh', false, true));
    pipes.push(new Pipe(startx + 400, starty + 100, state, 'pipeh', false, true));

    pipes.push(new Pipe(startx + 440, starty + 100, state, 'elbow3', false, false));
    pipes.push(new Pipe(startx + 400, starty - 50, state, 'elbow2', false, false));
    pipes.push(new Pipe(startx + 50, starty - 50, state, 'elbow1', false, false));
    //mill pipe
    pipes.push(new Pipe(startx + 440, starty + 50, state, 'pipe', false, false));

    pipes.push(new Pipe(startx + 150, starty - 50, state, 'pipeh', false, false));
    pipes.push(new Pipe(startx + 100, starty - 50, state, 'pipeh', false, false));
    //pipes.push(new Pipe(startx+200, starty-50, state, 'pipeh', false));
    //pipes.push(new Pipe(startx+250, starty-50, state, 'pipeh', false, false));
    pipes.push(new Pipe(startx + 300, starty - 50, state, 'pipeh', false, false));
    pipes.push(new Pipe(startx + 350, starty - 50, state, 'pipeh', false, false));

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

function checkCompletion(state) {
    var p1 = state.pipes[state.pipes.length - 1];
    var p2 = state.pipes[state.pipes.length - 2];
    var higherLevel = false;
    var p3 = state.pipes[state.pipes.length - 3];
    var p4 = state.pipes[state.pipes.length - 4];

    if (p3.draggable) {
        higherLevel = p3.position.y == 175 && p3.position.x + 100 == 350 || p3.position.y == 175 && p4.position.y == 175 || p4.position.y == 175 && p4.position.x + 100 == 350;
        //console.log(higherLevel);
    }
    //console.log("p3 is " + p3.position.x + " and y is " + p3.position.y);
    //console.log("p4 is " + p4.position.x + " and y is " + p4.position.y);
    return p1.position.y == 175 && p1.position.x + 100 == 350 || p1.position.y == 175 && p2.position.y == 175 || p2.position.y == 175 && p2.position.x + 100 == 350 || higherLevel;
}