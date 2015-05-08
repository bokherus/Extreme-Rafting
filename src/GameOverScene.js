var EndScene = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Gameover.png' );
    },

});

var GameOverScene = cc.LayerColor.extend({
  init: function() {
    this.createEndScene();
    this.createRestartButton();
    this.createScoreLabel();
    this.scheduleUpdate();
    cc.audioEngine.playMusic( 'res/effects/EndGameTheme.mp3' );
     
    return true;
  },
    
  update: function() {
      this.schedule( this.showTime , 0.5, 1 );
      this.schedule( this.showDistance, 1.0, 1);
      this.schedule( this.showScore, 1.75, 1 );
  },
          
  showScore: function(){
      var score = 1.6 * distance + distance / time;
      this.scoreLabel.setString( Math.ceil(score) );
  },
      
  showDistance: function(){
      this.distanceLabel.setString( distance + 'm' );
  },
    
  showTime: function(){
      this.timeLabel.setString( time + ' sec' );
  },
               
  createScoreLabel: function() {
    this.timeLabel = cc.LabelTTF.create( '', 'Times New Roman', 32 );
    this.timeLabel.setPosition( new cc.Point( 385, 552 ) );
    this.addChild( this.timeLabel );
      
    this.distanceLabel = cc.LabelTTF.create( '', 'Times New Roman', 32 );
    this.distanceLabel.setPosition( new cc.Point( 385, 482 ) );
    this.addChild( this.distanceLabel );
      
    this.scoreLabel = cc.LabelTTF.create( '', 'Times New Roman', 60 );
    this.scoreLabel.setPosition( new cc.Point( 480, 390 ) );
    this.addChild( this.scoreLabel );
  },

  createEndScene: function() {
    this.endScene = new EndScene();
    this.endScene.setPosition( new cc.Point( SCREEN_WIDTH/2 , SCREEN_HEIGHT/2  ) );
    this.addChild( this.endScene );
  },
    
  createRestartButton: function(){
    this.restartButtonItem = new cc.MenuItemImage(
      'res/images/RestartButtonClicked.png',
      'res/images/RestartButton.png',
      function () {
        cc.audioEngine.stopMusic( 'res/effects/EndGameTheme.mp3' );
        cc.audioEngine.playEffect( 'res/effects/click.mp3' );
        distance = 0;
        time = 0;
        cc.director.runScene( new StartScene() );
      }, this);
    this.restartButton = new cc.Menu( this.restartButtonItem );
    this.restartButton.setPosition( SCREEN_WIDTH/2, (SCREEN_HEIGHT/2) - 200 );
    this.addChild( this.restartButton );
  },


});

var EndGameMenu = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameOverScene();
    layer.init();
    this.addChild( layer );
  }
});