## 4.1.0-pilot.5

Fixes an add-on that could not start at all. Every install failed immediately
with `/bin/sh: can't open '/init': Permission denied`.

The AppArmor profile granted `/init ix` — execute, but not read. `/init` is a
shell script, so the kernel execs it, reads the shebang and hands the file to
`/bin/sh`, which then has to read it. That read was denied, so s6-overlay never
started. The published image was never at fault.

- AppArmor now grants read alongside execute on every path that can hold an
  interpreted script, and permits the s6-overlay v3 tree (`/command`, `/package`,
  `/etc/s6-overlay`) and its runtime state under `/run`.
- Capabilities are unchanged: the base ships `/etc/fix-attrs.d` empty, so nothing
  changes ownership at startup.
- The application now starts via an executable `run.sh`, so its mode, shebang and
  line endings are covered by an automated image contract that boots the
  container through its real entrypoint and requires a 200 from ingress.

# Changelog

## 4.0.0 — first zero-configuration release

**Setup is now an email address.** The five fields the previous version asked for
— server address, cloud address, tunnel host, tunnel port and tunnel domain —
are gone. They were values a homeowner had no way to know or verify, and a text
box somebody can be talked into changing. Endpoints now arrive in a signed
document the app verifies against a key built into the release.

- **New:** per-device identity. Your Home Assistant generates its own key on
  first start; the private half never leaves your home. Devices are revoked
  individually — there is no shared password to change.
- **New:** Remote Support is optional and separate, so the everyday app keeps a
  smaller set of permissions.
- **Changed:** the app is now delivered as a signed, pre-built image. Nothing is
  compiled on your device.
- **Removed:** the WhatsApp pairing port (18083). Nothing is published to your
  home network any more; the interface is served through Home Assistant ingress.
- **Fixed:** a lapsed subscription no longer stops local control. Lights, scenes,
  automations and local alerts keep working; only cloud features pause.

Upgrading from 1.19.x keeps your existing settings.

## 4.1.0-pilot.1

First publicly installable pilot build.

* Published as a pre-built multi-architecture image (`aarch64`, `amd64`) to
  GitHub Container Registry. Nothing is compiled on the device.
* Built by GitHub Actions from the source in this repository, with every
  third-party action pinned to a commit SHA, and published with an SBOM,
  build provenance and a signature.

This is **not** a rebuild of 4.0.0 under a new name. The 4.0.0 images were built
on the release-candidate channel for internal lifecycle testing and were never
published; a released tag is never replaced, so the first public build gets its
own version.

**Known pilot limitation.** This build requests the `stable` bootstrap channel,
and the stable endpoint is not configured yet. Until it is, the add-on installs,
starts and runs, and reports "CINEXIS is temporarily unavailable" rather than
connecting. That is the intended fail-closed behaviour: the add-on will not
accept an unverified configuration. Local Home Assistant control is unaffected.

## 4.1.0-pilot.4

Owner-test release. The first build an owner can install and enrol with.

* **Canonical domain.** Every public reference moves from `cinexis.in`, which is
  not ours, to `cinexis.cloud`. That included the bootstrap endpoint baked into
  the image — the previous build would have asked a domain we do not control
  where to connect.
* **Stable channel is live.** `4.1.0-pilot.3` requested the stable bootstrap and
  the endpoint did not exist, so the add-on installed and then reported CINEXIS
  unavailable. It now resolves to a signed document at
  `https://go.cinexis.cloud`, verified against the public key in this image.
* **One-click installation page** at `https://go.cinexis.cloud`, with the manual
  repository route documented just as prominently.
* **Support, privacy and security contacts** now under `cinexis.cloud`.
* **Remote Support** is described accurately: not published, coming after
  separate security validation. It is not bundled into CINEXIS Home.

Unchanged: ingress only, no published port, no `/config` or `/share` mount, no
Docker socket, no Supervisor add-on management, no tunnel client, and zero
dependencies. Local Home Assistant control is unaffected by anything CINEXIS
does or fails to do.

`4.1.0-pilot.3` is not modified. A released tag is never rebuilt or moved.
