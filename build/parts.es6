//General sprite size
let WIDTH = 50;
let HEIGHT = 50;

class Pipe extends Phaser.Sprite {    
    constructor (x, y, state, sprite) {
        super(game, x, y, sprite);
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
        state.g.setNode(''+this.id, this);
    }
} 

class Pump extends Phaser.Sprite {    
    constructor (x, y, state) {
        super(game, x, y, 'pump');
        this.w = WIDTH*2;
        this.h = HEIGHT*2;
        this.state = state;
        
        //this.animations.add('on', [1, 2], 10, true);
        
        this.isConnectedSource = false;
        this.isConnectedSink = false;
        //game.add.existing(this);
        
        this.id = state.pipeCount;
        state.pipeCount++;

        //Add to graph
        state.g.setNode(''+this.id, this);
    }
} 

class PipeH extends Phaser.Sprite {    
    constructor (x, y, state) {
        
        super(game, x, y, 'pipeh');
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
} 
class Source extends Phaser.Sprite {    
    constructor (x, y, state) {
        super(game, x, y, 'source');
        this.w = WIDTH*2;
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
} 
class Sink extends Phaser.Sprite {    
    constructor (x, y, state) {
        super(game, x, y, 'sink');
        this.w = WIDTH*2;
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
//doesn't work currently
function animatePipes() {
    var connectedToSource = graphlib.alg.preorder(g,"0");
    for (var i = 1; i < connectedToSource.length; i++) {
        var pipe = connectedToSource[i];
        if (pipe != sink) pipe.animations.play('on');
    }
}

function makePipes(state) {
    let pipes = state.pipes;
    let source;
    let sink;
    let pipe;
    let pipe2;
    let pipe3;
    let elbow1;
    
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
    let pipes = state.pipes;
    
    for (var i in pipes) {
        state.add.existing(pipes[i]);
    }
}
