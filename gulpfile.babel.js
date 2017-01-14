import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import del from 'del';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config';

const OUTPUT_FILE = 'shono.js';
const JS_FILES = './src/*.js';
const ENTRY_FILE = './src/shono.js';
const DEST_PATH = './dest';

gulp.task('watch:js', () => {
    console.log('Watching for javascript files to change..');
    gulp.watch(JS_FILES, gulp.series('javascript', 'bs:reload'));
});

gulp.task('watch:index', () => {
    console.log('Watching for index.html to change..');
    gulp.watch('./index.html', gulp.series('bs:reload'));
});

gulp.task('watch', gulp.parallel('watch:js', 'watch:index'));

gulp.task('clean:dest', d => {
    console.log('Cleaning destination folder..');
    del([DEST_PATH + '/**/*']);
    d();
});

gulp.task('javascript', gulp.series('clean:dest', () => {
    console.log('Applying webpack and minifying destination file..');
    return gulp.src(ENTRY_FILE)
        .pipe(webpack(webpackConfig))
        .pipe(rename(OUTPUT_FILE))
        .pipe(gulp.dest(DEST_PATH))
        .pipe(uglify())
        .pipe(rename('min.' + OUTPUT_FILE))
        .pipe(gulp.dest(DEST_PATH));
}));

gulp.task('bs:start', d => {
    browserSync.init({
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

gulp.task('run:normal', gulp.parallel('javascript', 'watch'));

gulp.task('run:server', gulp.series('bs:start', 'run:normal'));
