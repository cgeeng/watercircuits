class Game extends Phaser.Game {

	constructor() {
		super(700, 500, Phaser.AUTO, 'content', null, false, false);
		this.state.add('Boot', Boot, false);
        this.state.add('Play', Play, false);
		this.state.start('Boot');
        //this.state.start('Play');
	}

}

/*
class Level extends Phaser.Game {
    constructor () {
        super(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
        
        let source;
        let sink;
        let pipe;
        let pipe2;
        let pipe3;
        let cursors;
        let text;
        let pieces;
        let connectText;
        

    
        
    }
            function preload() {
            this.load.image('source', 'resources/assets/source.png');
            this.load.image('sink', 'resources/assets/sink.png');
            this.load.spritesheet('pipe', 'resources/assets/pipesheet.png', 50, 50);
            this.load.spritesheet('pipeh', 'resources/assets/pipehsheet.png', 50, 50);
        
        }
        function create() {
            //make an UNDIRECTED GRAAAAAPH!!!!
            g = new graphlib.Graph({ directed: false});
            //  Make source
            source = new Source(200, 200);   
            sink = new Sink(400, 200);

            //  Make pipe
            pipe = new Pipe(50, 250);
            pipe2 = new PipeH(750, 250);
            pipe3 = new Pipe(375, 200);
            //  Our controls.
            cursors = this.input.keyboard.createCursorKeys();

            text = this.add.text(0, 0, "are the pipes fudgin connected", {fill: "#ff0044"});

            //Set up edges
            initEdges();
    
        }

        function update() {
            if ( source.isConnectedSink ) {
                text.text = "WATER RUN";
                pipe.animations.play('on');
            } else {
                text.text = "WATER NO RUN";
                //turnOffPipes();
            }

        }
}
*/