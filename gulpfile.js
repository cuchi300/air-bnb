const { src, dest, watch, series} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps')

const terser = require('gulp-terser');

const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');

function css() {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
}

function javascript() {
    return src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('build/img'))
}

function versionAvif() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif())
        .pipe(dest('build/img'))
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
    watch('src/js/**/*.js', javascript)
    watch('src/img/**/*.{png,jpg}', versionAvif)
    watch('src/img/**/*.{png,jpg}', versionWebp)
}

exports.css = css;
exports.dev = dev;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.versionWebp = versionWebp;
exports.default = series(javascript, css, dev);