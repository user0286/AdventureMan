import Phaser from 'phaser'

import StartGameScene from './scene/startScene'
import AdventureManScene from './scene/AdventureManScene'
import LoseGameScene from './scene/LoseGameScene'
import AdventureManScene2 from './scene/AdventureManScene2'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		},
	},
	scene: [AdventureManScene2, StartGameScene, AdventureManScene, LoseGameScene ],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)
