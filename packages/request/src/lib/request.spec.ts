import { request } from './request.js';

describe('request', () => {
  it('should work', () => {
    expect(request()).toEqual('request');
  });
});
