class Game extends Phaser.Game {

	constructor() {
		super(700, 500, Phaser.CANVAS, 'content', null, false, false);
		this.state.add('Boot', Boot, false);
        this.state.add('LevelSelect', LevelSelect, false);
        this.state.add('Play', Play, false);
        this.state.add('Level1', Level1, false);
        this.state.add('Level2', Level2, false);
        this.state.add('Level3', Level3, false);
        this.state.add('Level4', Level4, false);
        this.state.add('Level5', Level5, false);
        this.state.add('Level6', Level6, false);
        this.state.add('Level7', Level7, false);
        this.state.add('Level8', Level8, false);
		this.state.start('Boot');
        //this.state.start('Play');
	}

}
