module.exports = {
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testEnvironment: 'node',
    collectCoverage: true,
    coverageThreshold: {
        global: {
            // 配置代码的覆盖率需要为100%
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    coverageDirectory: './coverage',
    collectCoverageFrom: ['source/**/*.(t|j)s'],
    moduleFileExtensions: ['ts', 'json5', 'js', 'json'],
};
