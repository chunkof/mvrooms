'use strict';

// plugins
var gulp    = require('gulp');
var staticHash = require('gulp-static-hash');
var hashCreator = require("gulp-hash-creator");
var runSequence = require('run-sequence');

// settings
var devlop_dir  ="";

//------------------
// Insert cache breaker
//------------------
gulp.task('insertCacheBreaker', function() {
    var target = devlop_dir+"index.html";
    
    return gulp.src(target)
        .pipe(staticHash({asset: 'static'}))
        .pipe(gulp.dest(devlop_dir));
});


//------------------
// Make hash list
//------------------
gulp.task('makeHashList', function() {

  // config
  var config = {
      forceUpdate: true,
      length:16,
      hashName: 'md5',
      output: devlop_dir+ 'js/chunkof_FileHashList.js',
      outputTemplate: "var chunkof_FileHashList = [\n{{{hashList}}}{/*dummy*/}\n];",
      delimiter: "",
      log: false,
      format: function (obj) {
        var fileName =  obj.path.match(".+/(.+?)([\?#;].*)?$")[1];
        return "{"
          + "name:" + "'" + fileName + "'" + ","
          + "hash:" + "'" + obj.hash + "'"
          + "},\n";
    }
  };
  
  // execute
  return gulp.src([
    devlop_dir+ 'js/plugins/*.js',
    devlop_dir+ 'data/*.json'
    ])
    .pipe(hashCreator(config))
    ;
});


//------------------
//    Default
//------------------
gulp.task('default', function() {
  runSequence('makeHashList','insertCacheBreaker');
});

