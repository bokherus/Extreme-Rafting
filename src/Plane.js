var Plane = Obstacle.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Plane.png' );
    },

    update: function() {
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x + 2.5, pos.y - 3 ) );
    },
    
    spawn: function() {
        this.setPosition( new cc.Point( - 500 , SCREEN_HEIGHT + 600 ) );
    },

    
});