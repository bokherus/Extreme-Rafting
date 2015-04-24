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