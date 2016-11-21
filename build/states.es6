//Gonna have this handle preload stuff
class Boot extends Phaser.State {
    
    preload() {
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
        game.load.spritesheet('resistor', 'resources/assets/resistorsheet.png', 2*WIDTH, HEIGHT);
        game.load.spritesheet('resistor2', 'resources/assets/resistor2sheet.png', 2*WIDTH, HEIGHT);
        
        game.load.image('sky', 'resources/assets/bg/sky.png');
        game.load.image('overlay', 'resources/assets/ui/overlay.png');
        game.load.image('robot', 'resources/assets/bg/robot.png');
        
        game.load.spritesheet('robot1', 'resources/assets/robot1sheet.png', 700, 500);
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
        
        game.load.audio('water', 'resources/assets/sound/water.wav');
        game.load.spritesheet('figure', 'resources/assets/figuresheet.png', 74, 93);
        game.load.image('speechBubble', 'resources/assets/speechbubble.png');
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
        //so I can get left and right
        game.input.mouse.capture = true;
        game.state.start('LevelSelect');

    }
        
}

class LevelSelect extends Phaser.State {
    create() {
        this.level1 = new RainbowText(this.game, 250, 250, "Level 1");
        this.level1.inputEnabled = true;
        this.level1.input.useHandCursor = true;
        this.level1.events.onInputUp.add(function() {
            this.destroy();
            game.state.start('Level0');} , this);
        this.level2 = new RainbowText(this.game, 250, 300, "Level 2");
        this.level2.inputEnabled = true;
        this.level2.input.useHandCursor = true;
        this.level2.events.onInputUp.add(function() {
            this.destroy();
            game.state.start('Play');} , this);
        this.level3 = new RainbowText(this.game, 250, 350, "Level 3");
        this.level3.inputEnabled = true;
        this.level3.input.useHandCursor = true;
        this.level3.events.onInputUp.add(function() {
            this.destroy();
            game.state.start('Level2');} , this);
        this.level4 = new RainbowText(this.game, 450, 250, "Level 4");
        this.level4.inputEnabled = true;
        this.level4.input.useHandCursor = true;
        this.level4.events.onInputUp.add(function() {
            this.destroy();
            game.state.start('Level3');} , this);
        this.level5 = new RainbowText(this.game, 450, 300, "Level 5");
        this.level5.inputEnabled = true;
        this.level5.input.useHandCursor = true;
        this.level5.events.onInputUp.add(function() {
            this.destroy();
            game.state.start('Level4');} , this);
    }
    
    goToLevel() {
        game.state.start('Level0');
    }
    
    destroy() {
        this.level1.destroy();
        this.level2.destroy();
        this.level3.destroy();
        this.level4.destroy();
        this.level5.destroy();
    }
}
//Gameplay state
class Play extends Phaser.State {

    back() {
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
        this.water.destroy();
        this.victoryText.destroy();
        game.state.start('LevelSelect');
    }

  create() {
      //prevents popup on right click
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    this.add.sprite(0,0,'sky');
    this.add.sprite(200,80,'speechBubble');    
    this.bubbleText = game.add.text(220, 110, "Reach this", { font: "15px Calibri", fill: "#000", align: "center", });
    //ROBOT STUFF
    this.makeRobot();
    //make an UNDIRECTED GRAAAAAPH!!!!
    this.g = new graphlib.Graph({ directed: false}); //{ directed: false}
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

    this.targetCurrent = 0.8; //amperes        
    this.createConditions();    

  }
    update() {
        if ( this.pipes[0].isConnectedSink ) {
            //this.text.text = "WATER RUN";
            animatePipes(this);
            if (this.mill.current == this.targetCurrent) {
                this.setVictory();
            }
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
      
    }
    makeRobot() {
        this.robot = new Robot(0,0, this); 
        this.add.existing(this.robot);
        this.heart = this.add.sprite(0,0,'heart');
        this.bubble = this.add.sprite(0,0, 'bubble');
        this.bubble.visible = false;
        this.bubble.animations.add('on', [0,1, 2,3], 10, true);
    }
    setFailure() {
        this.failureText = new displayText(this.game, 350, 250, "");
    }
    
    setVictory() {
        this.bubbleText.text = "CONGRATS!!!";
    }
    
    updateLabelPosition() {
        //Moves resistor labels to where resistor position is
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
createConditions() {
    this.victoryText = new RainbowText(this.game, 350,150,"");
    this.add.existing(this.victoryText);
    
    this.water = game.add.audio('water');
    this.figure = game.add.sprite(620,150,'figure');
    this.figure.animations.add('blink', [0,1], 0.5, true);
    this.figure.animations.play('blink');
    
    this.bubbleText.text = "Careful not to run it too fast."
    
}
createButtons() {
    //buttons
    this.exit = game.add.button(10, 10, 'exit', this.back, this, 1, 0);

    this.upArrow = game.add.button(150, 250, 'arrow', increaseVoltage, this, 1, 0, 3);
    this.upArrow.input.useHandCursor = true;
    
    this.downArrow = game.add.button(50, 250, 'arrow', decreaseVoltage, this, 1, 0, 3);
    this.downArrow.input.useHandCursor = true;
    this.downArrow.anchor.setTo(1, 1);
    this.downArrow.angle += 180;
    
}
    
setToolbox() {
    this.add.sprite(0,0,'overlay');
    let draggable = new Pipe(40, 425, this, 'pipeh', true);
    draggable.input.useHandCursor = true;
    addToState(this, draggable);
    
    let draggable2 = new Pipe(120, 425, this, 'pipeh', true);
    draggable2.input.useHandCursor = true;
    addToState(this, draggable2);
    
    addToState(this, new Resistor(200, 425, this, 'resistor', 10));
    addToState(this, new Resistor(350, 425, this, 'resistor2', 20));
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


