var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocity = 1;
        this.velocityX = 0;
        this.velocityY = 1;
        this.rotation = 0;
        this.distance = 0;
        this.accelerating = false;
        this.turningLeft = false;
        this.turningRight = false;
        this.condition = 100;
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
        if ( this.rotation > - 80 )
            this.rotation -= Raft.TurningAngle;
        
         this.velocityX = -1 * Raft.TurningSpeed;
         this.setRotation( this.rotation % 360 );
    },
    
    rotateRight: function() {
        if ( this.rotation < 80 )
            this.rotation += Raft.TurningAngle;
        
        this.velocityX = Raft.TurningSpeed;
        this.setRotation( this.rotation % 360 );
    },
    
});
                         
Raft.Acceleration = 0.04;
Raft.TurningAngle = 1.5;
Raft.TurningSpeed = 2.3;
Raft.WIDTH = 25;
Raft.HEIGHT = 40;