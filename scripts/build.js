const copyfiles = require('copyfiles');
const { exec } = require('child_process');
const { join } = require('path');

// 设置源文件路径和目标目录
// 在这个例子中，我们复制 'source' 目录下所有的 '.json5' 文件到 'dist' 目录
const paths = ['source/**/*.json5', 'dist'];

// 执行复制操作
// 'up' 参数设置为 1，这等同于命令行中的 '-u 1'
const copyJson5Files = () => {
    return new Promise((resolve, reject) => {
        copyfiles(paths, { up: 1 }, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

const doExec = (command, opts = {}) => {
    return new Promise((resolve, reject) => {
        exec(command, { ...opts }, (err, stdout) => {
            if (err) return reject(err);

            resolve(stdout);
        });
    });
};

const init = async () => {
    const rootDir = process.cwd();
    await copyJson5Files();

    await doExec('jest --coverage --coverageReporters="json-summary"', { shell: true, cwd: rootDir });
    const coverageSummary = require(join(rootDir, 'coverage/coverage-summary.json'));
    const { lines, statements, functions, branches } = coverageSummary.total;

    if (lines.pct !== 100 || statements.pct !== 100 || functions.pct !== 100 || branches.pct !== 100) {
        throw new Error('代码覆盖率没有达到100%, 请运行 npm run test:cov 查看祥情');
    }

    await doExec(`git add dist`, { shell: true, cwd: rootDir });
};

init();
