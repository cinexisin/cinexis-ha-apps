# Support, compatibility and updates

## Getting help

Email **hello@thalirone.com**, or reply to any Thalir message.

**Never send a password, a verification code, a recovery code or a device secret
to anyone, including us.** We will not ask for them.

## Compatibility

| | |
|---|---|
| Home Assistant | Supervised installations: Home Assistant OS and Supervised. Container-only and Core-only installs cannot run add-ons. |
| Architectures | `aarch64`, `amd64` |
| Not supported | `armv7`, `armhf`, `i386` |
| Home Assistant Core | 2024.6 and later |

## Status of this repository

This is a **private pilot**. It is a Thalir custom repository, installable
directly in Home Assistant. It is not in the official Home Assistant add-on
store and has not been reviewed by the Home Assistant project.

## Updates

Add-on updates appear in Home Assistant as normal. Versions follow
`MAJOR.MINOR.PATCH`. A released tag is never rebuilt or replaced: a change means
a new version number. Breaking changes raise the major version and are described
in [CHANGELOG.md](CHANGELOG.md).

## Verifying a release

Every release publishes:

* an immutable image digest per architecture;
* an SPDX software bill of materials;
* build provenance from the workflow that produced it;
* checksums and a signature.

**Thalir Home** is built by GitHub Actions in this repository, from the source
in this repository. The workflow is in `.github/workflows/`, so you can read
exactly what produced the image you are running.

**Thalir Smart Home Bot** is built from a private Thalir source repository and
ships its code sealed, to be unlocked on your box by your licence. Its release
workflow publishes the same artifacts listed above. Before an image is
published, it is scanned, and every finding rated high or critical, or scored 7
or more, must match a reviewed, dated decision backed by evidence from that exact
image. If any finding does not, the release is not published.

## If a subscription lapses

Cloud features pause. **Local Home Assistant control does not.** Lights, scenes,
automations and local alerts keep working, because they never depended on
Thalir.
