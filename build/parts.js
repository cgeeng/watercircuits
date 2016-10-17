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

    function Pipe(x, y, state, sprite) {
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
        this.input.enableDrag();
        this.input.enableSnap(WIDTH, HEIGHT, false, true);
        this.events.onDragStop.add(state.updateConnection, state);

        //Keep pipe count
        this.id = state.pipeCount;
        state.pipeCount++;

        //Add to graph
        state.g.setNode('' + this.id, this);
    }

    return Pipe;
})(Phaser.Sprite);

var Pump = (function (_Phaser$Sprite2) {
    _inherits(Pump, _Phaser$Sprite2);

    function Pump(x, y, state) {
        _classCallCheck(this, Pump);

        _get(Object.getPrototypeOf(Pump.prototype), 'constructor', this).call(this, game, x, y, 'pump');
        this.w = WIDTH * 2;
        this.h = HEIGHT * 2;
        this.state = state;

        //this.animations.add('on', [1, 2], 10, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;
        //game.add.existing(this);

        this.id = state.pipeCount;
        state.pipeCount++;

        //Add to graph
        state.g.setNode('' + this.id, this);
    }

    return Pump;
})(Phaser.Sprite);

var PipeH = (function (_Phaser$Sprite3) {
    _inherits(PipeH, _Phaser$Sprite3);

    function PipeH(x, y, state) {
        _classCallCheck(this, PipeH);

        _get(Object.getPrototypeOf(PipeH.prototype), 'constructor', this).call(this, game, x, y, 'pipeh');
        this.w = WIDTH;
        this.h = HEIGHT;
        this.animations.add('on', [1, 2], 10, true);

        this.isConnectedSource = false;
        this.isConnectedSink = false;
        //game.add.existing(this);

        //Drag functions
        this.inputEnabled = true;
        this.input.enableDrag();
        //this.events.onDragStop.add(updateConnection, this);

        //Keep pipe count
        this.id = state.pipeCount;
        state.pipeCount++;

        //Assuming only one pump
        this.id = 2;
        state.g.setNode("2", this);
    }

    return PipeH;
})(Phaser.Sprite);

var Source = (function (_Phaser$Sprite4) {
    _inherits(Source, _Phaser$Sprite4);

    function Source(x, y, state) {
        _classCallCheck(this, Source);

        _get(Object.getPrototypeOf(Source.prototype), 'constructor', this).call(this, game, x, y, 'source');
        this.w = WIDTH * 2;
        this.h = HEIGHT;
        this.isConnectedSource = true;
        this.isConnectedSink = false;
        //game.add.existing(this);
        //this.inputEnabled = true;
        //this.input.enableDrag();
        //this.events.onDragStop.add(updateConnection, this);

        //Assuming only one source
        this.id = 0;
        state.g.setNode("0", this);
    }

    return Source;
})(Phaser.Sprite);

var Sink = (function (_Phaser$Sprite5) {
    _inherits(Sink, _Phaser$Sprite5);

    function Sink(x, y, state) {
        _classCallCheck(this, Sink);

        _get(Object.getPrototypeOf(Sink.prototype), 'constructor', this).call(this, game, x, y, 'sink');
        this.w = WIDTH * 2;
        this.h = HEIGHT;
        this.isConnectedSource = false;
        this.isConnectedSink = true;
        //game.add.existing(this);
        //this.inputEnabled = true;
        //this.input.enableDrag();
        //this.events.onDragStop.add(updateConnection, this);

        //Assuming only one source
        this.id = 1;
        state.g.setNode("1", this);
    }

    //END CLASSES

    /* found under states
    function updateConnection() {    
        //Loop over all objects in game to add edges to graph
        for (var i in g.nodes()) {    
            //console.log("checking " + i + " now!")
            if (intersects(this, g.node(i) ) && this != g.node(i) ) {
                //If two pipes intersect and aren't the same pipe, make an edge
                //console.log("setting edge between " + this.id + " and " + i);
                g.setEdge(this.id + "", i);
            }else {
                //Get rid of edge if not overlapping
                g.removeEdge(this.id + "", i);
                //console.log("removing edge between " + this.id + " and " + i);
            }
        }   
        console.log(graphlib.alg.preorder(g,"0"));
        
        setConnectedToSource();
        setConnectedToSink();
    }
    
    
    
    function setConnectedToSource() {
        //Get nodes connected to Source
        var connectedToSource = graphlib.alg.preorder(state.g,"0");
        var allPipes = state.g.nodes();
        
        for (var i = 0; i < connectedToSource.length; i++) {
            var pipe = connectedToSource[i];
            state.g.node(pipe).isConnectedSource = true;
        }
        //Check if pipe is not connected to source
        for (var i = 0; i < allPipes.length; i++) {
            var pipe = allPipes[i];
            if ( !containsObject( pipe, connectedToSource) ) {
                state.g.node(pipe).isConnectedSource = false;
            }
        }        
    }
    
    function setConnectedToSink() {
        //Get nodes connected to sink
        var connectedToSink = graphlib.alg.preorder(state.g,"1");
        var allPipes = state.g.nodes();
        
        for (var i = 0; i < connectedToSink.length; i++) {
            var pipe = connectedToSink[i];
            state.g.node(pipe).isConnectedSink = true;
        }
        //Check if pipe is not connected to sink
        for (var i = 0; i < allPipes.length; i++) {
            var pipe = allPipes[i];
            if ( !containsObject( pipe, connectedToSink) ) {
                state.g.node(pipe).isConnectedSink = false;
            }
        }        
    }
    */
    return Sink;
})(Phaser.Sprite);

function animatePipes(state) {
    var pipes = state.pipes;
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh') {
            //if connected to source
            if (pipes[i].isConnectedSource) pipes[i].animations.play('on');
        }
    }
}

function stopAnimate(state) {
    var pipes = state.pipes;
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh') {
            //if connected to source
            pipes[i].animations.stop();
        }
    }
}

function makePipes(state) {
    var pipes = state.pipes;
    var source = undefined;
    var sink = undefined;
    var pipe = undefined;
    var pipe2 = undefined;
    var pipe3 = undefined;
    var elbow1 = undefined;

    pipes[0] = new Source(50, 200, state);
    pipes[1] = new Sink(50, 250, state);
    //  Make pipe
    pipes[2] = new Pipe(10, 400, state, 'pipe');
    pipes[3] = new Pipe(650, 250, state, 'pipeh');
    pipes[4] = new Pipe(375, 200, state, 'pipe');
    pipes[5] = new Pipe(375, 375, state, 'pipeh');
    pipes[6] = new Pipe(100, 300, state, 'elbow4');
    pipes[7] = new Pipe(25, 300, state, 'elbow1');
    pipes[8] = new Pipe(200, 200, state, 'elbow2');
    pipes[9] = new Pipe(400, 400, state, 'elbow3');
}

function addPipes(state) {
    var pipes = state.pipes;

    for (var i in pipes) {
        state.add.existing(pipes[i]);
    }
}