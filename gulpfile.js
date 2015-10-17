'use strict'
// -------------------------------------
//   Modules
// -------------------------------------
//
// gulp              : The streaming build system
// gulp-autoprefixer : Prefix CSS
// gulp-sourcemaps   :Source map support for Gulp.js
// gulp-babel        : Turn ES6 code into vanilla ES5 with no runtime required
// gulp-concat       : Concatenate files
// gulp-cache        : A cache proxy plugin for Gulp
// gulp-eslint       : JavaScript code quality tool
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-minify-css   : Minify CSS
// gulp-minify-html  : Minify html with minimize.
// gulp-htmlmin      : gulp plugin to minify HTML.
// gulp-filter       : Filter files in a vinyl stream
// gulp-rename       : Rename files
// gulp-sass         : Compile Sass
// gulp-if           : Conditionally run a task
// gulp-imagemin     : Minify PNG, JPEG, GIF and SVG images
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-util         : Utility functions
// gulp-notify       : gulp plugin to send messages based on Vinyl Files or Errors to Mac OS X, Linux or Windows using the node-notifier module. Fallbacks to Growl or simply logging
// gulp-watch        : Watch stream
// gulp-plumber      : Prevent pipe breaking caused by errors from gulp plugins
// gulp-rimraf       : rimraf plugin for gulp
// gulp-size         : Display the size of your project
// gulp-ruby-sass    : Compile Sass to CSS with Ruby Sass
// -------------------------------------

//import module
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    browserSync = require('browser-sync')
    .create(),
    reload = browserSync.reload,
    plugins = gulpLoadPlugins({
        /*gulp-load-plugins options*/
        rename: {
            'gulp-sass': 'sass',
            'gulp-if': 'if',
            'gulp-filter': 'filter',
            'gulp-eslint': 'eslint',
            'gulp-babel': 'babel',
            'gulp-debug': 'debugger',
            'gulp-minify-html': 'gmh',
            'gulp-minify-css': 'gmc',
            'gulp-plumber': 'plumber',
            'gulp-rimraf': 'gr',
            'gulp-size': 'size',
            'gulp-sourcemaps': 'smap',
            'gulp-util': 'util',
            'gulp-watch': 'watch',
            'gul-concat': 'concat'
        } //a mapping of plugins to rename
    }),
    port = 35729;


// 编译Sass及监听scss
// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(plugins.sass({
            style: 'expanded'
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(plugins.gmc({
            compatibility: 'ie8'
        }))
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({
            stream: true
        }));

})

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html")
        .on('change', reload);
});



//压缩css
gulp.task('minifyCSS', function () {
    var ic = './src/',
        oc = './dist/'
    gulp.src(ic + 'css/*.css')
        .pipe(plugins.gmc({
            compatibility: 'ie8'
        }))
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(oc + '/css'))
})

//压缩HTML
gulp.task('minifyHTML', function () {
    return gulp.src('index.html')
        .pipe(plugins.gmh({
            conditionals: true,
            spare: true
        }))
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./'))
})

//压缩图片
gulp.task('minifyImg', function () {
    return gulp.src('./src/images/*')
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('./dist/images'));
})

// 合并，压缩文件
gulp.task('minifyJS', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(plugins.concat('all.js'))
        .pipe(gulp.dest('./src/all'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename('all.min.js'))
        .pipe(gulp.dest('./dist/js'))
})

// 默认任务
gulp.task('default', ['serve'], function () {
    gulp.start('sass', 'minifyJS', 'minifyCSS', 'minifyHTML',
        'minifyImg')
})
