var Tree = Obstacle.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Tree.png' );
        this.setAnchorPoint( 0.5, 1 );
    },
    
    update: function() {
        var pos = this.getPosition();
        if ( pos.y <= 0 ){
            this.setPosition( new cc.Point( pos.x, SCREEN_HEIGHT + 200 ) );
        }
        else
            this.setPosition( new cc.Point( pos.x, pos.y - this.speed ) );
    },

    
});