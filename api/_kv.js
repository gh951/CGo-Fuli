/**
 * FULI — KV 저장소 어댑터 (Upstash Redis)
 *
 * Vercel Marketplace에서 Upstash 통합을 설치하면 환경변수가 자동 주입됩니다.
 * KV_REST_API_URL/TOKEN 또는 UPSTASH_REDIS_REST_URL/TOKEN — 어느 쪽이든 대응.
 *
 * verify.js·register.js·challenge.js 가 쓰는 인터페이스:
 *   isKVAvailable, kvGet, kvSet, kvDel, kvIncr
 */
let redis = null;
try {
  const { Redis } = require('@upstash/redis');
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) redis = new Redis({ url, token });
} catch (e) { redis = null; }

const ready = () => !!redis;

module.exports = {
  isKVAvailable: () => ready(),
  kvGet: async (k) => { try { return ready() ? await redis.get(k) : null; } catch (e) { return null; } },
  kvSet: async (k, v, opts) => {
    try {
      if (ready()) {
        if (opts && opts.ex) await redis.set(k, v, { ex: opts.ex });
        else await redis.set(k, v);
      }
      return true;
    } catch (e) { return false; }
  },
  kvDel: async (k) => { try { if (ready()) await redis.del(k); return true; } catch (e) { return false; } },
  kvIncr: async (k) => { try { return ready() ? await redis.incr(k) : null; } catch (e) { return null; } },
};
