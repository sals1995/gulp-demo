
const { src, dest, series , watch,parallel} = require('gulp');

const globs={
    html:"project/**/*.html",
    css:"project/css/**/*.css",
    js:"project/js/**/*.js",
    img:"project/pics/*"
}


const htmlmin = require("gulp-html-minifier-terser");
// html task
function htmlTask() {
    //read file
   return src(globs.html)
   //minfiy
   .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
    // move to dist
    .pipe(dest("dist"))
}

exports.h= htmlTask



const concat =require("gulp-concat")
const cleanCSS = require('gulp-clean-css');
function cssTask() {
    // read files
   return src(globs.css)
    // concat to one file
    .pipe(concat("style.min.css"))
    // minify
    .pipe(cleanCSS())
    // move to dist
    .pipe(dest("dist/assets/css"))
}


exports.css =cssTask


const terser = require('gulp-terser');
function jsTask() {
    return src(globs.js,{sourcemaps:true})
    .pipe(concat("script.min.js"))
    .pipe(terser())
    .pipe(dest("dist/assets/js" ,{sourcemaps:"."}))
}


exports.js =jsTask
const optimizeImages =require("gulp-optimize-images");
function imgTask() {
    
    return src(globs.img)
    .pipe(optimizeImages({compressOptions:{
        jpeg: {
            quality: 50,
            progressive: true,
        },
        png: {
            quality: 90,
            progressive: true,
            compressionLevel: 6,
        },
        webp: {
            quality: 80,
        },
    }}))
    .pipe(dest('dist/assets/images'))
}
exports.img = imgTask

// generate image sprite
var spritesmith = require('gulp.spritesmith');
function imgSprite() {
    // this will generate a sprite folder in project with all-in-one.png and styleForSprite.css
    return  src(globs.img)
    .pipe(spritesmith({cssName:"styleForSprite.css",imgName:"all-in-one.png"}))
    .pipe(dest("project/sprite"))
}

exports.sprite= imgSprite

function watchTask(){
    watch(globs.html,htmlTask)
    watch(globs.css,cssTask)
    watch(globs.js,jsTask)
    watch(globs.img,imgTask)
}

function dummyTask(done){
    // logic
    console.log("test !");
    done()
}

//default //gulp
exports.default= series( parallel(  htmlTask, cssTask ,jsTask, imgTask ),dummyTask,watchTask )

/* 
function task1() {
    // code
    return Promise.resolve()
}

//named export
exports.t1 =task1 //gulp t1

//defualt export
exports.default=  task1 //gulp */