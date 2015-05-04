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
    }
    
});
Island.WIDTH = 260;
Island.HEIGHT = 240;
