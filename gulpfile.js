var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

gulp.task('inject', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});

gulp.task('webserver', ['inject'], function() {
    return gulp.src(['src', 'bower_components'])
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