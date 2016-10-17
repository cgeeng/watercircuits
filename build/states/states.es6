//Gonna have this handle preload stuff
class Boot extends Phaser.State {
    
    preload() {
        game.load.image('source', 'resources/assets/source.png');
        game.load.image('sink', 'resources/assets/sink.png');
        game.load.spritesheet('pipe', 'resources/assets/pipesheet.png', 50, 50);
        game.load.spritesheet('pipeh', 'resources/assets/pipehsheet.png', 50, 50);
        
    }

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		let text = new RainbowText(this.game, center.x, center.y, "boot boot");
		text.anchor.set(0.5);
	}
    
}

