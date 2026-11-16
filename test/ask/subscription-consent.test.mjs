import test from 'node:test';
import assert from 'node:assert/strict';
import subscribeHandler from '../../api/subscribe.js';
import contactHandler from '../../api/contact.js';

function reply() {
  return { code: 200, body: null, setHeader() { return this; }, status(code) { this.code = code; return this; }, json(value) { this.body = value; return this; } };
}
test('LifeEducation existing subscribers are never un-unsubscribed', async () => {
  const keys = ['NODE_ENV', 'RESEND_API_KEY', 'RESEND_LE_SEGMENT_ID', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'];
  const old = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  const savedFetch = globalThis.fetch;
  try {
    process.env.NODE_ENV = 'test';
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_LE_SEGMENT_ID = 'test-segment';
    process.env.CONTACT_TO_EMAIL = 'owner@example.invalid';
    process.env.CONTACT_FROM_EMAIL = 'form@example.invalid';
    const calls = [];
    globalThis.fetch = async (url, options) => {
      const path = new URL(url).pathname;
      calls.push({ path, method: options.method });
      if (path === '/contacts') return { ok: false, status: 409 };
      if (path.endsWith('/segments/test-segment') || path === '/emails') return { ok: true, status: 200 };
      throw new Error('Unexpected request to ' + path);
    };
    const req = body => ({ method: 'POST', headers: { host: 'www.lifeeducation.org', origin: 'https://www.lifeeducation.org' }, body, socket: { remoteAddress: '127.0.0.1' } });
    let result = reply();
    await subscribeHandler(req({ email: 'reader@example.invalid' }), result);
    assert.equal(result.code, 200);
    result = reply();
    await contactHandler(req({ name: 'Reader', email: 'reader@example.invalid', message: 'Hello', subscribe: 'yes' }), result);
    assert.equal(result.code, 200);
    assert.equal(result.body.ok, true);
    assert.equal(calls.filter(x => x.path.endsWith('/segments/test-segment')).length, 2);
    assert.equal(calls.some(x => x.method === 'PATCH'), false, 'No reactivation PATCH allowed');
  } finally {
    globalThis.fetch = savedFetch;
    for (const k of keys) old[k] === undefined ? delete process.env[k] : process.env[k] = old[k];
  }
});
