var Wave2 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Wave2.png' );
    },
    
    update: function() {
        var pos = this.getPosition();
        if ( pos.y <= 0 )
            this.setPosition( new cc.Point( this.x, SCREEN_HEIGHT ) );
        else
            this.setPosition( new cc.Point( pos.x, pos.y + Wave.speed ) );
    }
});
