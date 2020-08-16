const gulp = require("gulp");                            //gulpプラグイン
const plumber = require("gulp-plumber");                 //Watch中のエラー防止
const notify = require("gulp-notify");                   //エラー通知
const sass = require("gulp-sass");                       //Sassのコンパイル
const sassGlob = require("gulp-sass-glob");              //Sassのimportファイルをいい感じに読み込んでくれる
const postcss = require("gulp-postcss");                 //ベンダープレフィックス付与
const autoprefixer = require("autoprefixer");            //ベンダープレフィックス付与
const csscomb = require("gulp-csscomb");                 //CSSプロパティ記述整形
const mmq = require("gulp-merge-media-queries");         //メディアクエリをまとめる
const rename = require("gulp-rename");                   //JSのリネーム
const uglify = require("gulp-uglify");                   //JSの圧縮
const imagemin = require("gulp-imagemin");               //画像の圧縮
const imageminJpg = require('imagemin-jpeg-recompress'); //画像の圧縮(Jpeg)
const imageminPng = require('imagemin-pngquant');        //画像の圧縮(png)
const imageminGif = require('imagemin-gifsicle');        //画像の圧縮(gif)
const svgmin = require('gulp-svgmin');                   //画像の圧縮(svg)
const browserSync = require("browser-sync").create();    //ブラウザのリロード

const path = "DocumentRoot/wp-content/themes/kanucha/assets";

//Sassのコンパイル
gulp.task("sass", function(done) {
  gulp
    .src(path + "/sass/*.scss")
    .pipe(plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
    .pipe(sassGlob())
    .pipe( sass({ outputStyle: 'expanded' }) )
    .pipe(postcss([
      autoprefixer()
    ]
    ))
    .pipe(csscomb())
    .pipe(mmq())
    .pipe(gulp.dest(path + "/css"))
    done();
});

// JavaScriptファイルの圧縮
gulp.task("jscompress", () =>
    gulp
    .src([path + "/js/*.js", "!" + path + "/js/*.min.js"])
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
  }))
    .pipe(gulp.dest(path + "/js"))
);

// jpg,png,gif画像の圧縮タスク
gulp.task("imagemin", () =>
  gulp
    .src(path + "/img/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin([
      imageminPng(),
      imageminJpg(),
      imageminGif({
          interlaced: false,
          optimizationLevel: 3,
          colors:180
      })
    ]
    ))
    .pipe(gulp.dest(path + "/img"))
);

// svg画像の圧縮タスク
gulp.task('svgmin', () =>
  gulp
  .src(path + "/img/*.+(svg)")
  .pipe(svgmin())
  .pipe(gulp.dest(path + "/img"))
);

// サーバーの立ち上げ
gulp.task('browser-sync', () => {
  return browserSync.init({
    proxy: 'localhost:8000'
    });
});

// リロード
gulp.task("reload", (done) => {
  browserSync.reload();
  done();
});

// 監視ファイル
gulp.task("watch", (done) => {
  gulp.watch(path + "/sass/**/*.scss", gulp.series('sass', 'reload'));
  gulp.watch(path + "/js/**/*.js", gulp.series('jscompress', 'reload'));
  gulp.watch(path + "/img/**/*.+(jpg|jpeg|png|gif)", gulp.series('imagemin', 'reload'));
  gulp.watch(path + "/img/**/*.+(svg)", gulp.series('svgmin', 'reload'));
  gulp.watch("DocumentRoot/wp-content/themes/kanucha/**/*.php", gulp.series('reload'));
  done();
});

// タスクの実行
gulp.task('default',
    gulp.parallel('watch', 'browser-sync')
);
