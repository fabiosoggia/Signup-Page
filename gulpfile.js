"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var jshint = require("gulp-jshint");
var less = require("gulp-less");
var rename = require("gulp-rename");
var stylish = require("jshint-stylish");
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var processhtml = require("gulp-processhtml");
var uncss = require("gulp-uncss");

var css = [
	"node_modules/normalize.css/normalize.css",
    "node_modules/basscss/css/basscss.css",
	"css/animate.css",
	"css/style.less"
];

var js = [
	"node_modules/parsleyjs/dist/parsley.js",
	"js/app.js"
];

var html = [
	"*.html"
];

var statics = [
    {
        from: "img/**/*",
        to: "img/"
    },
    {
        from: "node_modules/jquery/dist/jquery.min.js",
        to: "js/lib/"
    }
];

gulp.task("build", function() {
	gulp.src(css)
		.pipe(concat("style"))
		.pipe(less())
		.on("error", function (error) {
			console.error("Unable to LESS files due to", error);
		})
		.pipe(gulp.dest("build/css"));

	gulp.src(js)
		// Lint within the editor
        // .pipe(jshint())
        // .pipe(jshint.reporter(stylish))
        .pipe(concat("app.js"))
        .pipe(gulp.dest("build/js"));

    gulp.src(html)
        .pipe(gulp.dest("build/"));


    for (var i = statics.length - 1; i >= 0; i--) {
        var element = statics[i];
        gulp.src([element.from])
            .pipe(gulp.dest("build/" + element.to));
    }

});

gulp.task("watch", function() {
	gulp.watch("*", ["build"]);
});

gulp.task("dist", function() {
    gulp.src(css)
        .pipe(concat("style"))
        .pipe(less())
        .on("error", function (error) {
            console.error("Unable to LESS files due to", error);
        })
        .pipe(uncss({
            "html": html,
            "ignore": [
                /parsley-/
            ]
        }))
        .pipe(cssmin())
        .pipe(rename({
            extname: ".min.css"
         }))
        .pipe(gulp.dest("dist/css"));

    gulp.src(js)
        .pipe(concat("app.js"))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
         }))
        .pipe(gulp.dest("dist/js"));

    gulp.src(html)
        .pipe(processhtml())
        .pipe(gulp.dest("dist/"));

    for (var i = statics.length - 1; i >= 0; i--) {
        var element = statics[i];
        gulp.src([element.from])
            .pipe(gulp.dest("dist/" + element.to));
    }
});

gulp.task("default", ["build"]);
