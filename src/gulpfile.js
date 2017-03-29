
let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let htmlmin = require('gulp-htmlmin');
const dist = '../dist';
gulp.task('csspre',function () {
  return gulp.src('./css/config/*.css')
      .pipe(autoprefixer({
        browsers: ['last 10 versions']
      }))
      .pipe(gulp.dest('./css/config'));
})
gulp.task('assets',() =>{
  gulp.src(['images/*','css/module/font/*'],{base:'./'})
    .pipe(gulp.dest(dist))
})
gulp.task('css',() =>{
  gulp.src(['css/*/*.css','css/*/*/*.css'],{base:'./'})
  .pipe(autoprefixer({
        browsers: ['last 10 versions']
      }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest(dist))
})
gulp.task('minjs',() =>{
  gulp.src(['js/*/*.min.js'],{base:'./'})
  .pipe(gulp.dest(dist))
})
gulp.task('js',['minjs'],() =>{
  gulp.src(['js/*/*.js','!js/*/*.min.js'],{base:'./'})
  .pipe(uglify())
  .pipe(gulp.dest(dist))
})
gulp.task('html',() =>{
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  gulp.src(['views/*/*.html','views/*.html','./index.html'],{base:'./'})
  .pipe(htmlmin(options))
  .pipe(gulp.dest(dist))
})

gulp.task('dist',['assets','html','js','css'],() =>{
  console.log('finished')
})
