var gulp = require('gulp');
var parametros = require('./parametros.js');


var gutil = require('gulp-util');
var del = require('del');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var jade = require('gulp-jade');


// Coffee
gulp.task('coffee', function() {
    // runSequence('limpar-js');
    gulp
        .src(parametros.scripts + '/*.coffee')
        .pipe(plumber())
        .pipe(coffee({ bare: true}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(parametros.destino + '/js'))
        .on('error', function() { gutil.log(); });
});


// Minificar JS
gulp.task('minificar-js', function() {
    // runSequence('limpar-js');
    gulp
        .src(parametros.destino + '/js/**.js')
        .pipe(plumber())
        .pipe(uglify({ outSourceMap: true}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(parametros.destino + '/js'))
        .on('error', function() { gutil.log(); });
});


// Sass
gulp.task('sass', function() {
    // runSequence('limpar-css');
    gulp
        .src(parametros.estilos + '/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(parametros.destino + '/css'))
        .on('error', function() { gutil.log(); });
});


// Minificar CSS
gulp.task('minificar-css', function() {
    // runSequence('limpar-css');
    gulp.src(parametros.destino + '/css/*.css')
        .pipe(plumber())
        .pipe(minifyCSS())
        .pipe(plumber.stop())
        .pipe(gulp.dest(parametros.destino + '/css'))
        .on('error', function() { gutil.log(); });
});


// Jade
gulp.task('jade', function() {
    // runSequence('limpar-html');
    gulp
        .src(parametros.templates + '/*.jade')
        .pipe(plumber())
        .pipe(jade({ pretty: true}))
        .pipe(plumber())
        .pipe(gulp.dest(parametros.destino))
        .on('error', function() { gutil.log(); });
});


// Imagens
gulp.task('imagens', function() {
    // runSequence('limpar-imagens');
    gulp
        .src(parametros.imagens + '/*')
        .pipe(gulp.dest(parametros.destino + '/imagens'))
        .on('error', function() { gutil.log(); });
});


// Monitorar, ou seja: observar os arquivos
gulp.task('monitorar', function() {
    runSequence('limpar-css', 'limpar-js', 'limpar-html', 'limpar-imagens', 'compilar-origem');
    gulp.watch(parametros.scripts + '/*.coffee', ['coffee']);
    gulp.watch(parametros.estilos + '/*.scss', ['sass']);
    gulp.watch(parametros.templates + '/*.jade', ['jade']);
    gulp.watch(parametros.imagens + '/*', ['imagens']);

});


// Deletar os arquivos da pasta destino/css
gulp.task('limpar-css',function() {
    del([parametros.destino + '/css/*.css']);
});

// Deletar os arquivos .html da pasta destino
gulp.task('limpar-html',function() {
    del([parametros.destino + '*.html']);
});

// Deletar os arquivos da pasta destino/js
gulp.task('limpar-js',function() {
    del([parametros.destino + '/js/*.js']);
});

// Deletar os arquivos da pasta destino/imagens
gulp.task('limpar-imagens',function() {
    del([parametros.destino + '/imagens/*']);
});

// Compilar origem
gulp.task('compilar-origem', function() {
    runSequence('coffee', 'sass', 'jade', 'imagens');

    if (parametros.minificar === true) {
        runSequence('minificar-css', 'minificar-js');
    }
});
