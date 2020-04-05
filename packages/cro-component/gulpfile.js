/* eslint-disable @typescript-eslint/no-require-imports */
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const through2 = require('through2');
const path = require('path');

const paths = {
  dest: {
    lib: 'lib', // commonjs 文件存放的目录名 - 本块关注
    esm: 'esm', // ES module 文件存放的目录名 - 暂时不关心
    dist: 'dist' // umd文件存放的目录名 - 暂时不关心
  },
  styles: 'src/**/*.{css,scss}', // 样式文件路径 - 暂时不关心
  scripts: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/types/*',
    '!**/*.d.ts',
    '!**/*.test.{ts,tsx}'
  ], // 脚本文件路径
  source: ['src/**/*.{eot,json,svg,ttf,woff,woff2}']
};

function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.scss/g, '.css');
}

function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;

  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
          // file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
        }
        next();
      })
    )
    .pipe(gulp.dest(destDir));
}

function compileSource() {
  return gulp.src(paths.source).pipe(gulp.dest(paths.dest.lib)).pipe(gulp.dest(paths.dest.esm));
}

function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
}

function sass2css() {
  return gulp
    .src(paths.styles)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano({ zindex: false, reduceIdents: false }))
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildScripts = gulp.series(compileCJS, compileESM);

// 整体并行执行任务
const build = gulp.parallel(buildScripts, compileSource, sass2css);

const watch = () => {
  gulp
    .watch(['src/**/*.{tsx,ts,scss}'], build)
    .on('ready', () => {
      console.log('Gulp is watching');
    })
    .on('change', (p) => {
      console.log(`File ${path.relative(__dirname, p)} was changed`);
    })
    .on('error', (e) => {
      console.error(e.message);
    });
};

exports.watch = watch;

exports.build = build;
