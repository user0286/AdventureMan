import Phaser from 'phaser'

import AdventureManScene from './scene/AdventureManScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			// debug: true
		},
	},
	scene: [AdventureManScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)
