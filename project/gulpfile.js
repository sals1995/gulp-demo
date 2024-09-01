import gulp from "gulp"

const {src, dest , series, parallel,watch} = gulp


const globs={
    html:"./*.html",
    css:"./css/**/*.css",
    js:"./js/**/*.js",
    img:"./pics/*"
}

import htmlmin from "gulp-htmlmin"
// html task
export function html() {
    //read file
   return src(globs.html)
   //minify
   .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
    // move to dist
    .pipe(dest("../dist"))
}

import concat from "gulp-concat"
import cleanCSS from 'gulp-clean-css'
//css task
export function css(){
    // read files
   return src(globs.css)
   // concat to one file
   .pipe(concat("style.min.css"))
   // minify
   .pipe(cleanCSS())
   // move to dist
   .pipe(dest("../dist"))
}

import terser from 'gulp-terser'
//js task
export function js() {
    return src(globs.js,{sourcemaps:true})
    .pipe(concat("script.min.js"))
    .pipe(terser())
    .pipe(dest("../dist" ,{sourcemaps:"."}))
}

import imagemin , {mozjpeg} from "gulp-imagemin"
export function img(){
    return src(globs.img,{encoding:false})
    .pipe(imagemin([
        mozjpeg({quality: 50}),
    ]))
    .pipe(dest("../dist/assets"))
}

// generate image sprite
import spritesmith from 'gulp.spritesmith'
export function imgSprite() {
    // this will generate a sprite folder in project with all-in-one.png and style.sprite.css
    return  src(globs.img, {encoding: false})
    .pipe(spritesmith({cssName:"style.sprite.css",imgName:"all-in-one.png"}))
    .pipe(dest("project/images-sprite"))
    // to minify css and image go to: https://www.npmjs.com/package/gulp.spritesmith#continuing-the-pipeline
}

function watchTask(){
    watch(globs.html,html)
    watch(globs.css,css)
    watch(globs.js,js)
    watch(globs.img,img)
}

function dummyTask(done){
    // any logic
    console.log("test !");
    done()
}

export default series( parallel(  html, css,js, img ),dummyTask,watchTask )


/* function test(){ 
    return Promise.resolve()
}
export { test }//command : gulp test
export default test//command : gulp  */