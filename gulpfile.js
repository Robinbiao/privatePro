
let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');

gulp.task('default',function () {
  return gulp.src('./css/config/*.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./css/config'));
})