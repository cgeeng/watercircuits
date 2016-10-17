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
    }
} 

class Mill extends Phaser.Sprite {    
    constructor (x, y, state) {
        super(game, x, y, 'mill');
        this.w = WIDTH*2;
        this.h = HEIGHT*2;
        this.state = state;
        
        this.animations.add('on', [0, 1, 2, 3], 10, true);
        
        this.isConnectedSource = false;
        this.isConnectedSink = false;
        
        //Drag functions
        this.inputEnabled = true;
        this.input.enableDrag();
        this.input.enableSnap(WIDTH/2, HEIGHT/2, false, true);
        this.events.onDragStop.add(state.updateConnection, state);
        
        //Keep pipe count
        this.id = state.pipeCount;
        state.pipeCount++;
    }
} 

class Pump extends Phaser.Sprite {    
    constructor (x, y, state) {
        super(game, x, y, 'pump');
        this.w = WIDTH*2;
        this.h = HEIGHT*2;
        this.state = state;
        
        this.animations.add('on', [0, 1, 2, 3], 10, true);
        
        this.isConnectedSource = false;
        this.isConnectedSink = false;
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
        //state.g.setNode("0", this);
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
        //state.g.setNode("1", this);
    }
} 

//END CLASSES

function animatePipes(state) {
    let pipes = state.pipes;
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill') {
            //if connected to source
            if (pipes[i].isConnectedSource) pipes[i].animations.play('on');
        }
    }
    state.pump.animations.play('on');
}

function stopAnimate(state) {
    let pipes = state.pipes;
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill') {
            //if connected to source
            pipes[i].animations.stop();
        }
    }
    state.pump.animations.stop();
}

function makePipes(state) {
    let pipes = state.pipes;
    
    pipes[0] = new Source(50, 200, state); 
    pipes[1] = new Sink(50, 250, state);           
    //  Make pipe

    pipes[2] = new Mill(400, 300, state);
    pipes[3] = new Pipe(650, 250, state, 'pipeh');
    pipes[4] = new Pipe(375, 200, state, 'pipe');
    pipes[5] = new Pipe(375, 375, state, 'pipeh');
    pipes[6] = new Pipe(100, 300, state, 'elbow4');
    pipes[7] = new Pipe(25, 300, state, 'elbow1');
    pipes[8] = new Pipe(200, 200, state, 'elbow2');
    pipes[9] = new Pipe(400, 400, state, 'elbow3');
    pipes[10] = new Pipe(10, 400, state, 'pipe');
    state.pump = new Pump(75, 200, state);
}

function addPipes(state) {
    //Addes pipe to graph and to game
    let pipes = state.pipes;
    
    for (var i in pipes) {
        state.add.existing(pipes[i]);
        state.g.setNode(''+pipes[i].id, pipes[i]);
    }
    state.add.existing(state.pump);
}
