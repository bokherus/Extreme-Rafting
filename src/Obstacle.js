var Obstacle = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Rock.png' );
        this.setAnchorPoint( 0.5, 1 );
        this.speed = 0;
        this.damage = 20;
    },
    
    update: function() {
        var pos = this.getPosition();
        if ( pos.y <= 0 ){
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
        var randomX = 100 + Math.random() * 600;
        var randomY = 300 + Math.random() * 200
        this.setPosition( new cc.Point( randomX , SCREEN_HEIGHT + randomY ) );
    },
    
    hit: function( raft ) {
        var raftPos = raft.getPosition();
        var pos = this.getPosition();
        
        return checkRaftObstacleCollision( raftPos.x, raftPos.y, pos.x, pos.y );
    }
});
Obstacle.WIDTH = 30;
Obstacle.HEIGHT = 30;