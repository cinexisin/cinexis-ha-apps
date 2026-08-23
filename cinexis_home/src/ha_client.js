/**
 * Home Assistant, read through its own API.
 *
 * `homeassistant_api: true` gives the add-on a scoped SUPERVISOR_TOKEN that Home
 * Assistant rotates itself, so there is no long-lived token to store and none to
 * leak. Nothing here writes: this app reads versions and confirms the connection
 * is alive.
 */
'use strict';

const SUPERVISOR = 'http://supervisor';

function token() { return process.env.SUPERVISOR_TOKEN || ''; }

async function call(pathname) {
  const t = token();
  if (!t) { const e = new Error('no_supervisor_token'); e.code = 'no_supervisor_token'; throw e; }
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const res = await fetch(SUPERVISOR + pathname, {
      signal: ctl.signal, headers: { authorization: `Bearer ${t}` },
    });
    if (!res.ok) { const e = new Error('supervisor_' + res.status); e.code = 'supervisor_error'; throw e; }
    const j = await res.json();
    return j && j.data ? j.data : j;
  } finally { clearTimeout(timer); }
}

/** Version and architecture, for the enrolment record and the Connected screen. */
async function detect() {
  const info = await call('/info');
  return {
    core_version: info.homeassistant || null,
    supervisor: info.supervisor || null,
    arch: info.arch || null,
    // Deliberately NOT collected: location, entity list, device inventory, or
    // anything else describing the house. The enrolment record needs to know it
    // is a supported Home Assistant, not what is in it.
  };
}

async function alive() {
  try { await call('/info'); return true; } catch { return false; }
}

module.exports = { detect, alive };
