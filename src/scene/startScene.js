import Phaser from "phaser";
export default class StartGameScene extends Phaser.Scene {
    constructor(){
        super('start-scene')
    }

    init(){
        this.startButton = undefined
    }

    preload(){
        this.load.image('start-button', 'images/startButton.png')
        this.load.image('background1', 'images/startgame.png')
    }

    create(){
        this.add.image(420, 320, 'background1')

        this.startButton = this.add.image(400, 320, 'start-button')
        .setInteractive()
        .setScale(0.3)
        this.startButton.once('pointerup', () => {
            this.scene.start('adventure-man-scene')
        }, this)
    }
}