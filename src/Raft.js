var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocityX = 0;
        this.velocityY = 0;
        this.rotation = 90;
        this.distance = 0;
        this.accelerating = false;
        this.turningLeft = false;
        this.turningRight = false;
    },
    
    update: function() {
        var pos = this.getPosition();
        
        if ( this.accelerating )
            this.accelerate();
        
        if ( this.turningLeft )
            this.rotateLeft();
        
        if ( this.turningRight )
            this.rotateRight();

        else if ( !this.moving ) {
            this.deaccelerateX();
            this.deaccelerateY();
        }
        
        this.distance += this.velocityY;

        this.setPosition( new cc.Point( pos.x + this.velocityX , pos.y) );
    },
    
    deaccelerateX: function() {
         if ( this.velocityX > 0 )
                this.velocityX -= River.friction;
         else if ( this.velocityX < 0 )
                this.velocityX += River.friction;
    },
    
    deaccelerateY: function() {
         if ( this.velocityY > River.current )
                this.velocityY -= River.friction;

    },
        
    accelerate: function() {
        if ( this.velocityX <= 4 && this.velocityX >= -4 ) // Speed Limit
            this.velocityX -= (Raft.Acceleration *  Math.cos( this.rotation * Math.PI/180) );
        
        if ( this.velocityY <= 8 ) // Speed Limit
            this.velocityY += (Raft.Acceleration * Math.sin( this.rotation * Math.PI/180) );
    },
    
    rotateLeft: function( ) {
         this.rotation -= Raft.TurningAngle;
         this.setRotation( this.rotation % 360 );
    },
    
    rotateRight: function() {
        this.rotation += Raft.TurningAngle;
        this.setRotation( this.rotation % 360 );
    },
    
});
                         
Raft.Acceleration = 0.025;
Raft.TurningAngle = 0.75;