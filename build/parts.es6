//General sprite size
let WIDTH = 50;
let HEIGHT = 50;

class Pipe extends Phaser.Sprite {    
    constructor (x, y, state, sprite, draggable) {
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
        if (draggable) this.input.enableDrag();
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
        this.maxSpeed = 40;
        
        this.animations.add('on', [0, 1, 2, 3], this.maxSpeed, true);
        
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
        
        //drag resize
        this.inputEnabled = true;
        this.events.onDragStart.add(onDragStart, this);
        
        this.isConnectedSource = false;
        this.isConnectedSink = false;
    }
} 

class Resistor extends Phaser.Sprite {    
    constructor (x, y, state, sprite, resistance) {
        super(game, x, y, sprite);
        this.w = WIDTH;
        this.h = HEIGHT;
        this.state = state;
        this.resistance = resistance;
        
        this.animations.add('on', [1, 2], 20, true);
        
        this.isConnectedSource = false;
        this.isConnectedSink = false;
        
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

function onDragStart(sprite, pointer) {
    console.log(pointer.x);
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

function checkResistance(state) {
    //If pipes connected, check if resistor is in circuit
    let pipes = state.pipes;
    let circuit = graphlib.alg.preorder(state.g,"0");
    let resistance = 0;

    for (let i in circuit) {
        let k = circuit[i];
        if (pipes[k].key == 'resistor') resistance = pipes[k].resistance;
    }
    console.log(resistance);
    return resistance;
    
}

function setCurrent(state, resistance) {
    //Dictates how fast the wheel spinss
    let pipes = state.pipes;
    pipes[2].animations.currentAnim.speed = pipes[2].maxSpeed - resistance;
}

function animatePipes(state) {
    let pipes = state.pipes;
    //Check if resistor in circuit
    let resistance = checkResistance(state);
    setCurrent(state, resistance);
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill' || pipes[i].key == 'resistor') {
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
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill'|| pipes[i].key == 'resistor') {
            //if connected to source
            pipes[i].animations.stop();
            //Sets to no water marks
            pipes[i].frame = 0;
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
    pipes[3] = new Pipe(100, 300, state, 'elbow4', false);
    pipes[4] = new Pipe(150, 300, state, 'pipeh', false);
    pipes[5] = new Pipe(200, 400, state, 'pipeh', true);
    pipes[6] = new Pipe(250, 300, state, 'elbow3', false);
    pipes[7] = new Pipe(250, 150, state, 'elbow2', false);
    pipes[8] = new Pipe(100, 150, state, 'elbow1', false);
    pipes[9] = new Pipe(200, 150, state, 'pipeh', false);
    pipes[10] = new Pipe(150, 150, state, 'pipeh', false);
    pipes[11] = new Resistor(50, 50, state, 'resistor', 30);

    
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
