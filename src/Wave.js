var Wave = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Wave.png' );
        this.setAnchorPoint( new cc.Point( 0.5, 1 ) );
        this.speed = 0;
    },
    
    update: function() {
        var pos = this.getPosition();
        if ( pos.y <= 0 )
            this.setPosition( new cc.Point( this.x, SCREEN_HEIGHT + 100) );
        else
            this.setPosition( new cc.Point( pos.x, pos.y - this.speed ) );
    },
    
    setSpeed: function( speed ) {
        this.speed = speed;
    }

});

Wave.speed = -1;