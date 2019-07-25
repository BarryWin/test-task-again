const gulp = require('gulp');
const pug = require('gulp-pug');
const beautifier = require('gulp-jsbeautifier');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const browserSync = require('browser-sync');
const named = require('vinyl-named');
const webpack = require('webpack-stream');

gulp.task('build-html', done => {
    gulp.src("./src/templates/**/*.pug")
        .pipe(pug())
        .pipe(beautifier())
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.reload({stream: true}))
    done();
});

gulp.task('build-css', done => {
    gulp.src("./src/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({stream: true}))
    done();
});

gulp.task('build-images', done => {
    gulp.src('./src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imageminMozjpeg({quality: 90, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./public/images'))
    done();
});

gulp.task('build-js', async done => {
    gulp.src('./src/js/**/*.{js,json}')
        .pipe(named())
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('./public/js'))
    done();
});


gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('build-css'));
    gulp.watch('./src/templates/**/*.pug').on('change', gulp.series('build-html'));
    gulp.watch('./src/images/**/*').on('change', gulp.series('build-images'));
    // on('change', browserSync.reload);
});


gulp.task('serve', () => {
browserSync.init({
    server: {
        baseDir: './public'
    },
});


// gulp.watch('./src/templates/**/*.pug', gulp.parallel('build-html'));    
// gulp.watch('./src/js/**/*.js', gulp.parallel('build-js'));    
// gulp.watch('./src/vuex/*', gulp.parallel('build-js'));    
// gulp.watch('./src/widgets/*', gulp.parallel('build-js'));    
// gulp.watch('./src/scss/**/*.scss', gulp.parallel('build-css'));    
// gulp.watch('./src/images/**/*', gulp.parallel('build-images'));

});

gulp.task('default',
    gulp.parallel(
        'build-html',
        'build-css',
        'build-images',
        'build-js',
    )
);

gulp.task('run', gulp.parallel('serve',/*'scripts',*/'watch'));
