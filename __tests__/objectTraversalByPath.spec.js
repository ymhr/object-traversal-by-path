const { traverse, mutate, splitPathIntoParts } = require('../index.js');

describe('objectTraversalByPath', () =>
{
	describe('analysing the path', () =>
	{
		it('should break a path with no array correctly', () =>
		{
			const path = 'a.b.c.d';
			expect(splitPathIntoParts(path)).toEqual(['a', 'b', 'c', 'd']);
		});

		it('should break apart string with arrays correctly', () =>
		{
			const path = 'a.b[0].c.d[1]';

			expect(splitPathIntoParts(path)).toEqual(['a', 'b', '0', 'c', 'd', '1']);
		});
	});

	describe('traversing objects', () =>
	{
		const objectToBeTraversed = {
			a: {
				b: {
					c: [
						{
							d: 'test'
						},
						{
							e: {
								f: 'nested'
							}
						}
					]
				}
			}
		};

		it('should corrctly traverse object', () =>
		{
			const path = 'a.b.c[0].d';

			expect(traverse(path, objectToBeTraversed)).toBe('test');
		});

		it('should be able to return an object too', () =>
		{
			const path = 'a.b.c[1].e';
			expect(traverse(path, objectToBeTraversed)).toEqual({ f: 'nested' });
		});

		it('should be able to go only 1 level deep (no dots)', () =>
		{
			const path = 'a';
			expect(traverse(path, { a: 'test' })).toBe('test');
		});

		it('should return undefined if the property does not exist', () =>{
			const path = 'a.b';
			const objectToBeTraversed = {
				a: {
					c: 'test'
				}
			}
			expect(traverse(path, objectToBeTraversed)).toBe(undefined);
		});

		it('should return undefined if the property does not exist deeply nested', () =>{
			const path = 'a.b.c.d';
			const objectToBeTraversed = {
				a: {
					c: 'test'
				}
			}
			expect(traverse(path, objectToBeTraversed)).toBe(undefined);
		});

	});

	describe('mutating', () =>
	{
		it('should be able to change a specific value based on a callback', () =>
		{
			const path = 'a.b';
			const objectToBeTraversed = {
				a: {
					b: 'hello'
				}
			};
			const callback = (originalValue) => {
				return 'test';
			};
			const newObject = mutate(path, objectToBeTraversed, callback);

			expect(newObject.a.b).toEqual('test');
		});

		it('should be able to change a specific array value based on a callback', () =>
		{
			const path = 'a.b[1].c';
			const objectToBeTraversed = {
				a: {
					b: [
						{ c: 'one' },
						{ c: 'two' }
					]
				}
			};
			const callback = (originalValue) => {
				return 'test';
			};
			const newObject = mutate(path, objectToBeTraversed, callback);

			expect(newObject.a.b[1].c).toEqual('test');
		});

		it('should be able to completely replace parts of an object', () =>{
			const path = 'a.b';
			const objectToBeTraversed = {
				a: {
					b: [
						{ c: 'one' },
						{ c: 'two' }
					]
				}
			};
			const callback = (originalValue) => {
				return { d: { e: 'new object' } };
			};
			const newObject = mutate(path, objectToBeTraversed, callback);

			expect(newObject.a.b).toEqual({ d: { e: 'new object' } });
		});

		it('should be able to replace the value for a 1 level-deep path', () => {
			const path = 'a';
			const objectToBeTraversed = {
				a: {
					b: [
						{ c: 'one' },
						{ c: 'two' }
					]
				}
			};
			const callback = (originalValue) => {
				return 'test';
			};
			const newObject = mutate(path, objectToBeTraversed, callback);

			expect(newObject.a).toEqual('test');
		});
	});

});
