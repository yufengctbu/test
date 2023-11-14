import { MANUAL_HOST, parseManual } from './../../source/manual/manual';

describe('creator/manual parseManual', () => {
    const mount = 'creator/manual';
    const url = '{host}/{version}/manual/{lang}/concepts/scene/node-component.html';

    it('it should return host replaced url', () => {
        const result = parseManual(mount, url, { name: 'node', version: '', lang: '' });

        expect(result).toBeDefined();
        expect(result).toEqual(`${MANUAL_HOST}/{version}/manual/{lang}/concepts/scene/node-component.html`);
    });

    it('it should return replaced url without lang', () => {
        const result = parseManual(mount, url, { name: 'node', version: '3.7.1', lang: '' });

        expect(result).toBeDefined();
        expect(result).toEqual(`${MANUAL_HOST}/3.7/manual/{lang}/concepts/scene/node-component.html`);
    });

    it('it should return replaced url', () => {
        const result = parseManual(mount, url, { name: 'node', version: '3.7.1', lang: 'zh' });

        expect(result).toBeDefined();
        expect(result).toEqual(`${MANUAL_HOST}/3.7/manual/zh/concepts/scene/node-component.html`);
    });
});
