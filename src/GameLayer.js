var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 138, 104, 63, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        this.scheduleUpdate();
        
        this.addKeyboardHandlers();
        
        this.river = new River();
        this.river.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.river );
 
        this.wave = new Wave();
        this.wave2 = new Wave2();
        this.wave3 = new Wave();
        this.wave4 = new Wave2();
        this.wave.scheduleUpdate();
        this.wave2.scheduleUpdate();
        this.wave3.scheduleUpdate();
        this.wave4.scheduleUpdate();
        this.wave.setPosition( new cc.Point( 400, 300 ) );
        this.wave2.setPosition( new cc.Point( 400, 150 ) );
        this.wave3.setPosition( new cc.Point( 400, 0 ) );
        this.wave4.setPosition( new cc.Point( 400, 450 ) );
        this.addChild( this.wave );
        this.addChild( this.wave2 );
        this.addChild( this.wave3 );
        this.addChild( this.wave4 );
        
        this.rock = new Rock();
        this.rock.scheduleUpdate();
        this.rock.setPosition( new cc.Point( 200, 300 ) );
        this.addChild( this.rock );
        
        this.raft = new Raft();
        this.raft.setPosition( new cc.Point( 400, 100 ) );
        this.raft.scheduleUpdate();
        
        this.addChild( this.raft );
 
        return true;
    },
    
    update: function() {
        // Check Wave and Raft Collision
        // If wave hit raft then raft speed is reduced
        
        // Check Obstacle and Raft Colllision
        
        this.rock.setSpeed(this.raft.velocityY);
        this.wave.setSpeed(this.raft.velocityY);
        this.wave2.setSpeed(this.raft.velocityY);
        this.wave3.setSpeed(this.raft.velocityY);
        this.wave4.setSpeed(this.raft.velocityY);
        
        
        
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
        
    },

    onKeyUp: function( keyCode, event ) {
        if ( keyCode == cc.KEY.up )
             this.raft.accelerating = false;
        
        if ( keyCode == cc.KEY.left )
             this.raft.turningLeft = false;
        
        if ( keyCode == cc.KEY.right )
            this.raft.turningRight = false;
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