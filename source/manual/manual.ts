import { parse } from 'semver';

export const MANUAL_HOST = 'https://docs.cocos.com/creator';

export const REPLACE_REG = /\{\s*([^}]*?)\s*\}/g;

// 需要传传递到服务端的数据
interface IParam {
    name: string; // 标签名称
    version: string; // 编辑器版本
    lang: string; // 语言
}

/**
 * 解析手册的url
 * @param mount
 * @param url
 * @param param
 * @returns
 */
export const parseManual = (mount: string, url: string, param: IParam): string => {
    const { version } = param;

    const parsedVersion = parse(version);

    const majorVersion = parsedVersion ? `${parsedVersion.major}.${parsedVersion.minor}` : '';

    const replaceObject: Record<string, string> = { ...param, version: majorVersion, host: MANUAL_HOST };

    if(!mount) return ''

    return url.replace(REPLACE_REG, ($: string, val: string): string => {
        const replaceKey = val.trim();

        if (replaceObject[replaceKey]) return replaceObject[replaceKey];

        return $;
    });
};
