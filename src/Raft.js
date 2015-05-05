var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocity = 1;
        this.velocityX = 0;
        this.velocityY = 1;
        this.rotation = 0;
        this.distance = 10;
        this.accelerating = false;
        this.turningLeft = false;
        this.turningRight = false;
        this.condition = 100;
    },
    
    update: function() {
        var pos = this.getPosition();
        
        if ( pos.x > 0 && pos.x < SCREEN_WIDTH ){
            this.updateRaftVelocity();
            this.distance += this.velocityY;
            this.setPosition( new cc.Point( pos.x + this.velocityX , pos.y ) );
        }
        else {
            if ( pos.x <= 0 )
                this.setPosition( new cc.Point( pos.x + 10, pos.y ) );
            else
                this.setPosition( new cc.Point( pos.x - 10, pos.y ) );
        }
    },
    
    updateRaftVelocity: function(){
        if ( this.accelerating )
                this.accelerate();  
            else 
                this.deaccelerateY();
        
            if ( this.turningLeft )
                this.rotateLeft();
            else if ( this.turningRight )
                this.rotateRight();
            else 
                this.deaccelerateX();
            
        this.velocityX = -1* this.velocity * Math.cos( (this.rotation + 90) * Math.PI / 180 );
        this.velocityY = this.velocity * Math.sin( (this.rotation + 90) * Math.PI / 180 );
    },

    receiveDamage: function( damage ) {
        this.condition -= damage;
        if ( this.condition < 0 ) this.condition = 0;
    },
    
    recover: function( amount ) {
        this.condition += amount;
        if ( this.condition > 100 ) this.condition = 100;
    },
    
    deaccelerateX: function() {
         if ( this.velocityX > 0 )
                this.velocityX -= River.friction;
         else if ( this.velocityX < 0 )
                this.velocityX += River.friction;
        
        if ( this.rotation == 0 );
        
        else if ( this.rotation > 0 ) this.rotation -= Raft.TurningAngle / 1.5;
        
        else this.rotation += Raft.TurningAngle / 1.5;
    },
    
    deaccelerateY: function() {
         if ( this.velocity > 1 )
                this.velocity -= River.friction;

    },
        
    accelerate: function() {
        if ( this.velocity <= 8 )
            this.velocity += Raft.Acceleration;
  
    },
    
    rotateLeft: function( ) {
        if( this.rotation > -90 )
            this.rotation -= Raft.TurningAngle;
        
         this.setRotation( this.rotation % 360 );
    },
    
    rotateRight: function() {
        if ( this.rotation < 90 )
            this.rotation += Raft.TurningAngle;
        
        this.setRotation( this.rotation % 360 );
    },
    
});
                         
Raft.Acceleration = 0.04;
Raft.TurningAngle = 1.75;
Raft.WIDTH = 25;
Raft.HEIGHT = 40;