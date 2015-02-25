var
  gulp          = require('gulp'),
  del           = require('del'),
  concat        = require('gulp-concat'),
  uglify        = require('gulp-uglify'),
  minifycss     = require('gulp-minify-css'),
  path          = require('path'),
  merge         = require('merge-stream'),
  sourcemaps    = require('gulp-sourcemaps'),
  fileinclude   = require('gulp-file-include'),
  prettify      = require('gulp-jsbeautifier');

var paths = {
  html: [
    {
      src: 'src/html/**.html',
      dest: './'
    },
    {
      src: 'src/html/portfolio/**.html',
      dest: './portfolio'
    }
  ],
  js: {
    files: [
      'src/assets/js/plugins.js',
      'src/assets/js/site.js'
    ],
    dest: 'assets/js/app.js'
  },
  css: {
    'files': [
      'src/assets/css/layers.min.css',
      'src/assets/css/style.css',
      'src/assets/css/responsive.css'
    ],
    dest: 'assets/css/app.css'
  },
  fonts: {
    src: 'src/assets/fonts/**.*',
    dest: 'assets/fonts'
  },
  images: {
    src: 'src/assets/img/**/*.*',
    dest: 'assets/img'
  }
};

gulp.task('clean', function (cb) {
  del(['assets'], cb);
});

gulp.task('build-html', ['clean'], function(){
  var tasks = paths.html.map(function(file){
    var g = gulp
            .src(file.src)
            .pipe(fileinclude({
              prefix: '@@',
              basepath: '@file'
            }))
            .pipe(prettify({indentSize: 2}))
            .pipe(gulp.dest(file.dest))
        ;

    return g;
  });

  return merge(tasks);
});

gulp.task('build-js', ['clean'], function(){

  return gulp.src(paths.js.files)
      .pipe(sourcemaps.init())
        .pipe(concat(path.basename(paths.js.dest)))
        .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.dirname(paths.js.dest)));
});

gulp.task('build-css', ['clean'], function(){

  return gulp.src(paths.css.files)
      .pipe(sourcemaps.init())
        .pipe(concat(path.basename(paths.css.dest)))
        .pipe(minifycss({
          keepSpecialComments: 0,
          relativeTo: path.dirname(paths.css.dest)
        }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.dirname(paths.css.dest)));
});

gulp.task('copy-images', ['clean'], function(){
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('copy-fonts', ['clean'], function(){
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});

/**
 * Watch src
 */
gulp.task('watch', ['clean'], function () {
  var watchjs =  paths.js.files;
  var watchcss =  paths.css.files;

  gulp
      .watch(watchjs.concat(watchcss), ['build'])
      .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      })
  ;

  gulp.watch([paths.images.src], ['copy-images']);
});

gulp.task('copy-assets', [
  'copy-images',
  'copy-fonts'
]);

gulp.task('build', [
  'copy-assets',
  'build-js',
  'build-css',
  'build-html',
]);

gulp.task('default', [
  'build',
  'watch'
]);
