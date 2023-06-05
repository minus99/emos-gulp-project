'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import pug from 'gulp-pug';
import sassLoader from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import svgSprite from 'gulp-svg-sprite';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import { deleteAsync as del } from 'del';

browserSync.create();
const sass = gulpSass(sassLoader);
const { src, dest, lastRun, series, parallel, watch, task } = gulp;
//const sourcemaps = require('gulp-sourcemaps');
//const imagemin = require('gulp-imagemin');
/*const imagemin_options = [
  imagemin.gifsicle({ interlaced: true }),
  imagemin.mozjpeg({ quality: 76.5, progressive: true }),
  imagemin.optipng({ optimizationLevel: 5 }),
  imagemin.svgo({
    plugins: [
      { removeViewBox: true },
      { cleanupIDs: false }
    ]
  })
];
*/

const svgSprite_options = {
  mode: {
    symbol: {
      bust: false,
      dest: './',
      sprite: 'icons.svg',
      prefix: '',
      dimensions: 'icon-%s',
      example: {
        dest: 'icons.html',
      },
    },
  },
};

function clean(done) {
  return del(['dist']);
  done();
}

function html(done) {
  return src(['src/pug/*.pug'], { since: lastRun(html) })
    .pipe(pug({ pretty: true, locals: {} }))
    .pipe(dest('dist/'));
  done();
}

function css(done) {
  return (
    src(['src/scss/*.scss'])
      //.pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: 'compressed',
        })
      )
      .pipe(
        autoprefixer({
          cascade: false,
          grid: false,
        })
      )
      //.pipe(sourcemaps.write('.'))
      .pipe(dest('dist/frontend/css'))
      .pipe(browserSync.stream())
  );
  done();
}

function js(done) {
  return (
    src([
      'src/js/custom.js',
      'src/js/620.js',
    ])
      //.pipe(sourcemaps.init())
      .pipe(uglify())
      //.pipe(concat('all.js'))
      //.pipe(sourcemaps.write('.'))
      .pipe(dest('dist/frontend/js'))
  );
  done();
}

function jsExt(done) {
  return src(['src/js/ext/**']).pipe(dest('dist/frontend/js/ext'));
  done();
}

function pwa(done) {
  return src(['src/manifest-min.json', 'src/sw.js']).pipe(dest('dist/'));
  done();
}

function fonts(done) {
  return src(['src/fonts/**']).pipe(dest('dist/frontend/fonts'));
  done();
}

function icons(done) {
  return src('src/icons/*.svg')
    .pipe(svgSprite(svgSprite_options))
    .pipe(dest('dist/frontend/images/'));
  done();
}

function images(done) {
  return src(['src/images/**']).pipe(dest('dist/frontend/images'));
  done();
}

function uploads(done) {
  return src(['src/uploads/**']).pipe(dest('dist/uploads'));
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function host(done) {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
  done();
}

function watchFiles(done) {
  watch(['src/manifest-min.json', 'src/sw.js'], series(pwa, reload));
  watch('src/pug/**/*.pug', series(html, reload));
  watch('src/scss/**/*.scss', series(css));
  watch('src/js/**', series(js, jsExt, reload));
  watch('src/fonts/**', series(fonts, reload));
  watch('src/images/**', series(images, reload));
  watch('src/uploads/**', series(uploads, reload));
  watch('src/icons/*.svg', series(icons, reload));
  done();
}

const _default = series(
  clean,
  css,
  parallel(pwa, html, js, jsExt, fonts, images, icons, uploads),
  host,
  watchFiles
);

export { _default as default, clean, css, js };
