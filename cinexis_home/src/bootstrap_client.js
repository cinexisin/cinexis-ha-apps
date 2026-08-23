/**
 * Bootstrap client — verifies before it trusts.
 *
 * The signing public key is baked into this image at build time. TLS proves we
 * reached the host we asked for; it does not prove the document is the one
 * CINEXIS published, because a compromised CDN or a mis-issued certificate both
 * produce a well-formed HTTPS response.
 *
 * A document that does not verify is discarded and the app reports
 * `server_unavailable`. It never falls back to a default endpoint — an add-on
 * that accepted an unsigned or unverifiable bootstrap would accept any
 * bootstrap, which is the whole attack this design removes.
 */
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/** Release metadata, baked in. Not a setting, and not visible to the owner. */
const CHANNEL = (process.env.CINEXIS_CHANNEL || 'stable').trim();
const BOOTSTRAP_URL = process.env.CINEXIS_BOOTSTRAP_URL
  || 'https://go.cinexis.cloud/api/ha/bootstrap';

function publicKeyPem() {
  if (process.env.CINEXIS_BOOTSTRAP_PUBKEY) {
    return process.env.CINEXIS_BOOTSTRAP_PUBKEY.replace(/\\n/g, '\n');
  }
  const f = path.join(__dirname, '..', 'keys', 'bootstrap.pub');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
}

/** Must match the server's canonicaliser byte for byte. */
function canonical(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
  return '{' + Object.keys(v).sort()
    .map(k => JSON.stringify(k) + ':' + canonical(v[k])).join(',') + '}';
}

function verify(doc, pem) {
  try {
    if (!doc || !doc.payload || !doc.signature || doc.signature_alg !== 'ed25519') return null;
    const ok = crypto.verify(null, Buffer.from(canonical(doc.payload), 'utf8'),
                             crypto.createPublicKey(pem), Buffer.from(doc.signature, 'base64'));
    if (!ok) return null;
    if (doc.payload.document_version !== 1) return null;
    const now = Math.floor(Date.now() / 1000);
    if (typeof doc.payload.expires_at === 'number' && doc.payload.expires_at < now) return null;
    // A stable build must not be handed an rc document, or the reverse.
    if (doc.payload.channel !== CHANNEL) return null;
    return doc.payload;
  } catch { return null; }
}

let cached = null;

async function fetchBootstrap({ force = false } = {}) {
  const now = Math.floor(Date.now() / 1000);
  if (!force && cached && cached.expires_at > now + 60) return cached;

  const pem = publicKeyPem();
  if (!pem) {
    const e = new Error('no_bootstrap_public_key'); e.code = 'no_bootstrap_public_key'; throw e;
  }

  const url = `${BOOTSTRAP_URL}?channel=${encodeURIComponent(CHANNEL)}`;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 15000);
  let doc;
  try {
    const res = await fetch(url, { signal: ctl.signal, headers: { accept: 'application/json' } });
    if (!res.ok) { const e = new Error('bootstrap_http_' + res.status); e.code = 'server_unavailable'; throw e; }
    doc = await res.json();
  } finally { clearTimeout(t); }

  const payload = verify(doc, pem);
  if (!payload) {
    // Discarded, not used with a warning. There is no safe way to proceed on a
    // document we cannot authenticate.
    const e = new Error('bootstrap_verification_failed');
    e.code = 'bootstrap_verification_failed';
    throw e;
  }
  cached = payload;
  return payload;
}

function _reset() { cached = null; }

module.exports = { CHANNEL, fetchBootstrap, verify, canonical, publicKeyPem, _reset };
