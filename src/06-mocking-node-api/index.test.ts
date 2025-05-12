import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from './index';
import { join } from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path', () => ({
  join: jest.fn(() => '/mocked/path/file.txt'),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(3000);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockedExistsSync = fs.existsSync as jest.Mock;
  const mockedReadFile = fsPromises.readFile as jest.Mock;
  const mockedJoin = join as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    mockedExistsSync.mockReturnValue(false);
    await readFileAsynchronously('test.txt');
    expect(mockedJoin).toHaveBeenCalledWith(expect.any(String), 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    mockedExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('notfound.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValueOnce(Buffer.from('Hello World'));
    const result = await readFileAsynchronously('file.txt');
    expect(result).toBe('Hello World');
  });
});