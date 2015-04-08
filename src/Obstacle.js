var Obstacle = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Rock.png' );
        this.setAnchorPoint( new cc.Point( 0.5, 1 ) );
        this.speed = 0;
    },
    
    update: function() {
        var pos = this.getPosition();
        if ( pos.y <= 0 ){
            this.setPosition( new cc.Point( this.x, SCREEN_HEIGHT + 100 ) );
            this.randomRespawn();
        }
        else
            this.setPosition( new cc.Point( pos.x, pos.y - this.speed ) );
    },
    
    setSpeed: function( speed ) {
        this.speed = speed;
    },
    
    randomRespawn: function() {
        var pos = this.getPosition();
        var randomNum = 250 + Math.random()* 350;
        this.setPosition( new cc.Point( randomNum , pos.y ) );
    }
});
