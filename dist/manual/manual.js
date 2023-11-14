"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseManual = exports.REPLACE_REG = exports.MANUAL_HOST = void 0;
const semver_1 = require("semver");
exports.MANUAL_HOST = 'https://docs.cocos.com/creator';
exports.REPLACE_REG = /\{\s*([^}]*?)\s*\}/g;
const parseManual = (mount, url, param) => {
    const { version } = param;
    const parsedVersion = (0, semver_1.parse)(version);
    const majorVersion = parsedVersion ? `${parsedVersion.major}.${parsedVersion.minor}` : '';
    const replaceObject = Object.assign(Object.assign({}, param), { version: majorVersion, host: exports.MANUAL_HOST });
    return url.replace(exports.REPLACE_REG, ($, val) => {
        const replaceKey = val.trim();
        if (replaceObject[replaceKey])
            return replaceObject[replaceKey];
        return $;
    });
};
exports.parseManual = parseManual;
