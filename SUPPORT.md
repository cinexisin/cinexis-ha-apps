# Support, compatibility and updates

## Getting help

Email **support@cinexis.in**, or reply to any CINEXIS message.

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

This is a **private pilot**. It is a CINEXIS custom repository, installable
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

Images are built by GitHub Actions in this repository, from the source in this
repository. The workflow is in `.github/workflows/`. You can read exactly what
produced the image you are running.

## If a subscription lapses

Cloud features pause. **Local Home Assistant control does not.** Lights, scenes,
automations and local alerts keep working, because they never depended on
CINEXIS.
