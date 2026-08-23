/**
 * CINEXIS Home — ingress server.
 *
 * Serves the onboarding UI and proxies the enrolment steps to CINEXIS. It runs
 * behind Home Assistant ingress, so the person reading it is already an
 * authenticated Home Assistant user before the first pixel renders.
 *
 * DELIBERATELY ABSENT
 * -------------------
 * No frpc, no shell, no command execution, no Docker socket, no Supervisor API,
 * no /config or /share mount, no published port. The everyday app that runs in
 * every house all the time should have the smallest reach of anything we ship;
 * Remote Support is a separate, optional app that the owner activates and
 * approves per session.
 *
 * Written on the Node standard library. This image exists to be small and
 * auditable, and a web framework for six routes works against that.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const identity = require('./identity');
const boot = require('./bootstrap_client');
const ha = require('./ha_client');

const PORT = Number(process.env.INGRESS_PORT || 8099);
const UI_DIR = path.join(__dirname, '..', 'ui');

const json = (res, code, body) => {
  const s = JSON.stringify(body);
  res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(s);
};

function readBody(req) {
  return new Promise((resolve) => {
    let s = '';
    req.on('data', c => { s += c; if (s.length > 256 * 1024) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(s || '{}')); } catch { resolve({}); } });
  });
}

/** Call CINEXIS through the verified bootstrap. Never a hard-coded endpoint. */
async function cloud(pathname, init = {}) {
  const cfg = await boot.fetchBootstrap();
  const base = cfg.endpoints.enroll_base || cfg.endpoints.api_base;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 20000);
  try {
    const res = await fetch(base + pathname, {
      ...init, signal: ctl.signal,
      headers: { 'content-type': 'application/json', ...(init.headers || {}) },
    });
    return { status: res.status, body: await res.json().catch(() => ({})) };
  } finally { clearTimeout(t); }
}

/**
 * The single state endpoint the UI polls.
 *
 * It returns one of the sixteen contract states. Nothing here carries an
 * endpoint, a token, a node id or an FRP setting — the UI cannot leak what it is
 * never given.
 */
async function currentState() {
  const st = identity.loadState();

  let cfg = null, cloudReachable = true;
  try { cfg = await boot.fetchBootstrap(); }
  catch (e) {
    cloudReachable = false;
    if (e.code === 'bootstrap_verification_failed' || e.code === 'no_bootstrap_public_key') {
      return { state: 'server_unavailable', can_retry: true, local_control: 'ok',
               message: 'CINEXIS could not be verified. Your home keeps working.' };
    }
  }

  const detected = await ha.detect().catch(() => null);

  if (!st) {
    if (!detected) return { state: 'checking_home_assistant', can_retry: false, detected: null };
    if (!cloudReachable) {
      return { state: 'offline', can_retry: true, local_control: 'ok',
               message: 'No connection to CINEXIS. Your home keeps working.' };
    }
    return { state: 'enter_email', can_retry: false, detected };
  }

  if (st.state === 'connected') {
    // A revoked device must find out promptly, and must still say the house is fine.
    let remote = { state: 'active' };
    try {
      const r = await cloud(`/api/ha/device/${encodeURIComponent(st.device_id)}/state`, { method: 'GET' });
      if (r.status === 404) remote = { state: 'reenrollment_required' };
      else if (r.body && r.body.state) remote = r.body;
    } catch { cloudReachable = false; }

    if (remote.state === 'revoked') {
      return { state: 'revoked', can_retry: false, local_control: 'ok',
               masked_home_name: st.masked_home_name, masked_email: st.masked_email };
    }
    if (remote.state === 'reenrollment_required') {
      return { state: 'reenrollment_required', can_retry: false, local_control: 'ok' };
    }
    if (!cloudReachable) {
      return { state: 'offline', can_retry: true, local_control: 'ok',
               masked_home_name: st.masked_home_name, masked_email: st.masked_email,
               last_connected_at: st.last_connected_at ?? null };
    }
    return {
      state: 'connected', can_retry: false,
      masked_home_name: st.masked_home_name,
      masked_email: st.masked_email,
      home_assistant_detected: !!detected,
      cinexis_cloud: 'ok',
      // Always 'ok', and not a shrug. The owner is reading this page THROUGH
      // Home Assistant's ingress, so Home Assistant is demonstrably running the
      // house; a failed Supervisor probe is a fact about this add-on, not about
      // the lights. Reporting 'degraded' here would tell someone their home is
      // impaired because a version lookup timed out, which is both untrue and
      // the kind of false alarm that generates a support call at 11pm. The probe
      // result is not hidden — it is reported on its own line as
      // home_assistant_detected, which the UI renders as a warning.
      local_control: 'ok',
      wabot: 'ok',
      remote_support: 'not_installed',
      last_connected_at: st.last_connected_at ?? null,
      support_action: 'contact_support',
    };
  }

  return { state: st.state, ...st.extra };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  const p = url.pathname.replace(/^\/api\/hassio_ingress\/[^/]+/, '') || '/';

  try {
    if (req.method === 'GET' && (p === '/' || p === '/index.html')) {
      const f = path.join(UI_DIR, 'index.html');
      if (!fs.existsSync(f)) {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        return res.end('<!doctype html><meta charset="utf-8"><title>CINEXIS Home</title>'
          + '<p>Onboarding interface not present in this build.</p>');
      }
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      return res.end(fs.readFileSync(f));
    }

    if (req.method === 'GET' && p === '/api/state') {
      // Fixture rendering, for reviewing every contract state without standing
      // up an account. Off unless explicitly switched on, and never on in a
      // shipped image: a state you can name in a query string is not a state
      // you may assert into.
      const want = url.searchParams.get('fixture');
      if (want && process.env.CINEXIS_HOME_FIXTURES === '1') {
        const set = JSON.parse(fs.readFileSync(path.join(UI_DIR, 'fixtures.json'), 'utf8'));
        if (!set.fixtures[want]) return json(res, 404, { error: 'unknown_state' });
        return json(res, 200, set.fixtures[want]);
      }
      return json(res, 200, await currentState());
    }

    if (req.method === 'GET' && p === '/api/health') {
      return json(res, 200, { ok: true, app: 'cinexis_home', channel: boot.CHANNEL });
    }

    if (req.method === 'POST' && p === '/api/enroll/email') {
      const b = await readBody(req);
      const r = await cloud('/api/ha/enroll/email', { method: 'POST',
        body: JSON.stringify({ email: b.email }) });
      return json(res, r.status, r.body);
    }

    if (req.method === 'POST' && p === '/api/enroll/verify') {
      const b = await readBody(req);
      const r = await cloud('/api/ha/enroll/verify', { method: 'POST',
        body: JSON.stringify({ handle: b.handle, code: b.code }) });
      return json(res, r.status, r.body);
    }

    if (req.method === 'POST' && p === '/api/enroll/home') {
      const b = await readBody(req);
      const r = await cloud('/api/ha/enroll/home', { method: 'POST',
        body: JSON.stringify({ session: b.session, home_ref: b.home_ref }) });
      return json(res, r.status, r.body);
    }

    if (req.method === 'POST' && p === '/api/enroll/device') {
      const b = await readBody(req);
      const det = await ha.detect().catch(() => ({}));
      // The PUBLIC key. The private half is never read by any path here.
      const r = await cloud('/api/ha/enroll/device', { method: 'POST',
        body: JSON.stringify({
          session: b.session,
          public_key: identity.publicKey(),
          install_id: identity.installId(),
          ha_version: det.core_version, supervisor: det.supervisor, arch: det.arch,
        }) });
      if (r.status === 200 && r.body && r.body.ok) {
        identity.saveState({ state: 'connected', device_id: r.body.device_id,
                             masked_home_name: r.body.masked_home_name,
                             masked_email: r.body.masked_email,
                             last_connected_at: Math.floor(Date.now() / 1000) });
      }
      return json(res, r.status, r.body);
    }

    if (req.method === 'POST' && p === '/api/reenrol') {
      // Explicit owner action. Forgetting the key means the server sees a new
      // device, which is the intent — the old one stays revocable on its own.
      identity.destroy();
      return json(res, 200, { ok: true, state: 'enter_email' });
    }

    return json(res, 404, { error: 'not_found' });
  } catch (e) {
    const code = e && e.code;
    if (code === 'bootstrap_verification_failed' || code === 'no_bootstrap_public_key') {
      return json(res, 200, { state: 'server_unavailable', can_retry: true, local_control: 'ok' });
    }
    return json(res, 200, { state: 'offline', can_retry: true, local_control: 'ok' });
  }
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[CINEXIS-HOME] ingress server on :${PORT} (channel ${boot.CHANNEL}). `
      + 'No tunnel client, no shell, no Supervisor API — Remote Support is a separate app.');
  });
}

module.exports = { server, currentState };
