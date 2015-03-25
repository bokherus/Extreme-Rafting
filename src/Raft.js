var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocityX = 0;
        this.velocityY = 0;
        this.rotation = 90;
        this.moving = false;
        this.turningLeft = false;
        this.turningRight = false;
    },
    
    update: function() {
        var pos = this.getPosition();
        if ( this.moving )
            this.move();
        if ( this.turningLeft )
            this.rotateLeft();
        
        if ( this.turningRight )
            this.rotateRight();
        
        if ( this.velocityY < -0.02 )
            this.setPosition( new cc.Point( pos.x, pos.y + River.current ) );
        else if ( !this.moving ) {
            this.setPosition( new cc.Point( pos.x, pos.y + this.velocityY ) );
            this.velocityY -= River.friction;
        }
    },
    
    move: function() {
        var pos = this.getPosition();
        
        this.setPosition( new cc.Point( pos.x + this.velocityX , pos.y + this.velocityY ) );
        
        if ( this.velocityY <= 1 )
            this.velocityY += (Raft.Acceleration * Math.sin( (this.rotation % 360) * Math.PI/180) );
        
        if ( this.velocityX <= 1 )
            this.velocityX -= (Raft.Acceleration *  Math.cos( (this.rotation % 360) * Math.PI/180) );
        
        console.log(this.velocityX);
    },
    
    rotateLeft: function( ) {
         this.rotation -= Raft.TurningAngle;
         this.setRotation( this.rotation );
    },
    
    rotateRight: function() {
        this.rotation += Raft.TurningAngle;
        this.setRotation( this.rotation );
         console.log( this.rotation );
    },
    
});
                         
Raft.Acceleration = 0.01;
Raft.TurningAngle = 0.75;