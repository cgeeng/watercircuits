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
        this.input.enableSnap(WIDTH/2, HEIGHT/2, false, true);
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
        
        this.animations.add('on', [1, 2, 3, 4,5,6,7], this.maxSpeed, true);
        
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
        
        this.animations.add('on', [1, 2, 3, 4], 10, true);
        
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
        this.input.enableSnap(WIDTH/2, HEIGHT/2, false, true);
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
        if (pipes[k].resistance != null) resistance = pipes[k].resistance;
    }
    //console.log(resistance);
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
        //I only have animation files for 2 types, i gotta fix this shit up lol
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill'|| pipes[i].key == 'resistor' || pipes[i].key == 'resistor2') {
            //if connected to source
            if (pipes[i].isConnectedSource) pipes[i].animations.play('on');
        }
    }
    state.pump.animations.play('on');
    
    //Animate robot shit
    if ( resistance == 0) {
        state.robot.animations.play('die')
    } else if (resistance > 33) {
        state.robot.animations.play('turningOn');
        console.log(10 - (resistance/5));
        state.robot.animations.currentAnim.speed = 10 - (resistance/5);
    } else {
        state.robot.animations.play('turningOn');
        state.robot.animations.currentAnim.speed = 10;
    }

}

function stopAnimate(state) {
    let pipes = state.pipes;
    for (var i in pipes) {
        //I only have animation files for 2 types
        if (pipes[i].key == 'pipe' || pipes[i].key == 'pipeh' || pipes[i].key == 'mill'|| pipes[i].key == 'resistor'|| pipes[i].key == 'resistor2') {
            //if connected to source
            pipes[i].animations.stop();
            //Sets to no water marks
            pipes[i].frame = 0;
        }
    }
    state.pump.animations.stop();
    state.robot.animations.stop();
    state.robot.frame = 0;
    state.didRobotRun = false;
}

function makePipes(state) {
    let pipes = state.pipes;
    let startx = 50;
    let starty = 225;
    
    pipes[0] = new Source(startx, starty, state); 
    pipes[1] = new Sink(startx, starty+50, state);           
    //  Make pipe

    pipes[2] = new Mill(startx+375, starty, state);
    pipes.push(new Pipe(startx+50, starty+100, state, 'elbow4', false));
    pipes.push(new Pipe(startx+100, starty+100, state, 'pipeh', false));    
    pipes.push(new Pipe(startx+150, starty+100, state, 'pipeh', false));
    pipes.push(new Pipe(startx+200, starty+100, state, 'pipeh', false));
    pipes.push(new Pipe(startx+250, starty+100, state, 'pipeh', false));
    pipes.push(new Pipe(startx+300, starty+100, state, 'pipeh', false));
    pipes.push(new Pipe(startx+350, starty+100, state, 'pipeh', false));
    pipes.push(new Pipe(startx+400, starty+100, state, 'pipeh', false));
    
    pipes.push(new Pipe(startx+450, starty+100, state, 'elbow3', false));
    pipes.push(new Pipe(startx+400, starty-50, state, 'elbow2', false));
    pipes.push(new Pipe(startx+50, starty-50, state, 'elbow1', false));
    
    pipes.push(new Pipe(startx+150, starty-50, state, 'pipeh', false));
    pipes.push(new Pipe(startx+100, starty-50, state, 'pipeh', false));
    //pipes.push(new Pipe(startx+200, starty-50, state, 'pipeh', false));
    pipes.push(new Pipe(startx+250, starty-50, state, 'pipeh', false));
    pipes.push(new Pipe(startx+300, starty-50, state, 'pipeh', false));
    pipes.push(new Pipe(startx+350, starty-50, state, 'pipeh', false));
    
    //pipes.push(new Resistor(50, 425, state, 'resistor', 30));

    
    state.pump = new Pump(startx+25, starty, state);
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

function addToState(state, thing) {
    state.pipes.push(thing);
    state.add.existing(thing);
    state.g.setNode(''+thing.id, thing);
}