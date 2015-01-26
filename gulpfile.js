var gulp = require('gulp'),
	jade = require('gulp-jade'),
	less = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-livereload');


gulp.task('default',['watch'], function() {});

gulp.task('uglify', function () {
    gulp.src('dev/script/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/script'));
});

gulp.task('jade', function(){
    return gulp.src('dev/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('build/html'))
});


gulp.task('sass', function () {
    return gulp.src('dev/sass/*.scss')
        .pipe(less())
        .pipe(gulp.dest('build/css'))
});

gulp.task('watch', function() {
    watch.listen();
    gulp.watch('dev/sass/*.scss', ['sass']);
    gulp.watch('dev/script/*.js', ['uglify']);
    gulp.watch('dev/jade/*.jade', ['jade']);
});






