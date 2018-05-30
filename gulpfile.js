var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');


/*browser sync*/
gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('serve', ['sass'], function(){
    
    browserSync({
        server: 'src'
    });
    
    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

/*sass*/
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

/*Clean CSS + concat*/
gulp.task('css', function(){
    return gulp.src('src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
})
/*Concat JS without uglify*/
gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/js'));
})

/*HTML min and replace*/
gulp.task('html', function(){
    return gulp.src('src/*.html')
    .pipe(htmlReplace({
        'css': 'css/style.css',
        'js': 'js/script.js'
    }))
    .pipe(htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))
});


gulp.task('default', ['serve']);



