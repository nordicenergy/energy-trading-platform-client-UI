import { getQueryParameter } from '../url-params';

describe('Url parameters Service', () => {
    const queryString = '?username=demo@example.com&otherParam=test&anotherParam=&rest';

    it('should return correct query param value date', () => {
        expect(getQueryParameter(queryString, 'username')).toBe('demo@example.com');
        expect(getQueryParameter(queryString, 'someOther')).toBe('');
        expect(getQueryParameter(queryString, 'otherParam')).toBe('test');
        expect(getQueryParameter(queryString, 'anotherParam')).toBe('');
        expect(getQueryParameter(queryString, 'rest')).toBe('');
        expect(getQueryParameter(queryString, null)).toBe('');
        expect(getQueryParameter(queryString)).toBe('');
        expect(getQueryParameter()).toBe('');
    });
});
