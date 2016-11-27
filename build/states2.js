/* Generated by Babel */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Level1 = (function (_Play) {
    _inherits(Level1, _Play);

    function Level1() {
        _classCallCheck(this, Level1);

        _get(Object.getPrototypeOf(Level1.prototype), 'constructor', this).call(this);
    }

    _createClass(Level1, [{
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');
            this.add.sprite(0, 0, 'overlay');
            this.add.sprite(200, 80, 'speechBubble');
            this.bubbleText = game.add.text(220, 110, "Hello.", { font: "15px Calibri", fill: "#000", align: "center" });

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

            this.createConditions();
            this.bubbleText.text = "Get the water mill running.";
            //this.targetCurrent = 1.5; //amperes
        }
    }, {
        key: 'setToolbox',
        value: function setToolbox() {
            var draggable = new Pipe(200, 425, this, 'pipeh', true);
            draggable.input.useHandCursor = true;
            addToState(this, draggable);

            var draggable2 = new Pipe(120, 425, this, 'pipeh', true);
            draggable2.input.useHandCursor = true;
            addToState(this, draggable2);
        }
    }]);

    return Level1;
})(Play);

var Level2 = (function (_Play2) {
    _inherits(Level2, _Play2);

    function Level2() {
        _classCallCheck(this, Level2);

        _get(Object.getPrototypeOf(Level2.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Level2, [{
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');
            this.add.sprite(0, 0, 'overlay');
            this.add.sprite(200, 80, 'speechBubble');
            this.bubbleText = game.add.text(220, 105, 'The robot-bubble-machine runs \n on water.', { font: "15px Calibri", fill: "#000", align: "center" });
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
        key: 'setToolbox',
        value: function setToolbox() {
            var draggable = new Pipe(200, 425, this, 'pipeh', true);
            draggable.input.useHandCursor = true;
            addToState(this, draggable);

            var draggable2 = new Pipe(120, 425, this, 'pipeh', true);
            draggable2.input.useHandCursor = true;
            addToState(this, draggable2);
        }
    }]);

    return Level2;
})(Play);

var Level3 = (function (_Level2) {
    _inherits(Level3, _Level2);

    function Level3() {
        _classCallCheck(this, Level3);

        _get(Object.getPrototypeOf(Level3.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Level3, [{
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');
            this.add.sprite(0, 0, 'overlay');
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

            this.targetCurrent = .4; //amperes       
            this.createConditions();
        }
    }, {
        key: 'setToolbox',
        value: function setToolbox() {
            var draggable = new Pipe(200, 425, this, 'pipeh', true);
            draggable.input.useHandCursor = true;
            addToState(this, draggable);

            var draggable2 = new Pipe(120, 425, this, 'pipeh', true);
            draggable2.input.useHandCursor = true;
            addToState(this, draggable2);
        }
    }, {
        key: 'makeRobot',
        value: function makeRobot() {
            this.robot = new Robot(0, 0, this, 'robot2');
            this.add.existing(this.robot);
            this.heart = this.add.sprite(0, 0, 'heart');
            this.bubble = this.add.sprite(0, 0, 'bubble');
            this.bubble.visible = false;
            this.bubble.animations.add('on', [0, 1, 2, 3], 10, true);
            this.robot.maxCurrent = 0.6;
            this.bubbleText.text = "This robot can't take much water.";
        }
    }]);

    return Level3;
})(Level2);

var Level4 = (function (_Level3) {
    _inherits(Level4, _Level3);

    function Level4() {
        _classCallCheck(this, Level4);

        _get(Object.getPrototypeOf(Level4.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Level4, [{
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');
            this.add.sprite(0, 0, 'overlay');
            this.add.sprite(200, 80, 'speechBubble');
            this.bubbleText = game.add.text(220, 110, "This robot can't take much water.", { font: "15px Calibri", fill: "#000", align: "center" });
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
            this.upArrow.visible = false;
            this.downArrow.visible = false;
            this.initEdges();

            this.upArrow;
            this.downArrow;

            this.targetCurrent = .4; //amperes       
            this.createConditions();
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
    }]);

    return Level4;
})(Level3);

var Level5 = (function (_Play3) {
    _inherits(Level5, _Play3);

    function Level5() {
        _classCallCheck(this, Level5);

        _get(Object.getPrototypeOf(Level5.prototype), 'constructor', this).call(this);
    }

    _createClass(Level5, [{
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');
            this.add.sprite(200, 80, 'speechBubble');
            this.bubbleText = game.add.text(220, 110, "Batteries supply voltage.", { font: "15px Calibri", fill: "#000", align: "center" });
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
            this.createCircuit();
            this.setToolbox();
            this.createButtons();
            this.initEdges();

            this.upArrow;
            this.downArrow;

            this.createConditions();
            this.targetCurrent = 1; //amperes
        }
    }, {
        key: 'createCircuit',
        value: function createCircuit() {
            this.add.sprite(0, 0, 'cover1');
            this.createBattery();
        }
    }, {
        key: 'createBattery',
        value: function createBattery() {
            this.voltageLabel = new displayText(this.game, 30, 210, "Voltage:");
            this.voltageText = new displayText(this.game, 50, 230, this.pump.voltage + "V");
        }
    }]);

    return Level5;
})(Play);

var Level6 = (function (_Level5) {
    _inherits(Level6, _Level5);

    function Level6() {
        _classCallCheck(this, Level6);

        _get(Object.getPrototypeOf(Level6.prototype), 'constructor', this).call(this);
    }

    _createClass(Level6, [{
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');
            this.add.sprite(200, 80, 'speechBubble');
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
            this.createCircuit();
            this.setToolbox();
            this.createButtons();
            this.initEdges();

            this.bubbleText = game.add.text(220, 110, "Resistance is measured in Ohms.", { font: "15px Calibri", fill: "#000", align: "center" });

            this.upArrow;
            this.downArrow;

            this.createConditions();
            this.targetCurrent = 1; //amperes
        }
    }, {
        key: 'createCircuit',
        value: function createCircuit() {
            this.add.sprite(0, 0, 'cover2');
            this.createBattery();
        }
    }, {
        key: 'setToolbox',
        value: function setToolbox() {
            this.add.sprite(0, 0, 'overlay');
            /*
            let draggable = new Pipe(40, 425, this, 'pipeh', true);
            draggable.input.useHandCursor = true;
            addToState(this, draggable);
            
            let draggable2 = new Pipe(120, 425, this, 'pipeh', true);
            draggable2.input.useHandCursor = true;
            addToState(this, draggable2);
            */

            this.resistor0 = new Resistor(40, 450, this, 'wire', 1);
            addToState(this, this.resistor0);

            this.resistor1 = new Resistor(200, 450, this, 'circuitResistor', 10);
            addToState(this, this.resistor1);
            this.resistor2 = new Resistor(350, 450, this, 'circuitResistor', 15);
            addToState(this, this.resistor2);
            this.createResistor();
        }
    }, {
        key: 'createResistor',
        value: function createResistor() {
            this.resistorLabel1 = new displayText(this.game, this.resistor1.x - 20, this.resistor1.y - 30, "Resistance:");
            this.resistorText1 = new displayText(this.game, this.resistor1.x, this.resistor1.y - 10, this.resistor1.resistance + " Ohms");

            this.resistorLabel2 = new displayText(this.game, this.resistor2.x - 20, this.resistor2.y - 30, "Resistance:");
            this.resistorText2 = new displayText(this.game, this.resistor2.x, this.resistor2.y - 10, this.resistor2.resistance + " Ohms");
        }
    }]);

    return Level6;
})(Level5);

var Level7 = (function (_Level6) {
    _inherits(Level7, _Level6);

    function Level7() {
        _classCallCheck(this, Level7);

        _get(Object.getPrototypeOf(Level7.prototype), 'constructor', this).call(this);
    }

    _createClass(Level7, [{
        key: 'create',
        value: function create() {
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');

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
            this.createCircuit();
            this.add.sprite(200, 80, 'speechBubble');
            this.bubbleText = game.add.text(220, 105, 'Get near 0.3 amps without burning the bulb. \n Volts = Current * Resistance', { font: "15px Calibri", fill: "#000", align: "center" });
            this.setToolbox();
            this.createButtons();
            this.createLED();
            this.initEdges();

            this.upArrow;
            this.downArrow;

            this.createConditions();
            this.targetCurrent = 0.3; //amperes
        }
    }, {
        key: 'createCircuit',
        value: function createCircuit() {
            this.add.sprite(0, 0, 'cover3');
            this.createBattery();
        }
    }, {
        key: 'createLED',
        value: function createLED() {
            this.robot.maxCurrent = 0.7;
            this.bulb = this.add.sprite(420, 220, 'bulb');
            this.LEDLabel = new displayText(this.game, 400, this.bulb.y - 15, "Max Current: " + this.robot.maxCurrent + " amps");
            this.LEDText = new displayText(this.game, 500, 290, "0 amps");
        }
    }]);

    return Level7;
})(Level6);

var Level8 = (function (_Level7) {
    _inherits(Level8, _Level7);

    function Level8() {
        _classCallCheck(this, Level8);

        _get(Object.getPrototypeOf(Level8.prototype), 'constructor', this).call(this);
    }

    _createClass(Level8, [{
        key: 'create',
        value: function create() {
            game.add.plugin(Fabrique.Plugins.InputField);
            //prevents popup on right click
            game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
            this.add.sprite(0, 0, 'sky');

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
            this.createCircuit();
            this.add.sprite(200, 80, 'speechBubble');
            this.targetCurrent = 2; //amperes
            this.bubbleText = game.add.text(220, 105, 'Get ' + this.targetCurrent + ' amps without burning the bulb. \n Volts = Current * Resistance', { font: "15px Calibri", fill: "#000", align: "center" });
            this.setToolbox();
            this.createButtons();
            this.createLED();
            this.robot.maxCurrent = 4;
            this.LEDLabel.text = "Max Current: " + this.robot.maxCurrent + " amps";
            this.initEdges();

            this.upArrow;
            this.downArrow;

            this.createConditions();

            this.upArrow.visible = false;
            this.downArrow.visible = false;

            this.setInputs();
        }
    }, {
        key: 'setInputs',
        value: function setInputs() {
            /*
            this.resistanceInput = game.add.inputField(210, 230, {
                font: '15px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 80,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Resistance',
            });
            */

            //this.resistanceText = new displayText(this.game, 310, 233, "Ohms");
        }
    }, {
        key: 'updateLabels',
        value: function updateLabels() {
            this.resistor1.resistance = this.resistorLabel1.text.text;
        }
    }, {
        key: 'setVictory',
        value: function setVictory() {
            this.bubbleText.text = "CONGRATS!!!";
            this.nextButton.visible = false;
            this.resetButton.visible = false;

            this.surveyButton = game.add.button(100, 170, 'survey', function () {
                window.open("http://www.google.com", "_blank");
            }, this, 1, 0, 1);
            this.surveyButton.input.useHandCursor = true;
        }
    }, {
        key: 'setToolbox',
        value: function setToolbox() {
            this.add.sprite(0, 0, 'overlay');

            this.resistor1 = new Resistor(200, 400, this, 'circuitResistor', 10);
            addToState(this, this.resistor1);
            this.createResistor();
        }
    }, {
        key: 'createResistor',
        value: function createResistor() {
            this.resistorLabel1 = game.add.inputField(210, 230, {
                font: '15px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 80,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Resistance'
            });
            this.resistorText1 = new displayText(this.game, this.resistorLabel1.x + 100, this.resistorLabel1.y + 3, " Ohms");
        }
    }, {
        key: 'setFailure',
        value: function setFailure() {
            //this.failureText = new displayText(this.game, 350, 250, "");
            this.bubbleText.text = 'Get ' + this.targetCurrent + ' Amps.\n 6 Volts = 2 Amps * Resistance';
            this.resetButton.visible = false;
            this.nextButton.visible = false;
        }
    }]);

    return Level8;
})(Level7);