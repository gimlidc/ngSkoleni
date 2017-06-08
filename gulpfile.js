var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var debug = require('gulp-debug');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var htmlMinify = require('gulp-htmlmin');
var filesort = require('gulp-angular-filesort');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');

// paths definition for sources, build and tests
var paths = {
    "src": "./src/",
    "lang": "./language/",
    "build": "./build/",
    "dist": "./target/",
    "bower": "./bower_components/",
    "config": "./config/"
};

var deps = [
    "angular/angular.js",
    "angular-cookies/angular-cookies.js",
    "angular-route/angular-route.js",
    "angular-translate/angular-translate.js",
    "angular-translate-loader-static-files/angular-translate-loader-static-files.js"
];

gulp.task('inject', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src([
        paths.src + '**/*.js',
        paths.src + '**/*.css'
    ], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});

gulp.task('webserver', ['inject', 'vendor', 'config-devel'], function() {
    return gulp.src([paths.src, paths.build, paths.lang])
        .pipe(webserver({
            livereload: {
                enable: true
            }
        }));
});

/**
 * Deletes all automatically generated files (build folder)
 */
gulp.task('clean', function () {
    return gulp.src([paths.dist, paths.build], {read: false})
        .pipe(clean());
});

/**
 * Creates templates.js with all *.html templates in templateCache.
 */
gulp.task('templates', ['clean'], function () {
    return gulp.src([paths.src + '**/*.html',
        '!' + paths.src + 'index.html'
    ])
        .pipe(debug({title: 'minifyHtml'}))
        .pipe(htmlMinify({collapseWhitespace: true}))
        .pipe(debug({title: 'template'}))
        .pipe(templateCache())
        .pipe(gulp.dest(paths.build));
});

gulp.task('vendor', ['clean'], function () {
   return gulp.src(deps.map(function(value) {
        return paths.bower + value;
    })).pipe(debug({title: '3rd party libraries'}))
       .pipe(concat("vendor.js"))
       .pipe(gulp.dest(paths.build));

});

gulp.task('build', ['clean'], function() {
    return gulp.src([
        paths.src + '**/*.js'])
        .pipe(debug({title: "filesort"}))
        .pipe(filesort())
        .pipe(debug({title: "concat"}))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('config-devel', ['clean'], function() {
    gulp.src([paths.config + "devel.json"])
        .pipe(rename("config.json"))
        .pipe(gulp.dest(paths.build));
});

gulp.task('config-prod', ['clean'], function() {
    gulp.src([paths.config + "production.json"])
        .pipe(rename("config.json"))
        .pipe(gulp.dest(paths.build));
});

gulp.task('deploy', ['templates', 'vendor', 'build', 'config-prod'], function() {
    gulp.src([
        paths.build + "vendor.js",
        paths.build + "app.js",
        paths.build + "templates.js"
    ])
        .pipe(debug({title: "joining builded files"}))
        .pipe(concat("app.js"))
        .pipe(ngAnnotate())
        .pipe(debug({title: "uglify"}))
        .pipe(uglify())
        .pipe(debug({title: "deploy"}))
        .pipe(gulp.dest(paths.dist));

    gulp.src([paths.build + "config.json"]).pipe(gulp.dest(paths.dist));
    gulp.src([paths.lang + "/*.json"]).pipe(gulp.dest(paths.dist));

    return gulp.src("index.html").pipe(gulp.dest(paths.dist));
});

gulp.task('run', ['deploy'], function() {
    return gulp.src([paths.dist])
        .pipe(webserver({
            livereload: {
                enable: true
            }
        }));
});

/*
Domácí úkol:

vytvořte gulp tasky, které:
0) clean: smaže předchozí build adresář "target" pokud existuje (můžete využít balík gulp-clean)
1) templates: všechny potřebné HTML šablony se uloží do jednoho js souboru "templates.js" v adresáři target (pomůže vám balík gulp-angular-templatecache)
2) build: vytvoří concatenovaný soubor ze zdrojáků (*.js) a uloží jej do adresáře "target"
        POZOR: Mezi soubory jsou závislosti a nelze je slepit za sebe jen tak halabala, pomůže vám balík gulp-angular-filesort
3) vendor: vytvoří "target/vendor.js" z js souborů natahovaných z bower_components (pokuste se použít jen nutné soubory, build by měl být co nejmenší)
4) deploy: alternativa k tasku webserver, která bude servírovat adresář "target"

Mimo jiné budete potřebovat nový index.html obsažený v build adresáři využívající právě a pouze vyrobené js soubory templates.js, vendor.js a app.js.
Jak jej vyrobíte je čistě na Vás.
 */