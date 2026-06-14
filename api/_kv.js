/**
 * FULI — KV 저장소 어댑터 (Vercel KV / Upstash Redis)
 *
 * verify.js·register.js·challenge.js 가 쓰는 인터페이스:
 *   isKVAvailable, kvGet, kvSet, kvDel, kvIncr
 *
 * Vercel 대시보드 → Storage → KV 를 만들어 이 프로젝트에 연결하면
 * 아래 환경변수가 자동으로 주입됩니다:
 *   KV_REST_API_URL, KV_REST_API_TOKEN
 */
let kv = null;
try { kv = require('@vercel/kv').kv; } catch (e) { kv = null; }

const ready = () =>
  !!(kv && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

module.exports = {
  isKVAvailable: () => ready(),
  kvGet: async (k) => { try { return ready() ? await kv.get(k) : null; } catch (e) { return null; } },
  kvSet: async (k, v, opts) => { try { if (ready()) await kv.set(k, v, opts || undefined); return true; } catch (e) { return false; } },
  kvDel: async (k) => { try { if (ready()) await kv.del(k); return true; } catch (e) { return false; } },
  kvIncr: async (k) => { try { return ready() ? await kv.incr(k) : null; } catch (e) { return null; } },
};
