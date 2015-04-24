var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 138, 104, 63, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.scheduleUpdate();
        this.addKeyboardHandlers();
        
        this.arrBullet = [];
        
        this.river = new River();
        this.river.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.river );

        //this.createWave();
        
        this.enemy = new Enemy( this );
        this.enemy.setPosition( new cc.Point( 400, 0 ) );
        this.enemy.scheduleUpdate();
        this.addChild( this.enemy );
        
        this.heart = new Heart();
        this.heart.setPosition( new cc.Point( 300, 300 ) );
        this.heart.scheduleUpdate();
        this.addChild( this.heart );
        
        this.rock = new Obstacle();
        this.rock.scheduleUpdate();
        this.rock.setPosition( new cc.Point( 200, 300 ) );
        this.addChild( this.rock );
        
        this.rock2 = new Obstacle();
        this.rock2.scheduleUpdate();
        this.rock2.setPosition( new cc.Point( 600, 300 ) );
        this.addChild( this.rock2 );
        
        this.scoreLabel = cc.LabelTTF.create( '0', 'Times New Roman', 18 );
	    this.scoreLabel.setPosition( new cc.Point( 600, 550 ) );
	    this.addChild( this.scoreLabel );
        
        this.speedLabel = cc.LabelTTF.create( '0', 'Times New Roman', 18 );
	    this.speedLabel.setPosition( new cc.Point( 600, 510 ) );
	    this.addChild( this.speedLabel );
        
        this.conditionLabel = cc.LabelTTF.create( '0', 'Times New Roman', 18 );
	    this.conditionLabel.setPosition( new cc.Point( 600, 470 ) );
	    this.addChild( this.conditionLabel );
        
        this.raft = new Raft();
        this.raft.setPosition( new cc.Point( 400, 200 ) );
        this.raft.scheduleUpdate();
        this.addChild( this.raft );
        
        cc.audioEngine.playMusic( 'res/effects/BGM.mp3', true );
        cc.audioEngine.setEffectsVolume( 0.5 );
        cc.audioEngine.playEffect( 'res/effects/WaterStream.mp3', true );
        
        return true;
    },
    

    createWave: function(){
        
        this.wave = new Wave();
        this.wave2 = new Wave();
        this.wave3 = new Wave();
        this.wave4 = new Wave();
        this.wave.scheduleUpdate();
        this.wave2.scheduleUpdate();
        this.wave3.scheduleUpdate();
        this.wave4.scheduleUpdate();
        this.wave.setPosition( new cc.Point( 400, 500 ) );
        this.wave2.setPosition( new cc.Point( 400, 300 ) );
        this.wave3.setPosition( new cc.Point( 400, 100 ) );
        this.wave4.setPosition( new cc.Point( 400, 0 ) );
        this.addChild( this.wave );
        this.addChild( this.wave2 );
        this.addChild( this.wave3 );
        this.addChild( this.wave4 );
    },
    
    update: function() {
        // Check Wave and Raft Collision
        // If wave hit raft then raft speed is reduced
        this.checkBullet();
        
        
        // Check Obstacle and Raft Colllision
        if ( this.rock.hit( this.raft ) ) {
            console.log("HIT!");
            this.raft.receiveDamage( 10 );
            cc.audioEngine.setEffectsVolume(0.7);
            cc.audioEngine.playEffect( 'res/effects/crash.wav' );
            this.rock.randomRespawn();
        }
        
        if ( this.heart.hit( this.raft ) ) {
            console.log("HEAL");
            this.raft.recover( 10 );
            this.heart.randomRespawn();
        }
            
       
        
        var distance = Math.floor( this.raft.distance / 10 );
        var speed = parseFloat( Math.round( this.raft.velocityY * 100 ) / 100 ).toFixed(2);

        this.scoreLabel.setString( 'Distance: '+ distance + 'm' );
        this.speedLabel.setString( 'Speed: ' + speed + 'm/s' );
        this.conditionLabel.setString( 'Condition: ' + this.raft.condition +'%' );
        this.rock.setSpeed( this.raft.velocityY );
        this.rock2.setSpeed( this.raft.velocityY );
        this.heart.setSpeed( this.raft.velocityY );
//        this.wave.setSpeed( this.raft.velocityY );
//        this.wave2.setSpeed( this.raft.velocityY );
//        this.wave3.setSpeed( this.raft.velocityY );
//        this.wave4.setSpeed( this.raft.velocityY );
        this.enemy.setRelativeSpeed( this.raft.velocityY );
    },
    
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },

    onKeyDown: function( keyCode, event ) { 
        if ( keyCode == cc.KEY.up )
             this.raft.accelerating = true;
        
        if ( keyCode == cc.KEY.left )
             this.raft.turningLeft = true;
        
        if ( keyCode == cc.KEY.right )
            this.raft.turningRight = true;
        
        if ( keyCode == cc.KEY.space )
            this.enemy.shoot( this.raft, this );
        
    },

    onKeyUp: function( keyCode, event ) {
        if ( keyCode == cc.KEY.up )
             this.raft.accelerating = false;
        
        if ( keyCode == cc.KEY.left )
             this.raft.turningLeft = false;
        
        if ( keyCode == cc.KEY.right )
            this.raft.turningRight = false;
    },
    
    removeBulletOutOfBounds: function( bullet, i ) {
        var pos = bullet.getPosition();
        if ( pos.x < 0 || pos.x > SCREEN_WIDTH || pos.y < 0 || pos.y > SCREEN_HEIGHT ) {
            console.log( "Removing bullet" );
            this.arrBullet.splice( i, 1 );
        }
    },
    
    bulletHit: function( index ){
        var pos = this.arrBullet[ index ].getPosition();
        var raftPos = this.raft.getPosition();
        if ( checkRaftBulletCollision( raftPos.x, raftPos.y, pos.x, pos.y ) )
            console.log("hit");
    },
    
    checkBullet: function() {
        
        for ( var i = 0 ; i < this.arrBullet.length ; i++ ) {
            this.bulletHit( i );
           // this.removeBulletOutOfBounds( this.arrBullet[i] , i );
        }
    }

});
 
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});