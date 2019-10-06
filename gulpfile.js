var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss', function (done) {
    gulp.src('./src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'));
    done();
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', gulp.parallel('scss'));
});