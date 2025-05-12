import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values (toStrictEqual)', () => {
    const list = generateLinkedList([1, 2, 3]);
    expect(list).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values (snapshot)', () => {
    const list = generateLinkedList(['a', 'b', 'c']);
    expect(list).toMatchSnapshot();
  });
});
