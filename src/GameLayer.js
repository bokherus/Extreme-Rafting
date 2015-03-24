var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 138, 104, 63, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        
        // this.scheduleUpdate();
        
        this.addKeyboardHandlers();
        
        this.river = new River();
        this.river.setPosition( new cc.Point( 400, 300 ) );
        this.addChild( this.river );
 
        this.wave = new Wave();
        this.wave.scheduleUpdate();
        this.wave.setPosition( new cc.Point( 400, 100 ) );
        this.addChild( this.wave );
        
        this.raft = new Raft();
        this.raft.setPosition( new cc.Point( 400, 300 ) );
        this.raft.scheduleUpdate();
        this.addChild( this.raft );
 
        return true;
    },
    
    update: function() {
        // Check Wave and Raft Collision
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
        console.log( keyCode );
        if ( keyCode == cc.KEY.up )
             this.raft.move();
    },

    onKeyUp: function( keyCode, event ) {
        this.raft.resetSpeed();
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