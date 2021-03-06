'use strict';

var path = require('path');
var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var size = require('gulp-size');
var watchify = require('watchify');
var assign = require('lodash.assign');
var gutil = require('gulp-util');

var extended = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

var succint = ' <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>';
var succjs = '//' + succint + '\n';
var succss = '/*' + succint + ' */\n';

gulp.task('clean', function () {
  gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('build-only-broad', bab);

gulp.task('build-only', buildDev);
gulp.task('build', ['styles'], bab);

function buildSource (src, dest, devMode) {
  var pkg = require('./package.json');
  var opts;
  var b;
  var min = dest.split('.');
  min.splice(min.length - 1, 0, 'min');
  min = min.join('.');

  // browserify options
  opts = {
      entries: ['./src/' + src],
      debug: true,
      standalone: 'rome'
  };

  if (devMode) {
    opts = assign({}, watchify.args, opts);
    b = watchify(browserify(opts));
    b.on('update', bundle);
  } else {
    b = browserify(opts);
  }

  b.on('log', gutil.log);

  function bundle() {
    return b.bundle()
      .pipe(source(dest))
      .pipe(streamify(header(extended, { pkg : pkg } )))
      .pipe(gulp.dest('./dist'))
      .pipe(streamify(rename(min)))
      .pipe(streamify(uglify()))
      .pipe(streamify(header(succjs, { pkg : pkg } )))
      .pipe(streamify(size()))
      .pipe(gulp.dest('./dist'));
  }

  return bundle();
}

function buildDev () { return buildSource('rome.moment.js', 'rome.js', true); }
function build () { return buildSource('rome.moment.js', 'rome.js'); }
function buildAlone () { return buildSource('rome.standalone.js', 'rome.standalone.js'); }
function bab () {
  buildAlone();
  return build();
}

gulp.task('styles:dev', function() {
  watch({ glob: 'src/**/*.styl' }, function () { gulp.start('styles-only'); });
});
gulp.task('styles-only', styles);
gulp.task('styles', ['clean', 'bump'], styles);

function styles () {
  var pkg = require('./package.json');

  return gulp.src('./src/rome.styl')
    .pipe(stylus({
      import: path.resolve('node_modules/nib/index')
    }))
    .pipe(header(extended, { pkg : pkg } ))
    .pipe(gulp.dest('./dist'))
    .pipe(rename('rome.min.css'))
    .pipe(minifyCSS())
    .pipe(size())
    .pipe(header(succss, { pkg : pkg } ))
    .pipe(gulp.dest('./dist'));
}

gulp.task('watch', ['styles:dev', 'build-only']);

gulp.task('bump', function () {
  var bumpType = process.env.BUMP || 'patch'; // major.minor.patch

  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['build', 'styles'], function (done) {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  gulp.src('./')
    .pipe(git.commit(message))
    .pipe(gulp.dest('./'))
    .on('end', tag);

  function tag () {
    git.tag(v, message);
    git.push('origin', 'master', { args: '--tags' }).end();
    done();
  }
});

gulp.task('npm', ['tag'], function (done) {
  var child = require('child_process').exec('npm publish', {}, function () {
    done();
  });

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on('error', function () {
    throw new Error('unable to publish');
  });
});

gulp.task('release', ['npm']);
