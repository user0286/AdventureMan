import Phaser from 'phaser';
export default class LoseGameScene extends Phaser.Scene {
    constructor() {
        super('over-scene')
    }

    init(data){

    }

    preload(){
        this.load.image('backgroundGameOver', 'images/Background_4.png')
        this.load.image('Died', 'images/Died.png')
        this.load.image('restart', 'images/Restart.png')
    }

    create(){
        this.add.image(400, 300, 'backgroundGameOver').setScale(2)
        this.add.image(400, 200, 'Died').setScale(0.5)

        this.restart = this.add.image(400, 400, 'restart')
            .setInteractive().setScale(0.5)

        this.restart.once('pointerup', () => {
            this.scene.start('adventure-man-scene')
        }, this)
    }
}