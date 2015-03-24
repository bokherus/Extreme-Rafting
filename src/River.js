var River = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/River.png' );
    }
});

River.wave = -0.2;