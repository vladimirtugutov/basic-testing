import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: (...args: unknown[]) => unknown) => fn,
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'test' });

    const mockedInstance = {
      get: mockGet,
    } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockedInstance);

    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'ok' });
    const mockedInstance = { get: mockGet } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockedInstance);

    await throttledGetDataFromApi('/users');

    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, name: 'John' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    const mockedInstance = { get: mockGet } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockedInstance);

    const result = await throttledGetDataFromApi('/users/1');

    expect(result).toEqual(mockData);
  });

  test('should create new axios instance for each call', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'ok' });
    const mockedInstance = { get: mockGet } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockedInstance);

    await throttledGetDataFromApi('/posts/1');
    await throttledGetDataFromApi('/posts/2');

    expect(axios.create).toHaveBeenCalledTimes(2);
  });

  test('should call get exactly once per request', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'ok' });
    const mockedInstance = { get: mockGet } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockedInstance);

    await throttledGetDataFromApi('/comments');

    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  test('should propagate error if request fails', async () => {
    const mockError = new Error('Request failed');
    const mockGet = jest.fn().mockRejectedValue(mockError);
    const mockedInstance = { get: mockGet } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockedInstance);

    await expect(throttledGetDataFromApi('/users')).rejects.toThrow(
      'Request failed',
    );
  });
});
