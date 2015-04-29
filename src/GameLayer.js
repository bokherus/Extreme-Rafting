var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 138, 104, 63, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.scheduleUpdate();
        this.addKeyboardHandlers();
        
        this.arrBullet = [];
        this.arrObstacle = [];
        
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
        
        this.createObstacles();
        
        this.island = new Island();
        this.island.setPosition( new cc.Point( 300, 300 ) );
        this.island.scheduleUpdate();
        this.addChild( this.island );
        
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
        
        this.plane = new Plane();
        this.plane.spawn();
        this.plane.scheduleUpdate();
        this.addChild( this.plane );
        
        this.tree = new Tree();
        this.tree.scheduleUpdate();
        this.addChild( this.tree );
        
        //cc.audioEngine.playMusic( 'res/effects/BGM.mp3', true );
        cc.audioEngine.setEffectsVolume( 0.5 );
        //cc.audioEngine.playEffect( 'res/effects/WaterStream.mp3', true );
        
        return true;
    },
    
    createObstacles: function(){
        for ( var i = 0 ; i < 3 ; i++ ){
            var rock = new Obstacle();
            rock.scheduleUpdate();
            rock.randomRespawn();
            this.arrObstacle.push( rock );
            this.addChild( rock );
        }
        
    },
    

    createWave: function(){
        
//        this.wave = new Wave();
//        this.wave2 = new Wave();
//        this.wave3 = new Wave();
//        this.wave4 = new Wave();
//        this.wave.scheduleUpdate();
//        this.wave2.scheduleUpdate();
//        this.wave3.scheduleUpdate();
//        this.wave4.scheduleUpdate();
//        this.wave.setPosition( new cc.Point( 400, 500 ) );
//        this.wave2.setPosition( new cc.Point( 400, 300 ) );
//        this.wave3.setPosition( new cc.Point( 400, 100 ) );
//        this.wave4.setPosition( new cc.Point( 400, 0 ) );
//        this.addChild( this.wave );
//        this.addChild( this.wave2 );
//        this.addChild( this.wave3 );
//        this.addChild( this.wave4 );
    },
    
    update: function() {
        
        this.checkBullet();

        if ( this.heart.hit( this.raft ) ) {
            console.log("HEAL");
            this.raft.recover( 10 );
            this.heart.remove();
            console.log("removing heart");
        }
        
        this.addEvents();
       
        var distance = Math.floor( this.raft.distance / 10 );
        var speed = parseFloat( Math.round( this.raft.velocityY * 100 ) / 100 ).toFixed(2);

        this.scoreLabel.setString( 'Distance: '+ distance + 'm' );
        this.speedLabel.setString( 'Speed: ' + speed + 'm/s' );
        this.conditionLabel.setString( 'Condition: ' + this.raft.condition +'%' );
        this.island.setSpeed( this.raft.velocityY );
        this.plane.setSpeed( this.raft.velocityY );
        this.tree.setSpeed( this.raft.velocityY );
        for ( var i = 0 ; i < this.arrObstacle.length ; i++ ){
            this.arrObstacle[i].setSpeed( this.raft.velocityY );
            
            if ( this.arrObstacle[i].hit( this.raft ) ) {
                console.log("HIT!");
                this.raft.receiveDamage( 10 );
                //cc.audioEngine.setEffectsVolume(0.7);
                //cc.audioEngine.playEffect( 'res/effects/crash.wav' );
                this.arrObstacle[i].randomRespawn();
            }
        }

        this.heart.setSpeed( this.raft.velocityY );
        this.enemy.setRelativeSpeed( this.raft.velocityY );
    },
    
    addEvents: function() {
        var distance = Math.floor( this.raft.distance / 10 );
        
        if ( distance % 400 == 0 ){
            console.log("Adding heart");
            this.heart.randomRespawn();
        }
        
//        if ( distance % 10 == 0 )
//            this.enemy.shoot( this.raft, this );
        
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
            this.removeChild( this.arrBullet[ i ] );
            this.arrBullet.splice( i, 1 );
        }
    },
    
    bulletHit: function( index ){
        var pos = this.arrBullet[ index ].getPosition();
        var raftPos = this.raft.getPosition();
        if ( checkRaftBulletCollision( raftPos.x, raftPos.y, pos.x, pos.y ) && this.arrBullet[ index ].hit == true ){
            this.arrBullet[ index ].hit = false;
            this.raft.receiveDamage( 2 );
            console.log("hit");
        }
    },
    
    checkBullet: function() {
        for ( var i = 0 ; i < this.arrBullet.length ; i++ ) {
            this.bulletHit( i );
            this.removeBulletOutOfBounds( this.arrBullet[i] , i );
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
