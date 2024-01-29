import Phaser from 'phaser'

export default class AdventureManScene extends Phaser.Scene {
	constructor() {
		super('adventure-man-scene')
	}
    init(){
        //inisiasi Ground
        this.ground = undefined

        //inisiasi Platform
        this.platform2 = undefined
        this.platform3 = undefined
        this.platform4 = undefined

        //inisiasi player
        this.player = undefined
        this.player1 = undefined

        //inisiasi move
        this.cursor = undefined

        //inisiasi Malabulu
        this.Malabulu = undefined
    }

    preload(){
        this.load.image('background', 'images/Tiles/Assets/Background_2.png')

        //plafrom
        this.load.spritesheet('ground', 'images/Tiles/Assets/Assets.png', {
            frameWidth: 32, frameHeight: 32
        })

        this.load.spritesheet('platform2', 'images/Tiles/Assets/Assets.png', {
            frameWidth: 32, frameHeight: 32
        })

        this.load.spritesheet('platform3', 'images/Tiles/Assets/Assets.png', {
            frameWidth: 32, frameHeight: 32
        })

        this.load.spritesheet('platform4', 'images/Tiles/Assets/Assets.png', {
            frameWidth: 32, frameHeight: 32
        })
        //Heroes
        this.load.spritesheet('knight-idle', 'images/Pixel Crawler - FREE - 1.8/Heroes/Knight/Idle/Idle-Sheet.png',
            {frameWidth:32, frameHeight:32}
        )

        this.load.spritesheet('knight-run', 'images/Pixel Crawler - FREE - 1.8/Heroes/Knight/Run/Run-Sheet.png',
            {frameWidth:64, frameHeight:64}
        )

        //Malabulu
        this.load.image('malabulu', 'images/Malabulu.png')
    }

    create(){
        //Display Background
        this.add.image(400, 300, 'background').setScale(2.3)

        //Display ground
        this.ground = this.physics.add.staticGroup({
            key: 'ground',
            frame: 0,
            repeat: 85,
            setXY:{ x: 0, y:585, stepX: 10}
        })

        //display Platform
        this.platform2 = this.physics.add.staticGroup({
            key: 'platform2',
            frame: 0,
            repeat: 65,
            setXY:{ x: 500, y:500, stepX: 10}
        })

        this.platform3 = this.physics.add.staticGroup({
            key: 'platform3',
            frame: 0,
            repeat: 65,
            setXY:{ x: 0, y:400, stepX: 5}
        })

        this.platform4 = this.physics.add.staticGroup({
            key: 'platform4',
            frame: 0,
            repeat: 65,
            setXY:{ x: 450, y:300, stepX: 10}
        })

        //Display player
        this.player = this.physics.add.sprite(369, 450, 'knight-idle').setOffset(-5,-20)

        //Bounds player
        this.player.setCollideWorldBounds(true)

        //Collider
        this.physics.add.collider(this.player,this.ground)

        this.physics.add.collider(this.player, this.platform2)

        this.physics.add.collider(this.player, this.platform3)

        this.physics.add.collider(this.player, this.platform4)

        //Cursor
        this.cursor = this.input.keyboard.createCursorKeys()

        //Create Animation
        this.createAnimation()

        //Malabulu
        this.Malabulu = this.physics.add.group({
            key: 'malabulu',
            repeat: 0,
            setXY: {x:50, y:0, stepX: 70}
        })

        this.physics.add.collider(this.Malabulu, this.platform2)
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

        if(this.cursor.up.isDown) {
            this.player.setVelocity(0, -200)
            this.player.anims.play('turn')
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