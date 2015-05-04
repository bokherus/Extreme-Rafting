var ConditionBar = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/ConditionBar.png' );
        this.setPosition( 665, 575 );
    },
    
    repositionX: function( condition ) {
        var pos = this.getPosition();
        condition = 100 - condition;
        this.setPosition( new cc.Point( 665 - condition, pos.y ) );
    }
});
