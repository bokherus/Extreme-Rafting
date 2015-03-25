var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocity = 0;
        this.rotation = 0;
    },
    
    update: function() {
        var pos = this.getPosition();
        
        if ( this.velocity < -0.2 )
            this.setPosition( new cc.Point( pos.x, pos.y + River.current ) );
        else {
            this.setPosition( new cc.Point( pos.x, pos.y + this.velocity ) );
            this.velocity += River.friction;
        }
    },
    
    move: function() {
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x, pos.y + this.velocity ) );
        this.velocity += Raft.Acceleration;
    },
    
    rotateLeft: function( ) {
         this.rotation -= Raft.TurningAngle;
         this.setRotation( this.rotation );
    },
    
    rotateRight: function() {
        this.rotation += Raft.TurningAngle;
        this.setRotation( this.rotation );
         
    },
    
});
                         
Raft.Acceleration = 0.06;
Raft.TurningAngle = 4;