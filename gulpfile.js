var path = require("path"),
  gulp = require("gulp"),
  clean = require("gulp-clean"),
  source = require("vinyl-source-stream"),
  rev = require("gulp-rev"),
  uglify = require("gulp-uglify"),
  less = require("gulp-less"),
  minifyCSS = require("gulp-minify-css"),
  browserify = require("browserify"),
  imageMin = require("gulp-imagemin");

const SOURCE_DIR = "public";
const OUTPUT_DIR = "public_dist";

// clean up public_dist_versioned dir
gulp.task("clean", function() {
  return gulp.src(OUTPUT_DIR, { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("less", function() {
  return gulp
    .src(`${SOURCE_DIR}/css/vista-entrada.less`)
    .pipe(
      less({
        paths: [path.join(__dirname, SOURCE_DIR, "css")]
      })
    )
    .pipe(gulp.dest(`./${OUTPUT_DIR}/css`));
});

gulp.task("js-core", function() {
  return browserify(`./${SOURCE_DIR}/js/core.js`)
    .require("jquery")
    .bundle()
    .pipe(source("core.js"))
    .pipe(gulp.dest(`./${OUTPUT_DIR}/js`));
});

gulp.task("js-table-sort", function() {
  return browserify(`./${SOURCE_DIR}/js/table-sort.js`)
    .exclude("jquery")
    .bundle()
    .pipe(source("table-sort.js"))
    .pipe(gulp.dest(`./${OUTPUT_DIR}/js`));
});

gulp.task("js-maps", function() {
  return browserify()
    .require(`./${SOURCE_DIR}/js/maps.js`, { expose: "maps" })
    .exclude("jquery")
    .transform("jadeify")
    .bundle()
    .pipe(source("maps.js"))
    .pipe(gulp.dest(`./${OUTPUT_DIR}/js`));
});
gulp.task("js-lot-map", function() {
  return browserify()
    .require(`./${SOURCE_DIR}/js/lot-map.js`, { expose: "lot-map" })
    .exclude("jquery")
    .transform("jadeify")
    .bundle()
    .pipe(source("lot-map.js"))
    .pipe(gulp.dest(`./${OUTPUT_DIR}/js`));
});

gulp.task(
  "js",
  gulp.parallel("js-core", "js-table-sort", "js-maps", "js-lot-map")
);

// versionize all assets in public dir
gulp.task("version", function() {
  return gulp
    .src([
      `${SOURCE_DIR}/**/*`,
      `!${SOURCE_DIR}/css/**/*`, // filter out source css
      `!${SOURCE_DIR}/js/**/*`, // filter out source js
      `${OUTPUT_DIR}/**/*` // pull in compiled js/css
    ])
    .pipe(gulp.dest(OUTPUT_DIR)) // copy original assets as well
    .pipe(rev())
    .pipe(gulp.dest(OUTPUT_DIR))
    .pipe(rev.manifest())
    .pipe(gulp.dest("."));
});

// compress all js in public_dist_versioned w/ uglify
gulp.task("compress-js", function() {
  return gulp
    .src(`${OUTPUT_DIR}/**/*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task("compress-css", function() {
  return gulp
    .src(`${OUTPUT_DIR}/**/*.css`)
    .pipe(minifyCSS())
    .pipe(gulp.dest(OUTPUT_DIR));
});

// optimize images in public_dist_versioned/images
gulp.task("optimize-images", function() {
  return gulp
    .src(`${OUTPUT_DIR}/images/**/*.*`)
    .pipe(imageMin({ progressive: true }))
    .pipe(gulp.dest(`${OUTPUT_DIR}/images`));
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "less",
    "js",
    "version",
    "compress-js",
    "compress-css",
    "optimize-images"
  )
);
