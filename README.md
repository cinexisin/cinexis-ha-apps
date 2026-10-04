# Thalir apps for Home Assistant

Home Assistant add-ons published by Thalir Innovations: the Smart Home Bot and Thalir Home.

> **This is a Thalir custom repository. It is not part of the official Home
> Assistant add-on store, and nothing here is endorsed or reviewed by the Home
> Assistant project.** You are installing software published by Thalir Innovations.

## Install

**One click:**

[Add this repository to Home Assistant](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fcinexisin%2Fcinexis-ha-apps)

**If that link does not work** — the My Home Assistant redirect has had
version-dependent problems opening the repository dialog, so this manual route
is fully supported and not a workaround:

1. In Home Assistant, open **Settings → Add-ons → Add-on Store**.
2. Open the **⋮** menu (top right) and choose **Repositories**.
3. Paste `https://github.com/cinexisin/cinexis-ha-apps` and select **Add**.
4. Close the dialog. **Thalir Smart Home Bot** and **Thalir Home** appear in the store.

**Thalir Smart Home Bot:** install it, start it, and open it from the sidebar.
The first screen asks for your licence key from your Thalir order or console.
Enter it once; the bot starts and keeps starting on its own after that, online
or not. One licence unlocks one box. To move a licence to another box, ask
Thalir support or your dealer to release it. The licence terms ship with the
add-on and are one tap away on that screen.

**Thalir Home:** install it, start it, enable **Show in sidebar**, and open it.
It asks for your email address and nothing else.

## What you are asked for

For the bot, your licence key. For Thalir Home, your email address and the
six-digit code we send to it. That is the whole configuration.

You are never asked for a web address, an IP address, a port, a token, a node
identifier, a tunnel setting, a Docker command, a registry login, or which
release channel you want. If any screen asks you for one of those, that is a
fault — please report it.

## Add-ons here

| Add-on | What it does | Default |
|---|---|---|
| **Thalir Smart Home Bot** | Home automation through WhatsApp and Telegram: chat control with tap-buttons, per-person permissions, door and gate notifications with snapshots, a daily report, the Thalir dashboard as a package. Optional Cloud WhatsApp: your home on Thalir's official WhatsApp number, with menus, natural language, photos and alerts, no phone linked. | `admin_number` and `bot_name` under Configuration, then link WhatsApp Web or add a Telegram token in its web UI. |
| **Thalir Home** | Connects this Home Assistant to your Thalir account: enrolment, status, messaging connectivity | Install this one |
| **Thalir Remote Support** | Lets a Thalir engineer help with a problem, for one approved session at a time | **Not published yet** — coming after separate security validation |

Remote Support is **not in this repository yet.** It is deliberately a
**separate** add-on and will be published only after its own security
validation — it is not bundled into Thalir Home to make a table look complete.

When it does arrive, it will still be separate. The everyday app has no
tunnel client, no shell, no Docker socket, no add-on management and no access to
your Home Assistant configuration folder. Support access is something you switch
on, approve per session, and can end at any moment.

## Your home keeps working

Lights, scenes, automations and local alerts run on Home Assistant itself. They
do not pass through Thalir. If our servers are unreachable, if your internet is
down, or if a subscription lapses, **your home continues to work.** Cloud
features pause; local control does not.

## Architectures

`aarch64` and `amd64`. Images are pre-built and published to GitHub Container
Registry, so **nothing is compiled on your device**. The Smart Home Bot images
ship their code sealed; they are unlocked on your box by your licence.

32-bit ARM (`armv7`, `armhf`) and `i386` are not supported.

## Security, privacy and support

* [SECURITY.md](SECURITY.md) — how to report a vulnerability
* [PRIVACY.md](PRIVACY.md) — what leaves your house, and what does not
* [SUPPORT.md](SUPPORT.md) — support scope, compatibility and update policy

## Verifying what you installed

Every release publishes an immutable image digest, a software bill of
materials, checksums and a signature. See [SUPPORT.md](SUPPORT.md).
