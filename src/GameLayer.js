var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 138, 104, 63, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.scheduleUpdate();
        this.addKeyboardHandlers();

        this.arrBullet = [];
        this.arrObstacle = [];
        this.arrTree = [];
        
        this.createRiver();
        this.createHeart();
        this.createObstacles();       
        this.createRaft();        
        this.createIsland();      
        this.createTrees();
        this.createPlane();
                
        this.hud = new HUD();
        this.addChild( this.hud );
        
        this.createLabel();

        
        cc.audioEngine.playMusic( 'res/effects/BGM.mp3', true );
        cc.audioEngine.setEffectsVolume( 0.5 );
        cc.audioEngine.playEffect( 'res/effects/WaterStream.mp3', true );
        
        return true;
    },
    
    createHeart: function(){
        this.heart = new Heart();
        this.heart.scheduleUpdate();
        this.addChild( this.heart );
    },
    
    createRiver: function(){
        this.river = new River();
        this.river.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.river );
    },
    
    createLabel: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Times New Roman', 18 );
	    this.scoreLabel.setPosition( new cc.Point( 170, 575 ) );
	    this.addChild( this.scoreLabel );
        
        this.speedLabel = cc.LabelTTF.create( '0', 'Times New Roman', 18 );
	    this.speedLabel.setPosition( new cc.Point( 380, 575 ) );
	    this.addChild( this.speedLabel );
        
        this.conditionLabel = cc.LabelTTF.create( '0', 'Times New Roman', 18 );
	    this.conditionLabel.setPosition( new cc.Point( 600, 575 ) );
	    this.addChild( this.conditionLabel );
    },
    
    createPlane: function(){
        this.plane = new Plane();
        this.plane.spawn();
        this.plane.scheduleUpdate();
        this.addChild( this.plane );
        
    },
    
    createRaft: function(){
        this.raft = new Raft();
        this.raft.setPosition( new cc.Point( 400, 150 ) );
        this.raft.scheduleUpdate();
        this.addChild( this.raft );
    },
    
    createIsland: function(){
        this.island = new Island();
        this.island.scheduleUpdate();
        this.addChild( this.island );
    },
    
    createObstacles: function(){
        for ( var i = 0 ; i < 4 ; i++ ){
            var rock;
            if ( i < 2 )
                rock = new Obstacle();
            else
                rock = new LargeRock();
            
            rock.scheduleUpdate();
            rock.randomRespawn();
            this.arrObstacle.push( rock );
            this.addChild( rock );
        }
        
    },
    
    createTrees: function(){
        var randomNum;
        for ( var i = 0 ; i < 8 ; i++ ) {
            randomNum = Math.random() * 30;
            var tree = new Tree();
            tree.scheduleUpdate();
            tree.setPosition( new cc.Point( randomNum, 110 * i ) );
            this.arrTree.push( tree );
            this.addChild( tree );
        }
        for ( var i = 0 ; i < 8 ; i++ ) {
            randomNum = 780 + Math.random() * 50;
            var tree = new Tree();
            tree.scheduleUpdate();
            tree.setPosition( new cc.Point( randomNum, 110 * i ) );
            this.arrTree.push( tree );
            this.addChild( tree );
        }  
    },
    
    update: function() {
        
        this.checkBullet();

        if ( this.heart.hit( this.raft ) ) {
            this.raft.recover( 25 );
            cc.audioEngine.playEffect( 'res/effects/Pickup.mp3' );
            this.heart.remove();
        }
        
        if ( this.island.hit( this.raft ) ) {
            this.raft.receiveDamage( 5 );
            console.log("HIT");
        }
        
        if ( this.raft.condition == 0 ) 
            this.endGame();
        
        this.setSpeedRelativeToRaft();
        this.addEvents();
        this.updateLabel();
        this.updateObstacle();
        this.updateTree();   
    },
    
    setSpeedRelativeToRaft: function(){
        this.island.setSpeed( this.raft.velocity );
        this.plane.setSpeed( this.raft.velocity );
        this.heart.setSpeed( this.raft.velocity );
    },
    
    updateObstacle: function(){
        for ( var i = 0 ; i < this.arrObstacle.length ; i++ ) {
            this.arrObstacle[i].setSpeed( this.raft.velocity );
            
            if ( this.arrObstacle[i].hit( this.raft ) ) {
                this.raft.receiveDamage( this.arrObstacle[i].damage );
                cc.audioEngine.setEffectsVolume(0.7);
                cc.audioEngine.playEffect( 'res/effects/Impact.mp3' );
                this.arrObstacle[i].randomRespawn();
            }
        }
    },
    
    updateTree: function() {
        for ( var i = 0 ; i < this.arrTree.length ; i++ ) {
            this.arrTree[i].setSpeed( this.raft.velocity );
            
            if ( this.arrTree[i].hit( this.raft ) ) {
                console.log("HIT!");
                this.raft.receiveDamage( 3 );
            }
        }
    },
    
    updateLabel: function() {
        var distance = Math.floor( this.raft.distance / 10 );
        var speed = parseFloat( Math.round( this.raft.velocity * 100 ) / 100 ).toFixed(2);

        this.scoreLabel.setString( distance + 'm' );
        this.speedLabel.setString( speed + 'm/s' );
        this.conditionLabel.setString( this.raft.condition +'%' );
    },
    
    addEvents: function() {
        var distance = Math.floor( this.raft.distance / 10 );
        
        if ( distance % 400 == 0 ){
            console.log("Adding heart");
            this.heart.randomRespawn();
            cc.audioEngine.playEffect( 'res/effects/Splash.mp3' );
        }
         
        if ( distance % 800 == 0 ) {
            console.log("Spawning Plane");
            cc.audioEngine.playEffect( 'res/effects/FlyingPlane.mp3' );
            this.plane.spawn();
        }
        
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
    
    bulletHit: function( index ) {
        var pos = this.arrBullet[ index ].getPosition();
        var raftPos = this.raft.getPosition();
        if ( checkRaftBulletCollision( raftPos.x, raftPos.y, pos.x, pos.y ) && this.arrBullet[ index ].hit == true ){
            this.arrBullet[ index ].hit = false;
            cc.audioEngine.playEffect( 'res/effects/GunShot.mp3' );
            this.raft.receiveDamage( 2 );
            console.log("hit");
        }
    },
    
    checkBullet: function() {
        for ( var i = 0 ; i < this.arrBullet.length ; i++ ) {
            this.bulletHit( i );
            this.removeBulletOutOfBounds( this.arrBullet[i] , i );
        }
    },
    
    endGame: function() {
        for ( var i = 0 ; i < this.arrObstacle.length ; i++ ) {
            this.arrObstacle[i].unscheduleUpdate();
        }
        
        for ( var i = 0 ; i < this.arrTree.length ; i++ ) {
            this.arrTree[i].unscheduleUpdate();
        }
        cc.audioEngine.stopMusic( 'res/effects/BGM.mp3' );
        this.raft.velocityY = 0;
        this.speedLabel.setString( '0.00 m/s' );
        this.raft.unscheduleUpdate();
        this.island.unscheduleUpdate();
        this.heart.unscheduleUpdate();
        this.unscheduleUpdate();
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
