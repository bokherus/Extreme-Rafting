var HUD = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/HUD.png' );
        this.setPosition( SCREEN_WIDTH/2, 575 );
    },
});
