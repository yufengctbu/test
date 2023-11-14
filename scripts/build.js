const copyfiles = require('copyfiles');

// 设置源文件路径和目标目录
// 在这个例子中，我们复制 'source' 目录下所有的 '.json5' 文件到 'dist' 目录
const paths = ['source/**/*.json5', 'dist'];

// 执行复制操作
// 'up' 参数设置为 1，这等同于命令行中的 '-u 1'
copyfiles(paths, { up: 1 }, function (err) {
    if (err) {
        console.error('复制文件时出错:', err);
    } else {
        console.log('文件复制成功！');
    }
});
