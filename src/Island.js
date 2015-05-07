var Island = Obstacle.extend({
    ctor: function(){
        this._super();
        this.initWithFile( 'res/images/Island.png' );
        this.setAnchorPoint( 0.5, 1 );
        this.speed = 0;
    },
    
    hit: function( raft ){
        var raftPos = raft.getPosition();
        var pos = this.getPosition();
        
        return checkRaftIslandCollision( raftPos.x, raftPos.y, pos.x, pos.y );
    },
    
    randomRespawn: function() {
        var pos = this.getPosition();
        var randomX = 250 + Math.random() * 350;
        var randomY = 300 + Math.random() * 200
        this.setPosition( new cc.Point( randomX , SCREEN_HEIGHT + randomY ) );
    },
    
});
Island.WIDTH = 130;
Island.HEIGHT = 120;
