# CINEXIS Home — Private Pilot

Home Assistant add-ons for CINEXIS customers.

> **This is a CINEXIS custom repository. It is not part of the official Home
> Assistant add-on store, and nothing here is endorsed or reviewed by the Home
> Assistant project.** You are installing software published by CINEXIS.

## Install

**One click:**

[Add this repository to Home Assistant](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fcinexisin%2Fcinexis-ha-apps)

**If that link does not work** — the My Home Assistant redirect has had
version-dependent problems opening the repository dialog, so this manual route
is fully supported and not a workaround:

1. In Home Assistant, open **Settings → Add-ons → Add-on Store**.
2. Open the **⋮** menu (top right) and choose **Repositories**.
3. Paste `https://github.com/cinexisin/cinexis-ha-apps` and select **Add**.
4. Close the dialog. **CINEXIS Home** appears in the store.

Then install **CINEXIS Home**, start it, enable **Show in sidebar**, and open it.
It will ask for your email address and nothing else.

## What you are asked for

Your email address, and the six-digit code we send to it. That is the whole
configuration.

You are never asked for a web address, an IP address, a port, a token, a node
identifier, a tunnel setting, a Docker command, a registry login, or which
release channel you want. If any screen asks you for one of those, that is a
fault — please report it.

## Add-ons here

| Add-on | What it does | Default |
|---|---|---|
| **CINEXIS Home** | Connects this Home Assistant to your CINEXIS account: enrolment, status, messaging connectivity | Install this one |
| **CINEXIS Remote Support** | Lets a CINEXIS engineer help with a problem, for one approved session at a time | Not installed, not required |

Remote Support is deliberately a **separate** add-on. The everyday app has no
tunnel client, no shell, no Docker socket, no add-on management and no access to
your Home Assistant configuration folder. Support access is something you switch
on, approve per session, and can end at any moment.

## Your home keeps working

Lights, scenes, automations and local alerts run on Home Assistant itself. They
do not pass through CINEXIS. If our servers are unreachable, if your internet is
down, or if a subscription lapses, **your home continues to work.** Cloud
features pause; local control does not.

## Architectures

`aarch64` and `amd64`. Images are pre-built and published to GitHub Container
Registry, so **nothing is compiled on your device**.

32-bit ARM (`armv7`, `armhf`) and `i386` are not supported.

## Security, privacy and support

* [SECURITY.md](SECURITY.md) — how to report a vulnerability
* [PRIVACY.md](PRIVACY.md) — what leaves your house, and what does not
* [SUPPORT.md](SUPPORT.md) — support scope, compatibility and update policy

## Verifying what you installed

Every release publishes an immutable image digest, a software bill of
materials, checksums and a signature. See [SUPPORT.md](SUPPORT.md).
