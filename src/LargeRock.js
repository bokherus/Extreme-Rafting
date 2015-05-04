var LargeRock = Obstacle.extend({
    ctor: function(){
        this._super();
        this.initWithFile( 'res/images/LargeRock.png' );
        this.damage = 50;
    }
});