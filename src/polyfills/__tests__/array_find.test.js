import setupArrayFindPolyfill from '../array_find';

const testArray = [
    {
        id: 1,
        name: 'test1'
    },
    {
        id: 2,
        name: 'test2'
    }
];

describe('Polyfills', () => {
    it("should not add polyfill for array's find method if it is already exists", () => {
        expect(Array.prototype.find).toBeDefined();
        setupArrayFindPolyfill();
        expect(Array.prototype.find).toBeDefined();
    });

    it("it should add polyfill for array's find method", () => {
        Array.prototype.find = undefined;
        setupArrayFindPolyfill();
        expect(Array.prototype.find).toBeDefined();
        expect(testArray.find(item => item.id === 2)).toEqual({
            id: 2,
            name: 'test2'
        });
    });

    it('it should throw an error if context of find method is null', () => {
        Array.prototype.find = undefined;
        setupArrayFindPolyfill();
        expect(Array.prototype.find.bind(null, () => {})).toThrowError();
    });

    it('it should throw an error if an argument of find method is not a function', () => {
        Array.prototype.find = undefined;
        setupArrayFindPolyfill();
        expect(Array.prototype.find.bind(testArray, {})).toThrowError();
    });

    it('it should return undefined if wanted element is not found', () => {
        Array.prototype.find = undefined;
        setupArrayFindPolyfill();
        expect(testArray.find(item => item.id === 3)).toEqual(undefined);
    });
});
