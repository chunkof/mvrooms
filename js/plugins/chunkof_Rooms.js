(function() {

  //--------------------
  var _DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function(){
    // start
    var startMapId = getQueryVariable('map');
    if (startMapId) {
      $dataSystem.startMapId = Number(startMapId);
    }

    _DataManager_setupNewGame.call(this);
  };

  //--------------------
  var getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return escapeJsHTML(pair[1]);
      }
    }
    return undefined;
  };

  //--------------------
  // escape
  // http://qiita.com/hrdaya/items/4beebbdb57009b405d2d
  var escapeJsHTML = function (str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\//g, '\\/')
      .replace(/</g, '\\x3c')
      .replace(/>/g, '\\x3e')
      .replace(/(0x0D)/g, '\r')
      .replace(/(0x0A)/g, '\n')
      .replace(/&/g, '&amp;');
  };
})();