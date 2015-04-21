var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocityX = 0;
        this.velocityY = 1;
        this.rotation = 0;
        this.distance = 0;
        this.accelerating = false;
        this.turningLeft = false;
        this.turningRight = false;
    },
    
    update: function() {
        var pos = this.getPosition();
        
        if ( this.accelerating )
            this.accelerate();
        
        else this.deaccelerateY();
        
        if ( this.turningLeft )
            this.rotateLeft();
        
        else if ( this.turningRight )
            this.rotateRight();

        else {
            this.deaccelerateX();
        }
        
        this.distance += this.velocityY;

        this.setPosition( new cc.Point( pos.x + this.velocityX , pos.y ) );
    },
    
    deaccelerateX: function() {
         if ( this.velocityX > 0 )
                this.velocityX -= River.friction;
         else if ( this.velocityX < 0 )
                this.velocityX += River.friction;
        
        if ( this.rotation == 0 );
        
        else if ( this.rotation > 0 ) this.rotation -= Raft.TurningAngle;
        
        else this.rotation += Raft.TurningAngle;
    },
    
    deaccelerateY: function() {
         if ( this.velocityY > 1 )
                this.velocityY -= River.friction;

    },
        
    accelerate: function() {
        if ( this.velocityY <= 8 )
            this.velocityY += Raft.Acceleration;
    },
    
    rotateLeft: function( ) {
        if ( this.rotation > - 60 )
            this.rotation -= Raft.TurningAngle;
        
         this.velocityX = -1 * Raft.TurningSpeed;
         this.setRotation( this.rotation % 360 );
    },
    
    rotateRight: function() {
        if ( this.rotation < 60 )
            this.rotation += Raft.TurningAngle;
        
        this.velocityX = Raft.TurningSpeed;
        this.setRotation( this.rotation % 360 );
    },
    
});
                         
Raft.Acceleration = 0.025;
Raft.TurningAngle = 1.5;
Raft.TurningSpeed = 1.5;