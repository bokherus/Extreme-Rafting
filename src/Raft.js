var Raft = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.velocity = Raft.Velocity;
    },
    
    update: function() {
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x, pos.y + River.wave ) ); 
    },
    
    move: function() {
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x, pos.y + this.velocity ) );
        this.velocity += Raft.Acceleration;
    },
    
    resetSpeed: function() {
        this.velocity = Raft.Velocity;
    }
});
                         
Raft.Acceleration = 0.05;
Raft.Velocity = 0.5;