const { traverse, splitPathIntoParts } = require('../index.js');

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

	});

});
