var Rock = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Rock.png' );
        this.speed = 0;
    },
    
    update: function() {
        var pos = this.getPosition();
        if ( pos.y <= 0 )
            this.setPosition( new cc.Point( this.x, SCREEN_HEIGHT ) );
        else
            this.setPosition( new cc.Point( pos.x, pos.y - this.speed ) );
    },
    
    setSpeed: function( speed ) {
        this.speed = speed;
    }
});
