class Game extends Phaser.Game {

	constructor() {
		super(700, 500, Phaser.AUTO, 'content', null, false, false);
		this.state.add('Boot', Boot, false);
        this.state.add('LevelSelect', LevelSelect, false);
        this.state.add('Play', Play, false);
        this.state.add('Level0', Level0, false);
        this.state.add('Level2', Level2, false);
		this.state.start('Boot');
        //this.state.start('Play');
	}

}
