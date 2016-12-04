class Level1 extends Play {
    constructor () {
        super();
    }

    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');
        this.add.sprite(0,0,'overlay');
        this.add.sprite(200,80,'speechBubble'); 
        this.bubbleText = game.add.text(220, 110, "Hello.", { font: "15px Calibri", fill: "#000", align: "center", });

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
        this.bubbleText.text = "Get the water mill running."
        //this.targetCurrent = 1.5; //amperes
    }
    
    setToolbox() {
        let draggable = new Pipe(200, 425, this, 'pipeh', true);
        draggable.input.useHandCursor = true;
        addToState(this, draggable);
                    
        let draggable2 = new Pipe(120, 425, this, 'pipeh', true);
        draggable2.input.useHandCursor = true;
        addToState(this, draggable2);
    }
}

class Level2 extends Play {
      create() {
      //prevents popup on right click
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    this.add.sprite(0,0,'sky');
    this.add.sprite(0,0,'overlay');
    this.add.sprite(200,80,'speechBubble');    
    this.bubbleText = game.add.text(220, 105, 'The robot-bubble-machine runs \n on water.', { font: "15px Calibri", fill: "#000", align: "center", });
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

    this.targetCurrent = 1; //amperes        
    this.createConditions();    

  }
    setToolbox() {
        let draggable = new Pipe(200, 425, this, 'pipeh', true);
        draggable.input.useHandCursor = true;
        addToState(this, draggable);
                    
        let draggable2 = new Pipe(120, 425, this, 'pipeh', true);
        draggable2.input.useHandCursor = true;
        addToState(this, draggable2);
    }

}

class Level3 extends Level2 {
      create() {
      //prevents popup on right click
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    this.add.sprite(0,0,'sky');
    this.add.sprite(0,0,'overlay');
    this.add.sprite(200,80,'speechBubble');    
    this.bubbleText = game.add.text(220, 110, "Hello.", { font: "15px Calibri", fill: "#000", align: "center", });
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

    this.targetCurrent = .4; //amperes        
    this.createConditions();

  }
    setToolbox() {
        let draggable = new Pipe(200, 425, this, 'pipeh', true);
        draggable.input.useHandCursor = true;
        addToState(this, draggable);
                    
        let draggable2 = new Pipe(120, 425, this, 'pipeh', true);
        draggable2.input.useHandCursor = true;
        addToState(this, draggable2);
    }
    
    makeRobot() {
        this.robot = new Robot(0,0, this, 'robot2'); 
        this.add.existing(this.robot);
        this.heart = this.add.sprite(505,220,'heart');
        this.bubble = this.add.sprite(0,0, 'bubble');
        this.bubble.visible = false;
        this.bubble.animations.add('on', [0,1, 2,3], 10, true);
        this.robot.maxCurrent = 0.6;
        this.bubbleText.text = "This robot can't take much water.";
        this.makeIndicator();
    }
    makeIndicator() {
        if (this.robot.key == 'robot2') {
            this.indicator = this.add.sprite(575,228, 'indicator');
            this.indicator.animations.add('move', [0,1, 2,3,4], 8, true);
            this.indicator.animations.play('move');
        } else if (this.robot.key == 'robot1') {
            this.indicator = this.add.sprite(585,222, 'indicator');
            this.indicator.animations.add('move', [0,1, 2,3,4], 8, true);
            this.indicator.animations.play('move');
        }
    }
}

class Level4 extends Level3 {
      create() {
      //prevents popup on right click
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    this.add.sprite(0,0,'sky');
    this.add.sprite(0,0,'overlay');
    this.add.sprite(200,80,'speechBubble');    
    this.bubbleText = game.add.text(220, 110, "This robot can't take much water.", { font: "15px Calibri", fill: "#000", align: "center", });
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
          this.upArrow.visible = false;
          this.downArrow.visible = false;
    this.initEdges();
      
    this.upArrow;
    this.downArrow;

    this.targetCurrent = .4; //amperes        
    this.createConditions();

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
        addToState(this, new Resistor(350, 425, this, 'resistor2', 15));
    }
}

class Level5 extends Play {
    constructor () {
        super();
    }
    
    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');
        this.add.sprite(200,80,'speechBubble'); 
        this.bubbleText = game.add.text(220, 110, "Batteries supply voltage.", { font: "15px Calibri", fill: "#000", align: "center", });
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
        this.targetCurrent = 1; //amperes
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

class Level6 extends Level5 {
    constructor () {
        super();
    }
    
    create() {
          //prevents popup on right click
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        this.add.sprite(0,0,'sky');
        this.add.sprite(200,80,'speechBubble'); 
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
        
        this.bubbleText = game.add.text(220, 110, "Resistance is measured in Ohms.", { font: "15px Calibri", fill: "#000", align: "center", });
        
        this.upArrow;
        this.downArrow;
        
        this.createConditions();        
        this.targetCurrent = 1; //amperes

  }
    createCircuit() {
        this.add.sprite(0,0,'cover2');
        this.createBattery();
    }
    
    setToolbox() {
        this.add.sprite(0,0,'overlay');
        /*
        let draggable = new Pipe(40, 425, this, 'pipeh', true);
        draggable.input.useHandCursor = true;
        addToState(this, draggable);
        
        let draggable2 = new Pipe(120, 425, this, 'pipeh', true);
        draggable2.input.useHandCursor = true;
        addToState(this, draggable2);
        */
        
        this.resistor0 = new Resistor(40, 450, this, 'wire', 1);
        addToState(this, this.resistor0);
        
        this.resistor1 = new Resistor(200, 450, this, 'circuitResistor', 10);
        addToState(this, this.resistor1);
        this.resistor2 = new Resistor(350, 450, this, 'circuitResistor', 15);
        addToState(this, this.resistor2);
        this.createResistor();
    }
    
    createResistor() {
        this.resistorLabel1 = new displayText(this.game, this.resistor1.x - 20, this.resistor1.y - 30, "Resistance:");
        this.resistorText1 = new displayText(this.game, this.resistor1.x, this.resistor1.y - 10, this.resistor1.resistance + " Ohms");
        
        this.resistorLabel2 = new displayText(this.game, this.resistor2.x - 20, this.resistor2.y - 30, "Resistance:");
        this.resistorText2 = new displayText(this.game, this.resistor2.x, this.resistor2.y - 10, this.resistor2.resistance + " Ohms");
    }

}
class Level7 extends Level6 {
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
        this.add.sprite(200,80,'speechBubble'); 
        this.bubbleText = game.add.text(220, 105, 'Get near 0.3 amps without burning the bulb. \n Volts = Current * Resistance', { font: "15px Calibri", fill: "#000", align: "center", });
        this.setToolbox();
        this.createButtons();
        this.createLED();
        this.initEdges();
        
        this.upArrow;
        this.downArrow;
        
        this.createConditions();       
        this.targetCurrent = 0.3; //amperes
  }
    createCircuit() {
        this.add.sprite(0,0,'cover3');
        this.createBattery();
    }
    
    createLED() {
        this.robot.maxCurrent = 0.7;
        this.bulb = this.add.sprite(420,220,'bulb');
        this.LEDLabel = new displayText(this.game, 400, this.bulb.y-15, "Max Current: " + this.robot.maxCurrent  + " amps");
        this.LEDText = new displayText(this.game, 500, 290, "0 amps");
    }
}
class Level8 extends Level7 {
    constructor () {
        super();
    }
        create() {
        game.add.plugin(Fabrique.Plugins.InputField);
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
        this.add.sprite(200,80,'speechBubble'); 
                this.targetCurrent = 2; //amperes
        this.bubbleText = game.add.text(220, 105, 'Get ' + this.targetCurrent + ' amps without burning the bulb. \n Volts = Current * Resistance', { font: "15px Calibri", fill: "#000", align: "center", });
        this.setToolbox();
        this.createButtons();
        this.createLED();
        this.robot.maxCurrent = 4; 
        this.LEDLabel.text = "Max Current: " + this.robot.maxCurrent  + " amps";
        this.initEdges();
        
        this.upArrow;
        this.downArrow;
        
        this.createConditions();    

        this.upArrow.visible = false;
        this.downArrow.visible = false;
        
        this.setInputs();

  }
    setInputs() {
        /*
        this.resistanceInput = game.add.inputField(210, 230, {
            font: '15px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 80,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Resistance',
        });
        */
        
        //this.resistanceText = new displayText(this.game, 310, 233, "Ohms");
    }
    
    updateLabels() {
       this.resistor1.resistance = this.resistorLabel1.text.text;
    }
    setVictory() {
        this.bubbleText.text = "CONGRATS!!!";
        this.nextButton.visible = false;
        this.resetButton.visible = false;
        
        this.surveyButton = game.add.button(100, 170, 'survey', function() {   window.open("http://www.google.com", "_blank");}, this, 1, 0, 1);
        this.surveyButton.input.useHandCursor = true;
    }
    setToolbox() {
        this.add.sprite(0,0,'overlay');

        this.resistor1 = new Resistor(200, 400, this, 'circuitResistor', 10);
        addToState(this, this.resistor1);
        
        this.resistor2 = new Resistor(380, 450, this, 'circuitResistor', 10);
        addToState(this, this.resistor2);
        this.resistor3 = new Resistor(500, 450, this, 'circuitResistor', 15);
        addToState(this, this.resistor3);
        this.resistor2.inputEnabled = false;
        this.resistor3.inputEnabled = false;
        
                this.createResistor();
    }
    
    createResistor() {
        this.resistorLabel1 = game.add.inputField(210, 230, {
            font: '15px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 80,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Resistance',
        });
        this.resistorText1 = new displayText(this.game, this.resistorLabel1.x + 100, this.resistorLabel1.y+3, " Ohms");
        
        this.resistorLabel2 = new displayText(this.game, this.resistor2.x - 20, this.resistor2.y - 30, "Resistance:");
        this.resistorText2 = new displayText(this.game, this.resistor2.x, this.resistor2.y - 10, this.resistor2.resistance + " Ohms");
        
        this.resistorLabel3 = new displayText(this.game, this.resistor3.x - 20, this.resistor3.y - 30, "Resistance:");
        this.resistorText3 = new displayText(this.game, this.resistor3.x, this.resistor3.y - 10, this.resistor3.resistance + " Ohms");

    }
    
    setFailure() {
        //this.failureText = new displayText(this.game, 350, 250, "");
        this.bubbleText.text = 'Get ' + this.targetCurrent + ' Amps.\n 6 Volts = 2 Amps * Resistance';
        this.resetButton.visible = false;
        this.nextButton.visible = false;
    }

}