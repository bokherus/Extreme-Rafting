var Enemy = cc.Sprite.extend({
    
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.relativeSpeed = 0;
    },
    
    update: function() {
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x, pos.y + Enemy.speed - this.relativeSpeed ) );
    },
    
    setRelativeSpeed: function( speed ) {
        this.relativeSpeed = speed;
    },

});
                         
Enemy.speed = 4;