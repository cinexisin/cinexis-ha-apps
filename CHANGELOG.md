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
