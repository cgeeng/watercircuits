//Gonna have this handle preload stuff
class Boot extends Phaser.State {
    
    preload() {
        game.load.image('source', 'resources/assets/source.png');
        game.load.image('sink', 'resources/assets/sink.png');
        game.load.image('pump', 'resources/assets/pump.png');
        game.load.image('elbow1', 'resources/assets/elbow1.png');
        game.load.image('elbow2', 'resources/assets/elbow2.png');
        game.load.image('elbow4', 'resources/assets/elbow4.png');
        game.load.image('elbow3', 'resources/assets/elbow3.png');
        game.load.spritesheet('pipe', 'resources/assets/pipesheet.png', 50, 50);
        game.load.spritesheet('pipeh', 'resources/assets/pipehsheet.png', 50, 50);
        game.load.spritesheet('mill', 'resources/assets/watermillsheet.png', 100, 100);
        
    }

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		this.text = new RainbowText(this.game, center.x, center.y, "boot boot");
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
    // TODO: Replace this with really cool game code here :)    
    
    //make an UNDIRECTED GRAAAAAPH!!!!
    this.g = new graphlib.Graph({ directed: false}); //{ directed: false}
    this.pipeCount = 2; //accounts for source and sink; 0 = source, 1 = sink  
    
    this.pipes = [];
    makePipes(this);
      
    this.text = this.add.text(0, 0, "are the pipes fudgin connected", {fill: "#ff0044"});
    addPipes(this);
    this.initEdges();

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
    console.log(graphlib.alg.preorder(this.g,"0"));
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


