const gulp = require('gulp');
const path = require('path');
const ts = require("gulp-typescript");
const rename = require('gulp-rename');
const {spawn} = require('child_process');
const colors = require('colors');
const os = require('os'), iptable = {}, ifaces = os.networkInterfaces();
const fs = require('fs');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});
function getTsProject(){
    return  ts.createProject('tsconfig.json')();
}


//get ip
Object.keys(ifaces).forEach((item) => {
    ifaces[item].forEach((details) => {
        if (details.family === 'IPv4') {
            iptable[item] = details.address;
        }
    });
});

function getIp() {
    for (let item in iptable) {
        if (iptable.hasOwnProperty(item)) {
            if (iptable[item] !== '127.0.0.1') {
                return iptable[item]
            }
        }
    }
    return '127.0.0.1';

}


//files
const watchList = [
    '!node_modules/**/*',
    './src/**/*.ts',
    // './**/src/**/*.ts',//二者区别，上面不含src输出目录，此处会输出src

].map(function (item) {
    return path.join(__dirname, item);
});

function getFileParent(name) {
    let index = name.lastIndexOf('/');
    return name.substring(0, index).replace('/src', '/bin');
}


//server
// const server = {
//     process: null,
//     start() {
//         let service = spawn('node', [path.join(__dirname, './bin/www.js')]);
//         this.process = service;
//         console.log('server start'.green);
//         console.log(`http://${getIp()}:9060`.cyan);
//         /**
//          * log
//          */
//         service.stdout.on('data', data => {
//             console.log(data.toString().yellow);
//         });
//         /**
//          * debug msg
//          */
//         service.stderr.on('data', data => {
//             console.log(data.toString());
//         });
//     },
//     end() {
//         try {
//             this.process.kill();
//             console.log('server end'.red);
//         } catch (e) {
//             console.log(e);
//         }
//
//     },
//     restart() {
//         console.log('reloading...'.yellow);
//         this.end();
//         this.start();
//     }
// };


// gulp.task('test', (cb) => {
//     process.env.TZ_ENV = 'dev';
//     let service = spawn('node', [path.join(__dirname, './bin/test.js')]);
//
//     service.stdout.on('data', data => {
//         console.log('data------');
//         console.log(data.toString());
//     });
//     service.stderr.on('data', data => {
//         console.log('error------');
//         console.log(data.toString());
//     });
//     cb()
// });

//compile all
gulp.task('compile', (cb) => {
    gulp.src(watchList)
        .pipe(getTsProject())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(gulp.dest(path.join(__dirname, './bin'))).on('end', cb);
});

/**
 *
 * @param files 文件路径
 * @param cb //完成回调
 */
function compileFiles(files, cb) {
    // server.end();
    let hasError = false;
    console.log(files.toString());
    gulp.src(files)
        .pipe(getTsProject().on('error', (e) => {
            console.log(e);
            hasError = true;
        }))
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(gulp.dest(function (vinyl) {
            // console.log('--------')
            // for (key in vinyl) {
            //     console.log(key)
            // }
            return getFileParent(vinyl.path)
        }))
        .on('end', () => {
            // if (!hasError) {
            //     server.start();
            // }
            if (cb) {
                cb();
            }
        });
}

//dev
gulp.task('dev', gulp.series('compile', () => {
    // server.start();
    let times;//定时器
    // let isCompling=false;//编译中
    const set = new Set();//文件列表
    gulp.watch(watchList).on('change', (path) => {
        console.log(path.blue + '---changed'.green);
        set.add(path);
        if (times) {
            clearTimeout(times);
        }
        times = setTimeout(() => {
            let files=[...set.values()];
            set.clear();
            compileFiles(files);
        }, 200);
    });
}));


//init
gulp.task('init', function (cb) {
    const dirs = [
        './bin',
        './src/domain',
        './src/database'
    ].map(function (item) {
        return path.join(__dirname, item);
    });
    dirs.forEach(function (item) {
        if (!fs.existsSync(item)) {
            fs.mkdirSync(item)
        }
    });
    cb();
});


