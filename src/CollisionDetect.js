var checkRaftObstacleCollision = function( raftX, raftY, obstacleX, obstacleY ) {
    
    if ((raftX + 25 >= obstacleX - 30 && raftX - 25 <= obstacleX + 30) 
    && (raftY + 40 >= obstacleY + 30 && raftY - 40 <= obstacleY - 30))
        return true;
    return false;
};

var checkRaftBulletCollision = function( raftX, raftY, bulletX, bulletY ) {
    // TODO
};