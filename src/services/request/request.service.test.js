import request, { combineHeaders } from '.';
import Methods from '../../utilities/methods';

const requestOptions = {
  url: 'http://example.com',
  method: Methods.GET,
  body: {
    bacon: 'baconbaconbacon',
  },
  headers: {
    BreakfastFoods: 'AreTheBest',
  },
};

const requestOptionsWithCredentials = {
  ...requestOptions,
  userCredentials: { username: 'demo', password: 'demo' },
};

jest.mock('Platform', () => {
  const Platform = require.requireActual('Platform');
  Platform.OS = 'ios';

  return Platform;
});
describe('Request Service Header Handling', () => {
  it('combineHeaders() can combine optional and default headers', () => {
    const result = combineHeaders(requestOptions);
    expect(result).toMatchSnapshot();
  });

  it('combineHeaders() can add basic authentication when necessary', () => {
    const resultWithoutBasicAuth = combineHeaders(requestOptions);
    const resultWithBasicAuth = combineHeaders(requestOptionsWithCredentials);

    expect(resultWithBasicAuth).not.toEqual(resultWithoutBasicAuth);
    expect(resultWithBasicAuth).toMatchSnapshot();
  });
});

describe('Request Service Request Handling', () => {
  it('request() can make an HTTP request using fetch', async () => {
    const json = jest.fn().mockImplementation(options => Promise.resolve({ ...options }));
    const res = options => ({ ok: true, json: () => json(options) });
    global.fetch = jest.fn().mockImplementation(options => Promise.resolve(res(options)));

    const response = await request(requestOptions);
    expect(response).toMatchSnapshot();
  });

  it('request() can throw when missing required parameters', () => {
    expect(() => request({})).toThrow('RequestOptions missing required property method or url');
  });

  it('request() can return an error message when an http request fails', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject());

    return request({ url: 'http://example.com', method: Methods.POST })
      .catch(err => expect(err).toMatchSnapshot());
  });

  it('request() can throw an error when the response is not ok', async () => {
    const json = jest.fn().mockImplementation(options => Promise.resolve({ ...options }));
    const res = options => ({ ok: false, json: () => json(options) });
    global.fetch = jest.fn().mockImplementation(options => Promise.resolve(res(options)));

    return request(requestOptions)
      .catch(err => expect(err).toMatchSnapshot());
  });

  it('request() can throw an error when the response status is 202', async () => {
    const json = jest.fn().mockImplementation(options => Promise.resolve({ ...options }));
    const res = options => ({ status: 202, json: () => json(options) });
    global.fetch = jest.fn().mockImplementation(options => Promise.resolve(res(options)));

    return request(requestOptions)
      .catch(err => expect(err).toMatchSnapshot());
  });
});
