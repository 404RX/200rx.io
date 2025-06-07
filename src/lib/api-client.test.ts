import { createHmac, webcrypto } from 'crypto';
import { TextEncoder } from 'util';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../config/env', () => ({ config: { apiUrl: '' } }));

const { generateNonce, generateSignature } = await import('./api-client');

beforeAll(() => {
  Object.defineProperty(global, 'crypto', { value: webcrypto });
  Object.defineProperty(window, 'crypto', { value: webcrypto });
  // jsdom does not provide TextEncoder
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextEncoder = TextEncoder;
});

describe('generateNonce', () => {
  it('creates a 32 character string', () => {
    const nonce = generateNonce();
    expect(nonce).toHaveLength(32);
  });

  it('produces different values each call', () => {
    const a = generateNonce();
    const b = generateNonce();
    expect(a).not.toEqual(b);
  });
});

describe('generateSignature', () => {
  it('creates deterministic HMAC SHA-256', async () => {
    const message = 'test-message';
    const key = 'secret-key';
    const expected = createHmac('sha256', key).update(message).digest('hex');
    const result = await generateSignature(message, key);
    expect(result).toEqual(expected);
  });
});
