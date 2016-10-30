class Level0 extends Play {
    constructor () {
        super();
    }

    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');
        this.add.sprite(0,0,'overlay');

        //buttons
        this.exit = this.add.sprite(10,10, 'exit');
        this.exit.inputEnabled = true;
        this.exit.input.useHandCursor = true;
        this.exit.events.onInputUp.add(this.back, this);

        //make an UNDIRECTED GRAAAAAPH!!!!
        this.g = new graphlib.Graph({ directed: false}); //{ directed: false}
        this.pipeCount = 2; //accounts for source and sink; 0 = source, 1 = sink  

        this.pipes = [];
        //this holds the weird pump
        this.pump;
        this.mill
        makePipes(this);

        //this.text = this.add.text(0, 0, "are the pipes fudgin connected", {fill: "#ff0044"});
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
    
    setToolbox() {
        let draggable = new Pipe(200, 425, this, 'pipeh', true);
        draggable.input.useHandCursor = true;
        addToState(this, draggable);
    }
}

class Level2 extends Play {
    constructor () {
        super();
    }
    
    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');

        //ROBOT STUFF
        this.robot = new Robot(0,0, this); 
        this.add.existing(this.robot);
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
        this.createCircuit();
        this.setToolbox();
        this.createButtons();
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
    
    createCircuit() {
        this.add.sprite(0,0,'cover1');
        this.createBattery();
    }
    
    createBattery() {
        game.add.button(150, 250, 'arrow', this.actionOnClick, this, 0, 0, 0);
        game.add.button(50, 250, 'arrow', this.actionOnClick, this, 0, 0, 0);
    }
    
    actionOnClick() {
        console.log("hi");
    }
}