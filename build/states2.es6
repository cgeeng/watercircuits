class Level0 extends Play {
    constructor () {
        super();
    }

    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');
        this.add.sprite(0,0,'overlay');

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
        this.createButtons();
        this.initEdges();

        this.upArrow;
        this.downArrow;
        
        this.createConditions();
        this.targetCurrent = 2; //amperes
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
        this.createCircuit();
        this.setToolbox();
        this.createButtons();
        this.initEdges();
        
        this.upArrow;
        this.downArrow;
        
        this.createConditions();        
        this.targetCurrent = 2; //amperes
  }
    
    createCircuit() {
        this.add.sprite(0,0,'cover1');
        this.createBattery();
    }
    
    createBattery() {
        this.voltageLabel = new displayText(this.game, 30, 210, "Voltage:");
        this.voltageText = new displayText(this.game, 50, 230, this.pump.voltage + "V");
    }
}

class Level3 extends Level2 {
    constructor () {
        super();
    }
    
    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');

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
        this.createCircuit();
        this.setToolbox();
        this.createButtons();
        this.initEdges();
        
        this.upArrow;
        this.downArrow;
        
        this.createConditions();        
        this.targetCurrent = 2; //amperes

  }
    createCircuit() {
        this.add.sprite(0,0,'cover2');
        this.createBattery();
    }
    
    setToolbox() {
        this.add.sprite(0,0,'overlay');
        let draggable = new Pipe(40, 425, this, 'pipeh', true);
        draggable.input.useHandCursor = true;
        addToState(this, draggable);
        this.resistor1 = new Resistor(140, 450, this, 'circuitResistor', 10);
        addToState(this, this.resistor1);
        this.resistor2 = new Resistor(250, 450, this, 'circuitResistor', 20);
        addToState(this, this.resistor2);
        this.createResistor();
    }
    
    createResistor() {
        this.resistorLabel1 = new displayText(this.game, this.resistor1.x - 20, this.resistor1.y - 30, "Resistance:");
        this.resistorText1 = new displayText(this.game, this.resistor1.x, this.resistor1.y - 10, this.resistor1.resistance + "Ohms");
        
        this.resistorLabel2 = new displayText(this.game, this.resistor2.x - 20, this.resistor2.y - 30, "Resistance:");
        this.resistorText2 = new displayText(this.game, this.resistor2.x, this.resistor2.y - 10, this.resistor2.resistance + 100 + "Ohms");
    }

}
class Level4 extends Level3 {
    constructor () {
        super();
    }
    
    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');

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
        this.createCircuit();
        this.setToolbox();
        this.createButtons();
        this.createLED();
        this.initEdges();
        
        this.upArrow;
        this.downArrow;
        
        this.createConditions();       
        this.targetCurrent = 2; //amperes

  }
    createCircuit() {
        this.add.sprite(0,0,'cover3');
        this.createBattery();
    }
    
    createLED() {
        this.LEDLabel = new displayText(this.game, 400, 220, "Max Current: 15amps");
        this.LEDText = new displayText(this.game, 500, 290, "0amps");

    }
}