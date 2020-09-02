var gulp = require("gulp");
var merge2 = require("merge2");
var gulpConcat = require("gulp-concat");
const javascriptObfuscator = require('gulp-javascript-obfuscator');


<<<<<<< HEAD
gulp.task("default", function() {
    c = gulp.src('js/*.js')

    merge2([c])
        .pipe(gulpConcat("./dist/amt.js"))
        .pipe(javascriptObfuscator({ compact: true, deadCodeInjection: true, stringArrayEncoding: true, renameGlobals: true }))
        .pipe(gulp.dest("."));
=======
gulp.task("default", function () {
	c = gulp.src('js/*.js')
    
    merge2([c])
    .pipe(gulpConcat("./dist/amt.js"))
    .pipe(javascriptObfuscator({compact:true, deadCodeInjection: true, stringArrayEncoding: true, renameGlobals: true}))
	.pipe(gulp.dest("."));
>>>>>>> 1f47442253a19d731b071aa5ac6371bf945759c4
    //.pipe(gulp.dest('dist'));
});