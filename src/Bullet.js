var Bullet = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
        this.velocityX = 0;
        this.velocityY = 0;
    },

    update: function( ) {
        var pos = this.getPosition();
        this.setPosition( pos.x + this.velocityX, pos.y + this.velocityY );
    },
    
    setDestination: function( destinationX, destinationY ) {
        var pos = this.getPosition();
        var x = destinationX - pos.x;
        var y = destinationY - pos.y;
        
        this.setRotation( Math.atan( y/x ) * 180 / Math.PI );
    
        x = x/90;
        y = y/90;

        this.velocityX = x;
        this.velocityY = y;
    }
});
    