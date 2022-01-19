const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")

//minify images and copy it to dist folder
const imagemin = require('gulp-imagemin');
//don't forget to install gulp-imagemin with version 7.1.0
function imgMinify() {
    return gulp.src('project/pics/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

//run image task by 'gulp' commond
//  exports.default = imgMinify
//  or
//run image task by 'gulp imgMinify' commond
exports.img = imgMinify

//creating dist folder and copy html files to it

const htmlmin = require('gulp-htmlmin');
function minifyHTML() {
    return src('project/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}

exports.html = minifyHTML


//minify js files and copy it to dist folder
const concat = require('gulp-concat');
const terser = require('gulp-terser');

function jsMinify() {
    return src('project/js/**/*.js',{sourcemaps:true}) //path includeing all js files in all folders
    
        //concate all js files in all.min.js
        .pipe(concat('all.min.js'))
        //use terser to minify js files
        .pipe(terser())
        //create source map file in the same directory
        .pipe(dest('dist/assets/js',{sourcemaps:'.'}))
}
exports.js = jsMinify


//minify css files and copy it to dist folder

var cleanCss = require('gulp-clean-css');
function cssMinify() {
    return src("project/css/**/*.css")
        //concate all css files in style.min.css
        .pipe(concat('style.min.css'))
        //minify file 
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css'))
}
exports.css = cssMinify
//sass task
const sass = require('gulp-sass')(require('sass'));
function sassMinify() {
    return src(["project/sass/**/*.scss", "project/css/**/*.css"],{sourcemaps:true})
        .pipe(sass()) // Using gulp-sass to convert sass to css
        //concate all js files in all.min.js
        .pipe(concat('style.sass.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css',{sourcemaps:'.'}))
}



var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}

function reloadTask(done) {
  browserSync.reload()
  done()
}

//watch task
function watchTask() {
    watch('project/*.html',series(minifyHTML, reloadTask))
    watch('project/js/**/*.js',series(jsMinify, reloadTask))
    watch(["project/css/**/*.css","project/sass/**/*.scss"], series(sassMinify,reloadTask));
}
exports.default = series( parallel(imgMinify, jsMinify, sassMinify, minifyHTML), serve,watchTask)




