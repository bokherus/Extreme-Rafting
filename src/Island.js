var Island = Obstacle.extend({
    ctor: function(){
        this._super();
        this.initWithFile( 'res/images/Island.png' );
        this.setAnchorPoint( 0.5, 1 );
        this.speed = 0;
    },
    
});
