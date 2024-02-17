import { getConfig } from './getConfig.func.js';

describe('getConfig', () => {
  const originalProcessEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalProcessEnv };
  });

  afterEach(() => {
    process.env = originalProcessEnv;
  });

  it('should return the expected config', () => {
    process.env['API_KEY'] = 'API_KEY';
    process.env['BASE_URL'] = 'BASE_URL';

    const expectedConfig = {
      API_KEY: 'API_KEY',
      BASE_URL: 'BASE_URL',
    };

    expect(getConfig()).toEqual(expectedConfig);
  });
  
    it('should throw an error if API_KEY is not set', () => {
        process.env['BASE_URL'] = 'BASE_URL';
    
        expect(getConfig).toThrow();
    });
});
