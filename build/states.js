/* Generated by Babel */
//Gonna have this handle preload stuff
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = (function (_Phaser$State) {
    _inherits(Boot, _Phaser$State);

    function Boot() {
        _classCallCheck(this, Boot);

        _get(Object.getPrototypeOf(Boot.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Boot, [{
        key: 'preload',
        value: function preload() {
            game.load.image('source', 'resources/assets/source.png');
            game.load.image('sink', 'resources/assets/sink.png');
            game.load.image('elbow1', 'resources/assets/elbow1.png');
            game.load.spritesheet('elbow2', 'resources/assets/elbow2sheet.png', WIDTH, HEIGHT);
            game.load.spritesheet('elbow4', 'resources/assets/elbow4sheet.png', WIDTH, HEIGHT);
            game.load.spritesheet('elbow3', 'resources/assets/elbow3sheet.png', WIDTH, HEIGHT);
            game.load.spritesheet('pump', 'resources/assets/pumpsheet.png', 100, 100);
            game.load.spritesheet('pipe', 'resources/assets/pipesheet.png', WIDTH, HEIGHT);
            game.load.spritesheet('pipeh', 'resources/assets/pipehsheet.png', WIDTH, HEIGHT);
            game.load.spritesheet('mill', 'resources/assets/watermillsheet.png', 100, 100);
            game.load.spritesheet('resistor', 'resources/assets/resistorsheet.png', 2 * WIDTH, HEIGHT);
            game.load.spritesheet('resistor2', 'resources/assets/resistor2sheet.png', 2 * WIDTH, HEIGHT);

            game.load.image('sky', 'resources/assets/bg/sky.png');
            game.load.image('overlay', 'resources/assets/ui/overlay.png');
            game.load.image('robot', 'resources/assets/bg/robot.png');

            game.load.spritesheet('robot1', 'resources/assets/robot1sheet.png', 700, 500);
            game.load.spritesheet('robot2', 'resources/assets/robot2sheet.png', 700, 500);
            game.load.spritesheet('heart', 'resources/assets/heartsheet.png', 700, 500);
            game.load.spritesheet('bubble', 'resources/assets/bubblesheet.png', 700, 167);

            //UI stuff
            game.load.image('white', 'resources/assets/ui/white.png');
            game.load.image('circuit', 'resources/assets/ui/circuit.png');
            game.load.image('math', 'resources/assets/ui/math.png');
            game.load.image('cover1', 'resources/assets/circuit/cover1.png');
            game.load.image('cover2', 'resources/assets/circuit/cover2.png');
            game.load.image('cover3', 'resources/assets/circuit/cover3.png');
            game.load.image('circuitResistor', 'resources/assets/circuit/resistor.png');
            game.load.image('wire', 'resources/assets/circuit/wire.png');
            game.load.spritesheet('bulb', 'resources/assets/circuit/bulbsheet.png', 100, 100);

            game.load.spritesheet('exit', 'resources/assets/ui/exit.png', 50, 50);
            game.load.spritesheet('arrow', 'resources/assets/ui/arrowsheet.png', 50, 50);
            game.load.spritesheet('next', 'resources/assets/ui/nextsheet.png', 418, 72);
            game.load.spritesheet('reset', 'resources/assets/ui/resetsheet.png', 220, 72);
            game.load.spritesheet('survey', 'resources/assets/ui/surveysheet.png', 500, 72);

            game.load.audio('water', 'resources/assets/sound/water.wav');
            game.load.spritesheet('figure', 'resources/assets/figuresheet.png', 74, 93);
            game.load.image('speechBubble', 'resources/assets/speechbubble.png');
        }
    }, {
        key: 'create',
        value: function create() {
            var center = { x: this.game.world.centerX, y: this.game.world.centerY };
            this.text = new RainbowText(this.game, center.x, center.y, "play play");
            //text.anchor.set(0.5);
            //On click will switch states.
            this.text.inputEnabled = true;
            this.text.events.onInputUp.add(this.start, this);
        }
    }, {
        key: 'start',
        value: function start() {
            console.log("start of Play state");
            this.text.destroy();
            //so I can get left and right
            game.input.mouse.capture = true;
            game.state.start('LevelSelect');
        }
    }]);

    return Boot;
})(Phaser.State);

var LevelSelect = (function (_Phaser$State2) {
    _inherits(LevelSelect, _Phaser$State2);

    function LevelSelect() {
        _classCallCheck(this, LevelSelect);

        _get(Object.getPrototypeOf(LevelSelect.prototype), 'constructor', this).apply(this, arguments);
    }

    //Gameplay state

    _createClass(LevelSelect, [{
        key: 'create',
        value: function create() {
            this.level1 = new RainbowText(this.game, 250, 250, "Level 1");
            this.level1.inputEnabled = true;
            this.level1.input.useHandCursor = true;
            this.level1.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level1');
            }, this);
            this.level2 = new RainbowText(this.game, 250, 300, "Level 2");
            this.level2.inputEnabled = true;
            this.level2.input.useHandCursor = true;
            this.level2.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level2');
            }, this);
            this.level3 = new RainbowText(this.game, 250, 350, "Level 3");
            this.level3.inputEnabled = true;
            this.level3.input.useHandCursor = true;
            this.level3.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level3');
            }, this);
            this.level4 = new RainbowText(this.game, 250, 400, "Level 4");
            this.level4.inputEnabled = true;
            this.level4.input.useHandCursor = true;
            this.level4.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level4');
            }, this);
            this.level5 = new RainbowText(this.game, 450, 250, "Level 5");
            this.level5.inputEnabled = true;
            this.level5.input.useHandCursor = true;
            this.level5.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level5');
            }, this);
            this.level6 = new RainbowText(this.game, 450, 300, "Level 6");
            this.level6.inputEnabled = true;
            this.level6.input.useHandCursor = true;
            this.level6.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level6');
            }, this);
            this.level7 = new RainbowText(this.game, 450, 350, "Level 7");
            this.level7.inputEnabled = true;
            this.level7.input.useHandCursor = true;
            this.level7.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level7');
            }, this);

            this.level8 = new RainbowText(this.game, 450, 400, "Level 8");
            this.level8.inputEnabled = true;
            this.level8.input.useHandCursor = true;
            this.level8.events.onInputUp.add(function () {
                this.destroy();
                game.state.start('Level8');
            }, this);
        }
    }, {
        key: 'goToLevel',
        value: function goToLevel() {
            game.state.start('Level0');
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.level1.destroy();
            this.level2.destroy();
            this.level3.destroy();
            this.level4.destroy();
            this.level5.destroy();
            this.level6.destroy();
            this.level7.destroy();
            this.level8.destroy();
        }
    }]);

    return LevelSelect;
})(Phaser.State);

var Play = (function (_Phaser$State3) {
    _inherits(Play, _Phaser$State3);

    function Play() {
        _classCallCheck(this, Play);

        _get(Object.getPrototypeOf(Play.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Play, [{
        key: 'destroyThings',
        value: function destroyThings() {
            if (this.voltageText != null) {
                this.voltageText.destroy();
                this.voltageLabel.destroy();
            }

            if (this.resistorText1 != null) {
                this.resistorText1.destroy();
                this.resistorLabel1.destroy();
            }
            if (this.resistorText2 != null) {
                this.resistorText2.destroy();
                this.resistorLabel2.destroy();
            }
            if (this.LEDText != null) {
                this.LEDText.destroy();
                this.LEDLabel.destroy();
            }
            if (this.bubbleText != null) {
                this.bubbleText.destroy();
            }
            this.water.destroy();
            this.victoryText.destroy();
        }
    }, {
        key: 'back',
        value: function back() {
            this.destroyThings();
            game.state.start('LevelSelect');
        }
    }, {
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');
            this.add.sprite(200, 80, 'speechBubble');
            this.bubbleText = game.add.text(220, 110, "Hello.", { font: "15px Calibri", fill: "#000", align: "center" });
            //ROBOT STUFF
            this.makeRobot();
            //make an UNDIRECTED GRAAAAAPH!!!!
            this.g = new graphlib.Graph({ directed: false }); //{ directed: false}
            this.pipeCount = 2; //accounts for source and sink; 0 = source, 1 = sink 

            this.pipes = [];
            //this holds the weird pump
            this.pump;
            this.mill;
            makePipes(this);

            //this.text = this.add.text(0, 0, "are the pipes fudgin connected", {fill: "#ff0044"});
            addPipes(this);
            this.setToolbox();
            this.createButtons();
            this.initEdges();

            this.upArrow;
            this.downArrow;

            this.targetCurrent = 1; //amperes       
            this.createConditions();
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.pipes[0].isConnectedSink) {
                //this.text.text = "WATER RUN";
                animatePipes(this);
                if (this.targetCurrent != null) {
                    if (this.mill.current <= this.targetCurrent * 1.25 && this.mill.current >= this.targetCurrent * 0.75) this.setVictory();else if (this.mill.current >= this.robot.maxCurrent) this.setFailure();
                } else this.setVictory();
            } else {
                //this.text.text = "WATER NO RUN";
                stopAnimate(this);
            }

            //update resistor group position
            if (this.resistorLabel1 != null) {
                if (game.input.onUp != true) {
                    this.resistorLabel1.x = this.resistor1.x - 20;
                    this.resistorLabel1.y = this.resistor1.y - 30;
                    this.resistorText1.x = this.resistor1.x;
                    this.resistorText1.y = this.resistor1.y - 10;

                    this.resistorLabel2.x = this.resistor2.x - 20;
                    this.resistorLabel2.y = this.resistor2.y - 30;
                    this.resistorText2.x = this.resistor2.x;
                    this.resistorText2.y = this.resistor2.y - 10;
                }
            }
            this.updateLabels();
        }
    }, {
        key: 'updateLabels',
        value: function updateLabels() {}
    }, {
        key: 'makeRobot',
        value: function makeRobot() {
            this.robot = new Robot(0, 0, this, 'robot1');
            this.add.existing(this.robot);
            this.heart = this.add.sprite(0, 0, 'heart');
            this.bubble = this.add.sprite(0, 0, 'bubble');
            this.bubble.visible = false;
            this.bubble.animations.add('on', [0, 1, 2, 3], 10, true);
        }
    }, {
        key: 'setFailure',
        value: function setFailure() {
            //this.failureText = new displayText(this.game, 350, 250, "");
            this.bubbleText.text = "The robot overflowed...";
            this.resetButton.visible = true;
            this.nextButton.visible = false;
        }
    }, {
        key: 'setVictory',
        value: function setVictory() {
            this.bubbleText.text = "CONGRATS!!!";
            this.nextButton.visible = true;
            this.resetButton.visible = false;
        }
    }, {
        key: 'updateLabelPosition',
        value: function updateLabelPosition() {
            //Moves resistor labels to where resistor position is
        }
    }, {
        key: 'createConditions',
        value: function createConditions() {
            this.victoryText = new RainbowText(this.game, 350, 150, "");
            this.add.existing(this.victoryText);

            this.water = game.add.audio('water');
            this.figure = game.add.sprite(620, 150, 'figure');
            this.figure.animations.add('blink', [0, 1], 0.5, true);
            this.figure.animations.play('blink');
        }
    }, {
        key: 'goNextLevel',
        value: function goNextLevel() {
            this.destroyThings();
            if (this.key == 'Level1') game.state.start('Level2');else if (this.key == 'Level2') game.state.start('Level3');else if (this.key == 'Level3') game.state.start('Level4');else if (this.key == 'Level4') game.state.start('Level5');else if (this.key == 'Level5') game.state.start('Level6');else if (this.key == 'Level6') game.state.start('Level7');else if (this.key == 'Level7') game.state.start('Level8');
        }
    }, {
        key: 'levelReset',
        value: function levelReset() {
            this.destroyThings();
            game.state.start(this.key);
        }
    }, {
        key: 'createButtons',
        value: function createButtons() {
            //buttons
            this.exit = game.add.button(10, 10, 'exit', this.back, this, 1, 0);

            this.upArrow = game.add.button(150, 250, 'arrow', increaseVoltage, this, 1, 0, 3);
            this.upArrow.input.useHandCursor = true;

            this.downArrow = game.add.button(50, 250, 'arrow', decreaseVoltage, this, 1, 0, 3);
            this.downArrow.input.useHandCursor = true;
            this.downArrow.anchor.setTo(1, 1);
            this.downArrow.angle += 180;

            this.nextButton = game.add.button(100, 170, 'next', this.goNextLevel, this, 1, 0, 1);
            this.nextButton.input.useHandCursor = true;
            this.nextButton.visible = false;

            this.resetButton = game.add.button(150, 170, 'reset', this.levelReset, this, 1, 0, 1);
            this.resetButton.input.useHandCursor = true;
            this.resetButton.visible = false;

            this.levelText = game.add.text(60, 20, this.key, { font: "20px Calibri", fill: "#000", align: "center" });
        }
    }, {
        key: 'setToolbox',
        value: function setToolbox() {
            this.add.sprite(0, 0, 'overlay');
            var draggable = new Pipe(40, 425, this, 'pipeh', true);
            draggable.input.useHandCursor = true;
            addToState(this, draggable);

            var draggable2 = new Pipe(120, 425, this, 'pipeh', true);
            draggable2.input.useHandCursor = true;
            addToState(this, draggable2);

            addToState(this, new Resistor(200, 425, this, 'resistor', 10));
            addToState(this, new Resistor(350, 425, this, 'resistor2', 15));
        }
    }, {
        key: 'initEdges',
        value: function initEdges() {
            //console.log(this.g.nodes());
            //Loop over all objects in game to add edges to graph
            for (var i in this.g.nodes()) {
                for (var k in this.g.nodes()) {
                    if (intersects(this.g.node(k), this.g.node(i)) && this.g.node(k) != this.g.node(i)) {
                        //If two pipes intersect and aren't the same pipe and not undefined, make an edge
                        this.g.setEdge(k, i);
                    } else {
                        //Get rid of edge edge exists and if not overlapping
                        this.g.removeEdge(k, i);
                    }
                }
            }
            //remove initial source and sink connection
            this.g.removeEdge(0, 1);
            this.g.removeEdge(1, 0);
            this.setConnectedToSource();
            this.setConnectedToSink();
            //console.log("edges initialized");
        }
    }, {
        key: 'updateConnection',
        value: function updateConnection(obj) {
            //Loop over all objects in game to add edges to graph
            for (var i in this.g.nodes()) {
                //console.log("checking " + i + " now!")
                if (intersects(obj, this.g.node(i)) && obj != this.g.node(i)) {
                    //If two pipes intersect and aren't the same pipe, make an edge
                    //console.log("setting edge between " + this.id + " and " + i);
                    this.g.setEdge(obj.id + "", i);
                } else {
                    //Get rid of edge if not overlapping
                    this.g.removeEdge(obj.id + "", i);
                    //console.log("removing edge between " + this.id + " and " + i);
                }
            }
            //console.log(graphlib.alg.preorder(this.g,"0"));
            //console.log(this.g.edges());
            this.setConnectedToSource();
            this.setConnectedToSink();
        }
    }, {
        key: 'setConnectedToSource',
        value: function setConnectedToSource() {
            //Get nodes connected to Source
            var connectedToSource = graphlib.alg.preorder(this.g, "0");
            var allPipes = this.g.nodes();

            for (var i = 0; i < connectedToSource.length; i++) {
                var pipe = connectedToSource[i];
                this.g.node(pipe).isConnectedSource = true;
            }
            //Check if pipe is not connected to source
            for (var i = 0; i < allPipes.length; i++) {
                var pipe = allPipes[i];
                if (!containsObject(pipe, connectedToSource)) {
                    this.g.node(pipe).isConnectedSource = false;
                }
            }
        }
    }, {
        key: 'setConnectedToSink',
        value: function setConnectedToSink() {
            //Get nodes connected to sink
            var connectedToSink = graphlib.alg.preorder(this.g, "1");
            var allPipes = this.g.nodes();

            for (var i = 0; i < connectedToSink.length; i++) {
                var pipe = connectedToSink[i];
                this.g.node(pipe).isConnectedSink = true;
            }
            //Check if pipe is not connected to sink
            for (var i = 0; i < allPipes.length; i++) {
                var pipe = allPipes[i];
                if (!containsObject(pipe, connectedToSink)) {
                    this.g.node(pipe).isConnectedSink = false;
                }
            }
        }
    }]);

    return Play;
})(Phaser.State);