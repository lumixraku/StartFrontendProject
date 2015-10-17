// -------------------------------------
//   Modules
// -------------------------------------
//
// gulp              : The streaming dist system
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

//导入插件模块(import module)
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    browserSync = require('browser-sync')
    .create(),
    reload = browserSync.reload,
    pin = gulpLoadPlugins({ //plugins rename pin
        /*gulp-load-plugins options*/
        rename: {
            'gulp-debug': 'debugger',
            'gulp-minify-html': 'gmh',
            'gulp-minify-css': 'gmc',
            'gulp-rimraf': 'clean',
            'gulp-sourcemaps': 'smap',
        } //a mapping of plugins to rename
    });


//目录路径(Directory Path)
var sourceDir = './webstart/build/',
    imgSourceDir = sourceDir + 'img/',
    jsSourceDir = sourceDir + 'js/',
    cssSourceDir = sourceDir + 'css/',
    lessSourceDir = sourceDir + 'less/',
    scssSourceDir = sourceDir + 'scss/';
var distDir = './webstart/dist/',
    imgDistDir = distDir + 'img/',
    jsDistDir = distDir + 'js/',
    cssDistDir = distDir + 'css/';


// scss编译后的css将注入到浏览器里实现更新(scss compile and reload)
gulp.task('sass', function () {
    return gulp.src(scssSourceDir + '**/*.scss')
        .pipe(pin.plumber({
            errorHandler: pin.notify.onError(
                'Error: <%= error.message %>')
        }))
        .pipe(pin.sass({
            style: 'expanded'
        }))
        .pipe(pin.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(cssSourceDir))
        .pipe(pin.gmc({
            compatibility: 'ie8'
        }))
        .pipe(pin.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(cssDistDir))
        .pipe(reload({
            stream: true
        }));

})

// 静态服务器 + 监听 scss/html 文件(static server + listen scss file on change)
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "distDir"
    }); //静态服务器启动的目录(server start directory)

    gulp.watch(scssSourceDir + "*.scss", ['sass']);
    gulp.watch("./*.html")
        .on('change', reload);
});



//压缩css(minify css)
gulp.task('minifyCSS', function () {
    gulp.src(cssSourceDir + '*.css')
        .pipe(pin.plumber({
            errorHandler: pin.notify.onError(
                'Error: <%= error.message %>')
        }))
        .pipe(pin.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(cssSourceDir))
        .pipe(pin.gmc({
            compatibility: 'ie8'
        }))
        .pipe(pin.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(cssDistDir))
})

//压缩HTML(minify html)
gulp.task('minifyHTML', function () {
    return gulp.src(distDir + '*.html')
        .pipe(pin.gmh({
            conditionals: true,
            spare: true
        }))
        .pipe(pin.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(distDir))
})

//压缩图片(minify photo)
gulp.task('minifyImg', function () {
    return gulp.src(imgSourceDir + '*')
        .pipe(pin.imagemin())
        .pipe(gulp.dest(imgDistDir));
})

// 合并，压缩文件(concat file and minify)
gulp.task('minifyJS', function () {
    return gulp.src(jsSourceDir + '**/*.js')
        .pipe(pin.concat('all.js'))
        .pipe(gulp.dest(jsSourceDir))
        .pipe(pin.uglify())
        .pipe(pin.rename('all.min.js'))
        .pipe(gulp.dest(jsDistDir))
})

// 默认任务(default task)
gulp.task('default', ['serve'], function () {
    gulp.start('sass', 'minifyJS', 'minifyCSS', 'minifyHTML',
        'minifyImg')
})
