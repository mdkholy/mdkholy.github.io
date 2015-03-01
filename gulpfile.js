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
  autoprefixer  = require('gulp-autoprefixer')
  prettify      = require('gulp-jsbeautifier'),
  imagemin      = require('gulp-imagemin'),
  pngquant      = require('imagemin-pngquant'),
  mozjpeg       = require('imagemin-mozjpeg'),
  webserver     = require('gulp-webserver'),
  notify        = require("gulp-notify");

var paths = {
  html: [
    {
      src: 'src/html/*.html',
      dest: '.'
    },
    {
      src: 'src/html/portfolio/**/*.html',
      dest: './portfolio'
    },
    {
      src: 'src/html/testimonials/**/*.html',
      dest: './testimonials'
    },
    {
      src: 'src/html/contact/**/*.html',
      dest: './contact'
    }
  ],
  js: {
    files: [
      'src/assets/js/jquery.min.js',
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

gulp.task('clean-html', function (cb) {
  del(paths.html.map(function(file){
    return file.dest + '/*.html';
  }), cb);
});

gulp.task('clean-js', function (cb) {
  del(['assets/js'], cb);
});

gulp.task('clean-css', function (cb) {
  del(['assets/css'], cb);
});

gulp.task('clean-images', function (cb) {
  del(['assets/img'], cb);
});

gulp.task('clean-fonts', function (cb) {
  del(['assets/fonts'], cb);
});

gulp.task('clean-assets', function (cb) {
  del(['assets'], cb);
});

gulp.task('build-html', ['clean-html'], function(){
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

gulp.task('build-js', ['clean-js'], function(){

  return gulp.src(paths.js.files)
      .pipe(sourcemaps.init())
        .pipe(concat(path.basename(paths.js.dest)))
        .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.dirname(paths.js.dest)));
});

gulp.task('build-css', ['clean-css'], function(){

  return gulp.src(paths.css.files)
      .pipe(sourcemaps.init())
        .pipe(autoprefixer({
          browsers: ['last 6 versions']
        }))
        .pipe(minifycss({
          keepSpecialComments: 0,
          relativeTo: path.dirname(paths.css.dest)
        }))
        .pipe(concat(path.basename(paths.css.dest)))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.dirname(paths.css.dest)));
});

gulp.task('copy-images', ['clean-images'], function(){
  return gulp.src(paths.images.src)
    .pipe(imagemin({
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant(), mozjpeg()]
      }))
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('copy-fonts', ['clean-fonts'], function(){
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('watch', ['build'], function () {
  var watchjs =  paths.js.files;
  var watchcss =  paths.css.files;
  var watchhtml = paths.html.map(function(file){
    return file.src;
  });

  gulp
      .watch(watchjs, ['build-js'])
      .on('change', function(event) {
        console.log('JS file ' + event.path + ' was ' + event.type + ', running tasks...');
      })
  ;

  gulp
      .watch(watchcss, ['build-css'])
      .on('change', function(event) {
        console.log('CSS file ' + event.path + ' was ' + event.type + ', running tasks...');
      })
  ;

  gulp
      .watch(watchhtml, ['build-html'])
      .on('change', function(event) {
        console.log('HTML file ' + event.path + ' was ' + event.type + ', running tasks...');
      })
  ;

  gulp.watch([paths.images.src], ['copy-images']);
});

gulp.task('serve', ['watch'], function() {
  gulp.src('./')
      .pipe(webserver({
        open: true
      }))
      .pipe(notify({
        "title": "Gulp",
        "message": "Server started at localhost:8000",
        "sound": "Frog",
        "icon": path.join(__dirname, "src/assets/img/apple-touch-icon-120x120.png"), // case sensitive
        "onLast": true
      }));;
});

gulp.task('copy-assets', [
  'copy-images',
  'copy-fonts'
]);

gulp.task('build', [
  'copy-assets',
  'build-js',
  'build-css',
  'build-html'
]);

gulp.task('clean', [
  'clean-assets',
  'clean-html'
]);

gulp.task('default', [
  'build',
  'watch',
  'serve'
]);
