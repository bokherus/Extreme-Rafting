var checkRaftObstacleCollision = function( raftX, raftY, obstacleX, obstacleY ) {
    
    if ( ( raftX + Raft.WIDTH >= obstacleX - Obstacle.WIDTH && raftX - Raft.WIDTH <= obstacleX + Obstacle.WIDTH ) 
    &&   ( raftY + Raft.HEIGHT >= obstacleY + Obstacle.HEIGHT && raftY - Raft.HEIGHT <= obstacleY - Obstacle.HEIGHT ) )
        return true;
    return false;
};

var checkRaftBulletCollision = function( raftX, raftY, bulletX, bulletY ) {
   if ( ( raftX + Raft.WIDTH >= bulletX - Bullet.WIDTH && raftX - Raft.WIDTH <= bulletX + Bullet.WIDTH ) 
    &&   ( raftY + Raft.HEIGHT >= bulletY + Bullet.HEIGHT && raftY - Raft.HEIGHT <= bulletY - Bullet.HEIGHT ) )
        return true;
    return false;
};

var checkRaftIslandCollision = function( raftX, raftY, islandX, islandY ) {
    if ( ( raftX + Raft.WIDTH >= islandX - Island.WIDTH && raftX - Raft.WIDTH <= islandX + Island.WIDTH ) 
    &&   ( raftY + Raft.HEIGHT >= islandY + Island.HEIGHT && raftY - Raft.HEIGHT <= islandY - Island.HEIGHT ) )
        return true;
    return false;
};