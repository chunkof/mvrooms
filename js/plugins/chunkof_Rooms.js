// author chunkof (http://chunkof.net/)
(function() {

  //--------------------
  var _DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function(){
    // start
    var startMapId = getQueryVariable('map');
    if (startMapId) {
      $dataSystem.startMapId = Number(startMapId);
    }
    startMapId = getQueryVariable('room');
    if (startMapId) {
      $dataSystem.startMapId = Number(startMapId);
    }

    _DataManager_setupNewGame.call(this);
  };

  var __DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function(){
    __DataManager_setupNewGame.call(this);
    // スイッチ1をONに。
    $gameSwitches.setValue(1, true);
  };

  //--------------------
  var getQueryVariable = function(variable){
    var query = window.location.search.substring(1);
    var params = query.split("&");
    for (var i=0; i<params.length; ++i){
      var pair = params[i].split("=");
      var key = decodeURIComponent(pair[0]);
      if (key != variable){
        continue;
      }
      var value = decodeURIComponent(pair[1]);
      return escapeJsHTML(value);
    }
    return undefined;
  };

  //--------------------
  // escape (to preventing xss)
  var escapeJsHTML = function (str) {
    var escaped =
      str
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\//g, '\\/')
        .replace(/</g, '\\x3c')
        .replace(/>/g, '\\x3e')
        .replace(/(0x0D)/g, '\r')
        .replace(/(0x0A)/g, '\n')
        .replace(/&/g, '&amp;');

    return escaped;
  };

  Scene_Gameover.prototype.gotoTitle = function() {
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
  };

  //------------------------------
  // Pre Load
  //------------------------------
  TDDP.bootPreloadImages = {
    picture: [
      "copyright"
    ]
  }

})();