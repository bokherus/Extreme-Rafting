var Bullet = cc.Sprite.extend({
    ctor: function( raft ) {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
        this.velocityX = 0;
        this.velocityY = 0;
        this.raft = raft
        this.hit = true;
    },

    update: function( ) {
        var pos = this.getPosition();
        this.setPosition( pos.x + this.velocityX, pos.y + this.velocityY );
    },
    
    setDestination: function( destinationX, destinationY ) {
        var pos = this.getPosition();
        var x = destinationX - pos.x;
        var y = destinationY - pos.y;
        
        this.setRotation( Math.atan2( y, x ) );

        this.velocityX = Bullet.speed * Math.cos( this.getRotation() );
        this.velocityY = Bullet.speed * Math.sin( this.getRotation() );
    }
});
Bullet.speed = 5;
Bullet.WIDTH = 8;
Bullet.HEIGHT = 8;
    