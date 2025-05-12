import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
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
});