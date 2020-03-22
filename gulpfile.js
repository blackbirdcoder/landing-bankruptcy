let gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync"),
  pug = require("gulp-pug"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  tingpng = require("gulp-tinypng"),
  minify = require("gulp-minify"),
  validateHtml = require("gulp-w3c-html-validator"),
  htmlmin = require("gulp-htmlmin");

//sass
gulp.task("scss", () => {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: "compressed" }).on(
        "error",
        notify.onError({
          title: "SCSS attention error!"
        })
      )
    )
    .pipe(rename({ suffix: "-min" }))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions"] }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

//css-libs
gulp.task("css-libs", () => {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/swiper/css/swiper.css",
      "node_modules/animate.css/animate.css",
      "node_modules//leaflet/dist/leaflet.css"
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("app/scss/libs"))
    .pipe(browserSync.reload({ stream: true }));
});

//php
gulp.task("php", () => {
  return gulp
    .src("app/backend/**/*.php")
    .pipe(browserSync.reload({ stream: true }));
});

//js-min
gulp.task("js-min", () => {
  return gulp
    .src("app/js/common.js")
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "JAVASCRIPT attention error!"
        })
      })
    )
    .pipe(minify())
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

//js-libs-min
gulp.task("js-libs", () => {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/swiper/js/swiper.js",
      "node_modules/wowjs/dist/wow.js",
      "node_modules//leaflet/dist/leaflet.js"
    ])
    .pipe(concat("libs-min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/libs"));
});

//pug
gulp.task("pug", () => {
  return gulp
    .src("app/pug/page/*.pug")
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "PUG attention error!"
        })
      })
    )
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("app"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

//img
gulp.task("img", () => {
  return gulp.src("app/img/**/*").pipe(browserSync.reload({ stream: true }));
});

//img-compress (500 limit per month)
gulp.task("tingpng", () => {
  gulp
    .src("app/img/*.+(png|jpg)")
    .pipe(tingpng("m71fp3MWlx1BMKkk7Vy32lXlK2RMM0GB"))
    .pipe(gulp.dest("dist/img"))
    .pipe(notify({ message: "All images are successfully compressed" }));
});

//video
gulp.task("video", () => {
  return gulp.src("app/video/**/*").pipe(browserSync.reload({ stream: true }));
});

//html valid
gulp.task("html-valid", () => {
  return gulp
    .src("app/*.html")
    .pipe(validateHtml())
    .pipe(validateHtml.reporter())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

//browserSync
gulp.task("browser-sync", () => {
  browserSync.init({
    proxy: "bankruptcy.wrk",
    baseDir: "app",
    port: 3001,
    open: true,
    notify: false
  });
});

//watch
gulp.task(
  "watch",
  [
    "browser-sync",
    "scss",
    "css-libs",
    "pug",
    "php",
    "js-min",
    "js-libs",
    "img"
  ],
  () => {
    gulp.watch("app/scss/**/*.scss", ["scss"]);
    gulp.watch("app/backend/**/*.php", ["php"]);
    gulp.watch("app/pug/**/*", ["pug"]);
    gulp.watch("app/js/**/*.js", ["js-min"]);
    gulp.watch("app/img/**/*", ["img"]);
    gulp.watch("app/video/**/*", ["video"]);
  }
);

// build
gulp.task("build", ["scss", "pug", "html-valid", "tingpng"], () => {
  let buildCss = gulp.src("app/css/*-min.css").pipe(gulp.dest("dist/css")),
    buildFont = gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts")),
    buildJs = gulp.src("app/js/*-min.js").pipe(gulp.dest("dist/js")),
    buildLibsJs = gulp.src("app/libs/*-min.js").pipe(gulp.dest("dist/libs")),
    buildPhp = gulp.src("app/backend/*.php").pipe(gulp.dest("dist/backend")),
    buildVideo = gulp.src("app/video/**/*").pipe(gulp.dest("dist/video")),
    buildFavicon = gulp
      .src("app/img/favicon/*")
      .pipe(gulp.dest("dist/img/favicon"));
});
