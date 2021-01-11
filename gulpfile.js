const { src, dest, watch, parallel } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function sync() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch('*.html').on('change', browserSync.reload);
}

function sass() {
    return src('sass/style.scss')
    .pipe(gulpSass())
    .pipe(dest('css/'))
    .pipe(browserSync.stream())
}

function watcher(done) {
    watch('sass/style.scss', sass)
    browserSync.reload();
    done();
}

module.exports = {
    sass,
    watcher,
    sync: parallel(sync, watcher)
}