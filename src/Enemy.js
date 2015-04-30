var Enemy = cc.Sprite.extend({
    
    ctor: function( gameLayer ) {
        this._super();
        this.initWithFile( 'res/images/Raft.png' );
        this.relativeSpeed = 0;
        this.gameLayer = gameLayer;
    },
    
    update: function() {
        var pos = this.getPosition();
        this.setPosition( new cc.Point( pos.x, pos.y + Enemy.speed - this.relativeSpeed ) );
    },
    
    setRelativeSpeed: function( speed ) {
        this.relativeSpeed = speed;
    },
    
    shoot: function( raft, gamelayer ) {
        var bullet = new Bullet();
        var pos = this.getPosition();
        var targetPos = raft.getPosition();
        bullet.setPosition( pos.x, pos.y );
        bullet.setDestination( targetPos.x, targetPos.y );
        this.gameLayer.addChild( bullet );
        this.gameLayer.arrBullet.push( bullet );
        bullet.scheduleUpdate();
    },
    
    inBounds: function(){
        var pos = this.getPosition();
        return ( pos.x > 0 && pos.x < SCREEN_WIDTH && pos.y > 0 && pos.y < SCREEN_HEIGHT )
    }

});
                         
Enemy.speed = 4;