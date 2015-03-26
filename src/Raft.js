var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocityX = 0;
        this.velocityY = 0;
        this.rotation = 90;
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
        
        if ( this.velocityY < 0 ) {
            pos.y += River.current;
            this.deaccelerateX();
            
        }

        else if ( !this.moving ) {
            this.deaccelerateX();
            this.deaccelerateY();
        }
        
        //this.setPosition( new cc.Point( pos.x + this.velocityX , pos.y + this.velocityY ) );
    },
    
    deaccelerateX: function() {
         if ( this.velocityX > 0 )
                this.velocityX -= River.friction;
         else if ( this.velocityX < 0 )
                this.velocityX += River.friction;
    },
    
    deaccelerateY: function() {
         if ( this.velocityY > 0 )
                this.velocityY -= River.friction;
         else if ( this.velocityY < 0 )
                this.velocityY += River.friction;
    },
        
    
    accelerate: function() {
        if ( this.velocityX <= 2 && this.velocityX >= -2 ) // Speed Limit
            this.velocityX -= (Raft.Acceleration *  Math.cos( this.rotation * Math.PI/180) );
        
        if ( this.velocityY <= 2 && this.velocityY >= -2 ) // Speed Limit
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
                         
Raft.Acceleration = 0.02;
Raft.TurningAngle = 0.75;