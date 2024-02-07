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
        this.platform5 = undefined

        //inisiasi player
        this.player = undefined
        this.player1 = undefined

        //inisiasi move
        this.cursor = undefined

        //inisiasi Malabulu
        this.Malabulu = undefined

        //inisiasi score
        this.scoreText = undefined
        this.score = 0

        //inisiasi Bomb
        this.Barrel = undefined

        this.stepSound = undefined
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

        this.load.spritesheet('platform5', 'images/Tiles/Assets/Assets.png', {
            frameWidth: 32, frameHeight: 32
        })
        
        //Heroes
        this.load.spritesheet('knight-idle', 'images/Pixel Crawler - FREE - 1.8/Heroes/Knight/Idle/Idle-Sheet.png',
            {frameWidth:32, frameHeight:32}
        )

        this.load.spritesheet('knight-run', 'images/Pixel Crawler - FREE - 1.8/Heroes/Knight/Run/Run-Sheet32.png',
            {frameWidth:32, frameHeight:32}
        )

        //Malabulu
        this.load.image('malabulu', 'images/Malabulu.png')

        //Barrel
        this.load.image('Barrel', 'images/Barrel.png')
        
        //sfx
        this.load.audio('bgsong', 'sfx/song.mp3')
    }

    create(){
        //Display Background
        this.add.image(400, 300, 'background').setScale(2.3)

        //Display ground
        this.createGround()
        this.createPlatform()

        //Display Player
        this.createPlayer()

        //Platform Collider
        this.platformCollider()
        
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

        this.Malabulu.children.iterate(mabul => {
            // @ts-ignore
            mabul.setScale(0.02)
        })

        this.physics.add.collider(this.Malabulu, this.ground)
        this.physics.add.collider(this.Malabulu, this.platform2)
        this.physics.add.collider(this.Malabulu, this.platform3)
        this.physics.add.collider(this.Malabulu, this.platform4)
        this.physics.add.collider(this.Malabulu, this.platform5)

        //Create Overlap
        this.physics.add.overlap(
            this.player,
            this.Malabulu,
            this.saveMalabulu,
            null,
            this
        )

        

        //score
        this.scoreText = this.add.text(-60, 16,'.', {
            // @ts-ignore
            fontSize: '32', fill: 'black'
        }).setScale(1)

        //Barrel
        this.Barrel = this.physics.add.group({
            key: 'Barrel',
            repeat: 1,
            setXY: {x: 150, y:0, stepX: 120}
        })

        this.Barrel2 = this.physics.add.group({
            key: 'Barrel',
            repeat: 2,
            setXY: {x: 50, y:300, stepX: 120}
        })

        this.Barrel.children.iterate(child => {
            // @ts-ignore
            child.setScale(0.05)
        })

        this.Barrel2.children.iterate(child => {
            // @ts-ignore
            child.setScale(0.05)
        })

        this.physics.add.collider(this.Barrel, this.platform2)
        this.physics.add.collider(this.Barrel, this.platform3)
        this.physics.add.collider(this.Barrel, this.platform4)
        this.physics.add.collider(this.Barrel, this.platform5)
        //
        this.physics.add.collider(this.Barrel2, this.platform2)
        this.physics.add.collider(this.Barrel2, this.platform3)
        this.physics.add.collider(this.Barrel2, this.platform4)
        this.physics.add.collider(this.Barrel2, this.platform5)

        this.physics.add.overlap(
            this.player,
            this.Barrel,
            this.gameOver,
            null,
            this
        )

        this.physics.add.overlap(
            this.player,
            this.Barrel2,
            this.gameOver2,
            null,
            this
        )

        this.backsound = this.sound.add('bgsong')
        var soundConfig ={
            loop: true,
            volume: 0.5,
        }
        this.backsound.play(soundConfig)
    }

    update(){
        if(this.cursor.right.isDown){
            this.player.setVelocity(120, 450).setFlipX(false)
            this.player.anims.play('right', true)
            // this.sound.play('stepGrass')
            // this.stepDelay(10)
        } else if(this.cursor.left.isDown){
            this.player.setVelocity(-120, 450).setFlipX(true)
            this.player.anims.play('right', true)
            // this.sound.play('stepGrass')
            // this.stepDelay(10)
        } else{
            this.player.setVelocityX(0)
        }

        let isJumping = false;

        if(this.cursor.up.isDown && !isJumping) {
            this.player.setVelocityY(-200)
            this.player.anims.play('right', true);
            isJumping = true
            this.time.delayedCall(400, ()=> {
                this.player.setVelocityY(200)
                isJumping = false
            })
        }

        if((this.cursor.left.isDown && this.cursor.up.isDown) || (this.cursor.right.isDown && this.cursor.up.isDown)){
            this.player.setVelocityY(-500)
        } 
        if(!this.cursor.left.isDown && !this.cursor.right.isDown && !this.cursor.up.isDown){
            this.player.anims.play('turn', true)
        }

        //Game Stop
        if(this.score >= 1) {
            this.physics.pause()
            this.add.text(300, 300, 'You Win!!', {
                fontSize: '48px',
                // @ts-ignore
                fill:'yellow'
            })
            this.scene.start('adventure-man-scene2')
        }
    }

    createGround(){
        this.ground = this.physics.add.staticGroup({
            key: 'ground',
            frame: 1,
            repeat: 26,
            setXY:{ x: 15, y:580, stepX: 30}
        })
    }

    createPlayer(){
        this.player = this.physics.add.sprite(250, 550, 'knight-idle')

        this.player.setCollideWorldBounds(true)
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
                {start:0, end:4}),
            frameRate: 10,
            repeat: -1
        })

    }

    createPlatform(){
        this.platform2 = this.physics.add.staticGroup({
            key: 'platform2',
            frame: 54,
            repeat: 12,
            setXY:{ x: 500, y:500, stepX: 30}
        })

        this.platform3 = this.physics.add.staticGroup({
            key: 'platform3',
            frame: 54,
            repeat: 12,
            setXY:{ x: 0, y:400, stepX: 30}
        })

        this.platform4 = this.physics.add.staticGroup({
            key: 'platform4',
            frame: 54,
            repeat: 15,
            setXY:{ x: 500, y:300, stepX: 30}
        })

        this.platform5 = this.physics.add.staticGroup({
            key: 'platform5',
            frame: 54,
            repeat: 12,
            setXY:{ x: 0, y:200, stepX: 30}
        })
    }

    platformCollider(){
        this.physics.add.collider(this.player,this.ground)

        this.physics.add.collider(this.player, this.platform2)

        this.physics.add.collider(this.player, this.platform3)

        this.physics.add.collider(this.player, this.platform4)

        this.physics.add.collider(this.player, this.platform5)
    }
    
    
    // @ts-ignore
    saveMalabulu(player, malabulu){
        malabulu.destroy()

        this.score += 1;
        this.scoreText.setText('score : '+this.score);
    }

    
    // @ts-ignore
    gameOver(player, Barrel){
        this.physics.pause()
        this.scene.start('over-scene')
    }

    
    // @ts-ignore
    gameOver2(player, Barrel2){
        this.physics.pause()
        this.scene.start('over-scene')
    }

    //step delay
    stepDelay(delay){
        if (!this.stepSound.isPlaying){
            setTimeout(()=>{
                this.stepSound.play()
            }, delay)
        }
    }
}