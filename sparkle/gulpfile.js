const gulp = require('gulp');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const sassGlob = require('gulp-sass-glob');

// Directories to search SCSS files to compile. By default, node-sass does not
// compile files that begin with _.
const SCSS_FILE_PATHS = [
  "scss/**/*.scss",
];

/**
 * Compile tasks.
 */
const compileStyles = () => {
  return gulp
    .src(SCSS_FILE_PATHS)
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: [
        "node_modules",
        "web/libraries",
      ]
    }))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest('assets/css/'));
};

exports.compile = gulp.series(compileStyles);
exports.compileStyles = compileStyles;

/**
 * Watch tasks.
 */
const watchStyles = () => {
  return gulp.watch(SCSS_FILE_PATHS, gulp.series(compileStyles));
};

exports.watch = gulp.parallel(watchStyles);
exports.watchStyles = watchStyles;

/**
 * Code validator tasks.
 */
const validateStyles = () => {
  return gulp
    .src(SCSS_FILE_PATHS)
    .pipe(stylelint({
      reporters: [
        {
          formatter: "verbose",
          console: true,
        }
      ],
      debug: true,
    }));
};

exports.validate = gulp.series(validateStyles);
exports.validateStyles = validateStyles;

/**
 * Automatic code validation fixer tasks.
 */

const fixStyles = () => {
  return gulp
    .src(SCSS_FILE_PATHS)
    .pipe(stylelint({ fix: true }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
};

exports.fix = gulp.series(fixStyles);

/**
 * Default task.
 */
exports.default = exports.compile;
