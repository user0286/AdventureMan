import Phaser from 'phaser'

export default class AdventureManScene extends Phaser.Scene {
	constructor() {
		super('adventure-man-scene')
	}
    init(){
        this.platfrom = undefined

        //inisiasi player
        this.player = undefined
        this.player1 = undefined

        //inisiasi move
        this.cursor = undefined
    }

    preload(){
        this.load.image('background', 'images/Tiles/Assets/Background_2.png')

        //plafrom
        this.load.spritesheet('platfrom', 'images/Tiles/Assets/Assets.png', {
            frameWidth: 32, frameHeight: 32
        })

        //Heroes
        this.load.spritesheet('knight-idle', 'images/Pixel Crawler - FREE - 1.8/Heroes/Knight/Idle/Idle-Sheet.png',
            {frameWidth:32, frameHeight:32}
        )

        this.load.spritesheet('knight-run', 'images/Pixel Crawler - FREE - 1.8/Heroes/Knight/Run/Run-Sheet.png',
            {frameWidth:64, frameHeight:64}
        )

    }

    create(){
        //Display Background
        this.add.image(400, 300, 'background').setScale(2.3)

        //Display Platfrom
        this.platfrom = this.physics.add.staticGroup({
            key: 'platfrom',
            frame: 0,
            repeat: 85,
            setXY:{ x: 0, y:585, stepX: 10}
        })

        //Display player
        this.player = this.physics.add.sprite(100, 450, 'knight-idle').setOffset(-5,-20)


        //Bounds player
        this.player.setCollideWorldBounds(true)
        

        //Collider
        this.physics.add.collider(this.player,this.platfrom)
    

        //Cursor
        this.cursor = this.input.keyboard.createCursorKeys()

        //Create Animation
        this.createAnimation()

        
    }

    update(){
        if(!this.cursor.left.isDown && !this.cursor.right.isDown){
            this.player.anims.play('turn', true)
        }

        if(this.cursor.right.isDown){
            this.player.setVelocity(120, 450).setFlipX(false)
            this.player.anims.play('right', true)
        } else if(this.cursor.left.isDown){
            this.player.setVelocity(-120, 450).setFlipX(true)
            this.player.anims.play('left', true)
        } else{
            this.player.setVelocityX(0)
        }


    }

    createAnimation(){
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('knight-idle',
                {start:0 , end: 3}),
            frameRate: 10,
            repeat: -1
        })

        //animtion to the right
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('knight-run',
                {start:0, end:5}),
            frameRate: 10,
            repeat: -1
        })

        //animation to the left
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('knight-run',
                {start:0, end:5}),
            frameRate: 10,
            repeat: -1
        })
    }
}