var Background = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/MainMenu.png' );
    },

});

var MainMenu = cc.LayerColor.extend({
  init: function() {
    this.createBackground();
    this.createPlayButton();
    cc.audioEngine.playMusic( 'res/effects/BGM.mp3' );
    this.credit = cc.LabelTTF.create( 'Sounds from: http://www.freesfx.co.uk', 'Ariel', 18 );
    this.credit.setPosition( new cc.Point( 150, 40 ) );
	    this.addChild( this.credit );
     
    return true;
  },

  createBackground : function() {
    this.background = new Background();
    this.background.setPosition( new cc.Point( SCREEN_WIDTH/2 , SCREEN_HEIGHT/2  ) );
    this.addChild( this.background );
  },
    
  createPlayButton:function(){
    this.playButtonItem = new cc.MenuItemImage(
      'res/images/PlayButton.png',
      'res/images/PlayButtonClicked.png',
      function () {
        cc.audioEngine.stopMusic( 'res/effects/BGM.mp3' );
        cc.director.runScene( new StartScene() );
      }, this);
    this.playButton = new cc.Menu( this.playButtonItem );
    this.playButton.setPosition( SCREEN_WIDTH/2, (SCREEN_HEIGHT/2) - 200 );
    this.addChild( this.playButton );
  },


});

var StartGameMenu = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new MainMenu();
    layer.init();
    this.addChild( layer );
  }
});