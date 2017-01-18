import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config';
import config from './config';


gulp.task('watch:js', () => {
    console.log('Watching for javascript files to change..');
    gulp.watch(config.paths.js, gulp.series('webpack:js', 'bs:reload'));
});

gulp.task('watch:index', () => {
    console.log('Watching for index.html to change..');
    gulp.watch('./index.html', gulp.series('bs:reload'));
});

gulp.task('watch', gulp.parallel('watch:js', 'watch:index'));

gulp.task('clean:dest', d => {
    console.log('Cleaning destination folder..');
    del([config.output.dest + '**/*']);
    d();
});

gulp.task('webpack:js', () => {
    console.log('Applying webpack for js files..');
    return gulp.src(config.entryFile)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.output.dest));
});

gulp.task('bs:start', d => {
    browserSync.init({
        open: false,
        server: {
            baseDir: './'
        }
    });
    d();
});

gulp.task('bs:reload', d => {
    browserSync.reload();
    d();
});

gulp.task('run:build', gulp.parallel('clean:dest', 'webpack:js'));

gulp.task('run:watch', gulp.parallel('run:build', 'watch'));

gulp.task('run:server', gulp.series('bs:start', 'run:watch'));
