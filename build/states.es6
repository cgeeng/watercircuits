//Gonna have this handle preload stuff
class Boot extends Phaser.State {
    
    preload() {
        game.load.image('source', 'resources/assets/source.png');
        game.load.image('sink', 'resources/assets/sink.png');
        game.load.image('elbow1', 'resources/assets/elbow1.png');
        game.load.image('elbow2', 'resources/assets/elbow2.png');
        game.load.image('elbow4', 'resources/assets/elbow4.png');
        game.load.image('elbow3', 'resources/assets/elbow3.png');
        game.load.spritesheet('pump', 'resources/assets/pumpsheet.png', 100, 100);
        game.load.spritesheet('pipe', 'resources/assets/pipesheet.png', WIDTH, HEIGHT);
        game.load.spritesheet('pipeh', 'resources/assets/pipehsheet.png', WIDTH, HEIGHT);
        game.load.spritesheet('mill', 'resources/assets/watermillsheet.png', 100, 100);
        game.load.spritesheet('resistor', 'resources/assets/resistorsheet.png', WIDTH, HEIGHT);
        game.load.spritesheet('resistor2', 'resources/assets/resistor2sheet.png', WIDTH, HEIGHT);
        
        game.load.image('sky', 'resources/assets/bg/sky.png');
        game.load.image('overlay', 'resources/assets/ui/overlay.png');
        game.load.image('robot', 'resources/assets/bg/robot.png');
        
        game.load.spritesheet('robot1', 'resources/assets/robot1sheet.png', 700, 500);
        
        game.load.image('white', 'resources/assets/ui/white.png');
        game.load.image('circuit', 'resources/assets/ui/circuit.png');
        game.load.image('math', 'resources/assets/ui/math.png');
        game.load.spritesheet('circuitButton', 'resources/assets/ui/buttonsheet.png', 117, 45);
        
    }

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		this.text = new RainbowText(this.game, center.x, center.y, "play play");
		//text.anchor.set(0.5);
        //On click will switch states.
        this.text.inputEnabled = true;
        this.text.events.onInputUp.add(this.start, this);
	}
    start () {
        console.log("start of Play state");
        this.text.destroy();
        game.state.start('Play');

    }
        
}

//Gameplay state
class Play extends Phaser.State {

  create() {
    this.add.sprite(0,0,'sky');
    this.add.sprite(0,0,'overlay');
    
    //ROBOT STUFF
    this.robot = this.add.sprite(0,0,'robot1'); 
    this.robot.animations.add('turningOn', [1,2,3,4,5, 6], 10, false); 
    this.robot.animations.add('on', [5, 6], 20, true);  
    this.robot.animations.add('die', [7,8], 10, false);       
    this.didRobotRun = false;      

    //make an UNDIRECTED GRAAAAAPH!!!!
    this.g = new graphlib.Graph({ directed: false}); //{ directed: false}
    this.pipeCount = 2; //accounts for source and sink; 0 = source, 1 = sink  
    
    this.pipes = [];
    //this holds the weird pump
    this.pump;
    makePipes(this);
      
    this.text = this.add.text(0, 0, "are the pipes fudgin connected", {fill: "#ff0044"});
    addPipes(this);
    this.setToolbox();
    this.initEdges();
      
        //CIRCUIT OVERLAY
    this.circuitButton = this.add.sprite(546,455,'circuitButton')
    this.circuitButton.inputEnabled = true;
    this.circuitButton.input.useHandCursor = true;
    this.circuitButton.events.onInputDown.add(this.toggleCircuit, this);
    this.white = this.add.sprite(0,0,'white'); 
    this.circuit = this.add.sprite(0,0,'circuit');
    this.math = this.add.sprite(0,0,'math');
    this.white.alpha = 0;
    this.circuit.alpha = 0;
    this.math.alpha = 0;

  }
    update() {
            if ( this.pipes[0].isConnectedSink ) {
                this.text.text = "WATER RUN";
                animatePipes(this);
            } else {
                this.text.text = "WATER NO RUN";
                stopAnimate(this);
            }

    }

toggleCircuit() {
    
    if (this.circuit.alpha != 1) {
        this.white.alpha = 0.8;
        this.circuit.alpha = 1;
        this.math.alpha = 1;
        this.circuitButton.frame = 1;
    } else {
        this.white.alpha = 0;
        this.circuit.alpha = 0;
        this.circuitButton.frame = 0;
        this.math.alpha = 0;
    }
        
}
    
setToolbox() {
    let draggable = new Pipe(40, 425, this, 'pipeh', true);
    draggable.input.useHandCursor = true;
    addToState(this, draggable);
    addToState(this, new Resistor(140, 425, this, 'resistor', 30));
    addToState(this, new Resistor(300, 425, this, 'resistor2', 35));
}

initEdges() {    
    //console.log(this.g.nodes());
    //Loop over all objects in game to add edges to graph
    for (var i in this.g.nodes()) {   
        for (var k in this.g.nodes()) {  
              if (intersects(this.g.node(k), this.g.node(i) ) && this.g.node(k) != this.g.node(i)) {
                //If two pipes intersect and aren't the same pipe and not undefined, make an edge
                this.g.setEdge(k, i);
            }else {
                //Get rid of edge edge exists and if not overlapping
                this.g.removeEdge(k, i);
            }
        }        
    }
    //remove initial source and sink connection
    this.g.removeEdge(0,1);
    this.g.removeEdge(1,0);
    this.setConnectedToSource();
    this.setConnectedToSink();
    console.log("edges initialized");
}


updateConnection(obj) {    
    //Loop over all objects in game to add edges to graph
    for (var i in this.g.nodes()) {  
        //console.log("checking " + i + " now!")
        if (intersects(obj, this.g.node(i) ) && obj != this.g.node(i) ) {
            //If two pipes intersect and aren't the same pipe, make an edge
            //console.log("setting edge between " + this.id + " and " + i);
            this.g.setEdge(obj.id + "", i);
        }else {
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

setConnectedToSource() {
    //Get nodes connected to Source
    var connectedToSource = graphlib.alg.preorder(this.g,"0");
    var allPipes = this.g.nodes();
    
    for (var i = 0; i < connectedToSource.length; i++) {
        var pipe = connectedToSource[i];
        this.g.node(pipe).isConnectedSource = true;
    }
    //Check if pipe is not connected to source
    for (var i = 0; i < allPipes.length; i++) {
        var pipe = allPipes[i];
        if ( !containsObject( pipe, connectedToSource) ) {
            this.g.node(pipe).isConnectedSource = false;
        }
    }        
}

setConnectedToSink() {
    //Get nodes connected to sink
    var connectedToSink = graphlib.alg.preorder(this.g,"1");
    var allPipes = this.g.nodes();
    
    for (var i = 0; i < connectedToSink.length; i++) {
        var pipe = connectedToSink[i];
        this.g.node(pipe).isConnectedSink = true;
    }
    //Check if pipe is not connected to sink
    for (var i = 0; i < allPipes.length; i++) {
        var pipe = allPipes[i];
        if ( !containsObject( pipe, connectedToSink) ) {
            this.g.node(pipe).isConnectedSink = false;
        }
    }        
}

}


