var River = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/River.png' );
    }
});

River.current = -0.24;
River.friction = 0.01;