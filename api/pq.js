/**
 * FULI 서버 — 양자내성 헬퍼 (pq.js)
 *
 *  ML-KEM-768 (NIST FIPS 203) + AES-256-GCM
 *  - encapsulate(clientPkB64) : 클라 공개키로 캡슐화 → { ctB64, ssB64 }
 *      · ct(암호문)는 클라로 보내고, ss(공유키)는 서버가 보관(KV)했다가 복호에 씀
 *  - aesDecrypt(ssB64, payload): 공유키로 AES-256-GCM 복호 → 평문(비번+단어)
 *  - aesEncrypt(ssB64, plain)  : (서버→클라 필요 시) 암호화
 *
 *  의존: @noble/post-quantum, node crypto(내장)
 *  주의: 이 구현(@noble)은 NIST 알고리즘이지만 라이브러리 독립 감사는 진행 전.
 *        전송 보호용(HNDL 방어)으로 충분하며, TLS 위에 한 겹 더 얹는 구조.
 */
const { ml_kem768 } = require('@noble/post-quantum/ml-kem.js');
const crypto = require('crypto');

const PK_LEN = 1184;   // ML-KEM-768 공개키 길이(바이트) — 형식 검증용

// 서버: 클라이언트 공개키(base64)로 캡슐화 → 공유키 + 암호문
function encapsulate(clientPkB64) {
  const pk = Buffer.from(String(clientPkB64 || ''), 'base64');
  if (pk.length !== PK_LEN) throw new Error('bad client public key length: ' + pk.length);
  const { cipherText, sharedSecret } = ml_kem768.encapsulate(new Uint8Array(pk));
  return {
    ctB64: Buffer.from(cipherText).toString('base64'),
    ssB64: Buffer.from(sharedSecret).toString('base64'),
  };
}

// 공유키(base64)로 AES-256-GCM 복호 → 평문
//   payload = { iv, data, tag }  (모두 base64)
function aesDecrypt(ssB64, payload) {
  const ss = Buffer.from(ssB64, 'base64');
  if (ss.length !== 32) throw new Error('bad shared secret');
  const iv  = Buffer.from(payload.iv,   'base64');
  const data = Buffer.from(payload.data, 'base64');
  const tag  = Buffer.from(payload.tag,  'base64');
  const d = crypto.createDecipheriv('aes-256-gcm', ss, iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(data), d.final()]).toString('utf8');
}

// 공유키(base64)로 AES-256-GCM 암호화 (서버→클라 방향이 필요할 때)
function aesEncrypt(ssB64, plain) {
  const ss = Buffer.from(ssB64, 'base64');
  if (ss.length !== 32) throw new Error('bad shared secret');
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', ss, iv);
  const enc = Buffer.concat([c.update(String(plain), 'utf8'), c.final()]);
  return {
    iv:   iv.toString('base64'),
    data: enc.toString('base64'),
    tag:  c.getAuthTag().toString('base64'),
  };
}

module.exports = { encapsulate, aesDecrypt, aesEncrypt, PK_LEN };
