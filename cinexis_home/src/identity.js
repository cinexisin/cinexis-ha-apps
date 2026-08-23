/**
 * Device identity.
 *
 * On first start this generates an Ed25519 keypair inside the add-on. The
 * private half never leaves the house: it is never transmitted, never logged,
 * never included in a diagnostic bundle, and there is no code path that reads it
 * out. What goes to CINEXIS is the public half.
 *
 * That is what makes revocation meaningful. There is no fleet-wide token to
 * rotate, one device can be withdrawn without touching any other, and a revoked
 * key is refused if it ever comes back — so uninstall-and-reinstall cannot
 * revive an identity somebody deliberately withdrew.
 */
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const DATA = process.env.CINEXIS_HOME_DATA || '/data';
const KEY_FILE = path.join(DATA, 'device_key.pem');
const PUB_FILE = path.join(DATA, 'device_key.pub');
const INSTALL_FILE = path.join(DATA, 'install_id');
const STATE_FILE = path.join(DATA, 'enrolment.json');

function ensureDir() {
  if (!fs.existsSync(DATA)) fs.mkdirSync(DATA, { recursive: true, mode: 0o700 });
}

/** 0600, and generated once. A regenerated key is a new device to the server. */
function keypair() {
  ensureDir();
  if (fs.existsSync(KEY_FILE)) {
    const privatePem = fs.readFileSync(KEY_FILE, 'utf8');
    const publicPem = fs.existsSync(PUB_FILE)
      ? fs.readFileSync(PUB_FILE, 'utf8')
      : crypto.createPublicKey(privatePem).export({ type: 'spki', format: 'pem' }).toString();
    return { privatePem, publicPem };
  }
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  const publicPem = publicKey.export({ type: 'spki', format: 'pem' }).toString();
  fs.writeFileSync(KEY_FILE, privatePem, { mode: 0o600 });
  fs.writeFileSync(PUB_FILE, publicPem, { mode: 0o644 });
  return { privatePem, publicPem };
}

/** The public half only. Nothing else in this module is exported for sending. */
function publicKey() { return keypair().publicPem; }

/**
 * A privacy-preserving installation identifier.
 *
 * Random, local, and not derived from anything about the house — not the MAC,
 * not the hostname, not the Home Assistant UUID. It distinguishes reinstalls
 * without describing the installation.
 */
function installId() {
  ensureDir();
  if (fs.existsSync(INSTALL_FILE)) return fs.readFileSync(INSTALL_FILE, 'utf8').trim();
  const id = 'ins_' + crypto.randomBytes(16).toString('hex');
  fs.writeFileSync(INSTALL_FILE, id, { mode: 0o600 });
  return id;
}

/** Sign a challenge with the device key. The key itself never leaves. */
function sign(data) {
  return crypto.sign(null, Buffer.from(String(data), 'utf8'),
                     crypto.createPrivateKey(keypair().privatePem)).toString('base64');
}

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { return null; }
}
function saveState(s) {
  ensureDir();
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2), { mode: 0o600 });
}
function clearState() { try { fs.unlinkSync(STATE_FILE); } catch {} }

/**
 * Forget this identity entirely.
 *
 * Used on explicit re-enrolment. The key is overwritten before removal so it is
 * not recoverable from a freed block.
 */
function destroy() {
  for (const f of [KEY_FILE, PUB_FILE, STATE_FILE]) {
    try {
      if (fs.existsSync(f)) {
        fs.writeFileSync(f, crypto.randomBytes(Math.max(fs.statSync(f).size, 64)));
        fs.unlinkSync(f);
      }
    } catch {}
  }
}

module.exports = { publicKey, installId, sign, loadState, saveState, clearState, destroy,
                   _paths: { KEY_FILE, PUB_FILE, INSTALL_FILE, STATE_FILE } };
