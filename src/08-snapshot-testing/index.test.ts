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

  test('should return empty linked list for empty array', () => {
    const list = generateLinkedList([]);

    expect(list).toStrictEqual({
      value: null,
      next: null,
    });
  });

  test('should generate linked list for single element array', () => {
    const list = generateLinkedList([42]);

    expect(list).toStrictEqual({
      value: 42,
      next: {
        value: null,
        next: null,
      },
    });
  });

  test('should preserve null values inside array as node values', () => {
    const list = generateLinkedList([null, 1]);

    expect(list).toStrictEqual({
      value: null,
      next: {
        value: 1,
        next: {
          value: null,
          next: null,
        },
      },
    });
  });
});
