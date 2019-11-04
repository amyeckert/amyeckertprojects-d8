const autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    babel = require('gulp-babel'),
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    data = require('gulp-data'),
    eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sasslint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify')
    ;

    const jsFunctionalitySource = 'scripts/source/functionality/*.js';
    const jsVendorBasePath = 'scripts/vendor';
    const svgSource = 'images/svg/*.svg';
    const animationSource = 'styles/animation.scss';
    const jsDest = 'scripts';
     
    const js = gulp.series(scripts);
    const watch = gulp.parallel(watchFiles);
    const build = gulp.series(
        scripts,
        stylesSassLint,
        stylesSite
    );
    const styles = gulp.parallel(
        stylesSassLint,
        stylesSite
    );
    const all = gulp.series(
        stylesSite,
        stylesSassLint,
        scripts,
        scriptsJsLint,
        scriptsPlugins
    );
    
    // SCRIPTS
    function scriptsJsLint() {
        return (
            gulp
                .src([
                    jsFunctionalitySource,
                    '!scripts/source/functionality/utility.js',
                    '!scripts/source/functionality/image-slider.js'
                ])
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failAfterError())
                .on('error', notify.onError({
                    message: 'ESLint Errors',
                    onLast: true
                }))
        );
    }
    
    function scripts() {
        return (
            gulp
                .src([jsFunctionalitySource])
                .pipe(plumber())
                .pipe(concat('scripts.js'))
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(uglify())
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(gulp.dest(jsDest))
                .pipe(notify({
                    message: 'Scripts Compiled',
                    onLast: true
                }))
        );
    }
    
    function scriptsPlugins() {
        return (
            gulp
                .src([
                    'scripts/vendor/**/*.js',
                    'scripts/vendor/**/**/*.js'
                ])
                .pipe(plumber())
                .pipe(concat('plugins.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest(jsDest))
                .pipe(notify({
                    message: 'Plugins Compiled',
                    onLast: true
                }))
        );
    }
    
    
    // STYLES
    function stylesSite() {
        return (
            gulp
                .src('styles/scss/styles.scss')
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(plumber())
                .pipe(cleancss({
                    keepSpecialComments: false,
                    processImport: false
                }))
                .pipe(postcss([autoprefixer(), cssnano()]))
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('styles'))
                .pipe(notify({
                    message: '"Styles - Site" Task Completed'
                }))
        );
    }
    
    function stylesSassLint() {
        return (
            gulp
                .src('styles/**/*.s+(a|c)ss')
                .pipe(sasslint({
                    options: {
                        formatter: 'stylish',
                        'merge-default-rules': true
                    },
                    files: {
                        ignore: ['styles/vendor/*.scss', 'styles/vendor/**/*.scss', 'styles/global/_fonts.scss']
                    },
                    configFile: '.sass-lint.yml'
                }))
                .pipe(sasslint.format())
                .pipe(sasslint.failOnError())
                .on('error', notify.onError({
                    message: 'SASS Lint Errors',
                    onLast: true
                }))
        );
    }
    
    // OTHER
    // function animation() {
    //     return (
    //         gulp
    //             .src(animationSource)
    //             .pipe(sourcemaps.init())
    //             .pipe(sass())
    //             .pipe(plumber())
    //             .pipe(postcss([autoprefixer(), cssnano()]))
    //             .pipe(cleancss({
    //                 keepSpecialComments: false,
    //                 processImport: false
    //             }))
    //             .pipe(rename({
    //                 suffix: '.min'
    //             }))
    //             .pipe(sourcemaps.write())
    //             .pipe(gulp.dest('styles'))
    //             .pipe(notify({
    //                 message: '"Hero/Related Animation CSS" Task Completed',
    //                 onLast: true
    //             }))
    //     );
    // }
    
    // WATCH
    function watchFiles() {
        gulp.watch(['styles/**/*.scss', 'styles/*.scss'], gulp.series(gulp.parallel(stylesSite, stylesStyleGuide, stylesSassLint)));
        gulp.watch([jsVendorBasePath + '/**/**/*.js', jsVendorBasePath + '/**/*.js', jsVendorBasePath + '/*.js'], gulp.series(scriptsPlugins));
        gulp.watch(jsFunctionalitySource, gulp.series(scripts, scriptsJsLint));
    }
    
    exports.watch = watch;
    exports.js = js;
    exports.build = build;
    exports.styles = styles;
    exports.all = all; // formerly known as the 'default' task
    
    // To run functions individually use these
    exports.stylesSite = stylesSite;
    exports.scriptsJsLint = scriptsJsLint;
   












// var gulp = require('gulp');
// var autoprefixer = require('gulp-autoprefixer');
// var concat = require('gulp-concat');
// var minifycss = require('gulp-minify-css');
// var cleanCSS = require('gulp-clean-css');
// var notify = require('gulp-notify');
// var plumber = require('gulp-plumber');
// var rename = require('gulp-rename');
// var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');

// var paths = {
//     styles: ['./styles/scss/global/*.scss', './styles/scss/partials.scss' ]
// }

// gulp.task('css', function () {
//     gulp.src(paths.styles)
//         .pipe(plumber())
//         .pipe(sass())
//         .pipe(minifycss())
//         .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
//         .pipe(gulp.dest('css'))
//         .pipe(notify({message: 'SCSS Compiled!'}));
// });

// gulp.task('js', function () {

//     gulp.src('.scripts/vendor/plugins/*.js')
//         .pipe(plumber())
//         .pipe(concat('plugins.min.js'))
//         //.pipe(uglify())
//         .pipe(gulp.dest('./scripts/vendor'))
//         .pipe(notify({message: 'Plugins Compiled and Minified!'}));

//     gulp.src('./scripts/functionality.js')
//         .pipe(plumber())
//         .pipe(uglify())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('scripts'))
//         .pipe(notify({message: 'Scripts Compiled!'}));
// });

// gulp.task('watch', function () {
//     gulp.watch('./styles/scss/*.scss', ['css']);
//     gulp.watch('./styles/scss/**/*.scss', ['css']);
//     gulp.watch('./scripts/vendor/plugins/*.js', ['js']);
//     gulp.watch('./scripts/functionality.js', ['js']);
// });

// gulp.task('default', ['watch', 'css', 'js']);