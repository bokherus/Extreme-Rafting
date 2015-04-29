var Plane = Obstacle.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Plane.png' );
    },

    update: function() {
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x + 1.5, pos.y - this.speed) );
    },
    
    spawn: function() {
        this.setPosition( new cc.Point( 0 , SCREEN_HEIGHT + 400 ) );
        cc.audioEngine.playEffect( 'res/effects/FlyingPlane.wav' );
    },

    
});