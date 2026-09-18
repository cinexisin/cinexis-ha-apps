# Cinexis Smart Home Bot — Home Assistant add-on

Home automation through WhatsApp and Telegram. The add-on runs inside your Home Assistant, talks to your devices locally, and lets the people you choose control the home from the chat apps they already use. Everything that matters keeps working when the internet or the CINEXIS cloud is away.

## What it does

- **Chat control.** "living light on", "ac 24", "gate camera", "lights" for a numbered list. On Telegram, and on WhatsApp through an official provider, replies carry tap-buttons: turn off, all on, just this one.
- **Three messaging transports, side by side.** WhatsApp Web, linked by scanning a code on the WhatsApp page, using this site's own number with no per-message cost; Telegram, standard on every site; and an official WhatsApp provider, Meta Cloud API or Gupshup, as the fallback. Whichever carried a message, the same permissions apply.
- **People and permissions.** Each person is allowed, needs approval, or is blocked per device; time windows, guest invites with expiry, live-location checks for the gate.
- **Notifications.** Rules on the Automations page fire on a device's state, with a hold time, a message and a camera snapshot, to a list of numbers and chats. The add-on listens to Home Assistant's own event stream, so no automation is needed.
- **Schedules, scenes, rooms, timers, broadcast, voice notes** with local or cloud transcription.
- **Daily report.** Yesterday's device use, the busiest hour and who asked for what, to the administrator every morning, with a PDF.
- **Dashboard.** The CINEXIS round dashboard, generated for this site from its rooms and devices and installed as a package from the Dashboard page.
- **Watchfulness.** The administrator hears when the CINEXIS cloud is unreachable, or when the site's internet was down, and when either is back.

## Installation

1. Add the CINEXIS repository to the add-on store: `https://github.com/cinexisin/cinexis-ha-apps`.
2. Install **Cinexis Smart Home Bot** and start it. Open its web UI from the add-on page.
3. Enter your licence key on the activation page, then in the web UI set the bot name and administrator number under Settings, link WhatsApp Web on the WhatsApp page and add your Telegram bot token under Settings. Either channel is enough to begin.
4. Add people under Users and give them devices under Commands → Device Permissions.

## Options

| Option | Meaning |
|---|---|
| `admin_number` | The administrator's WhatsApp number, digits only with country code. |
| `bot_name` | How the bot introduces itself. |
| `web_user` | The web UI sign-in name. |
| `timezone` | The site's timezone, used for schedules, reports and every time shown. |
| `wa_provider` | `none` (WhatsApp Web and Telegram only), `meta` or `gupshup` for an official provider as well. |
| `log_level` | How much the add-on writes to its log. |

## Official provider secrets

Only when `wa_provider` is `meta` or `gupshup`, add the credentials to `/config/secrets.yaml`:

```yaml
# Meta WhatsApp Cloud API
cinexis_meta_access_token: "…"
cinexis_meta_phone_number_id: "…"
cinexis_meta_app_secret: "…"
cinexis_meta_verify_token: "…"

# …or Gupshup
cinexis_gupshup_api_key: "…"
cinexis_gupshup_source: "…"
cinexis_gupshup_app_name: "…"
cinexis_gupshup_webhook_token: "…"
```

Point the provider's webhook at the add-on's public address. Every inbound request is verified before it is trusted, Meta's signature over the raw body or Gupshup's shared token, and deliveries are de-duplicated so a retried command never runs twice.

## WhatsApp Web

WhatsApp Web uses the same connection as WhatsApp on a laptop, which WhatsApp does not offer for automation. A number that sends a lot of automated messages can be blocked. Link a number you can afford to lose, keep replies to people who wrote first, and keep an official provider configured as the fallback. The session survives restarts; Unlink on the WhatsApp page removes it.

## Activation and licence

The first start asks for your licence key on the add-on's own page: open the add-on from the Home Assistant sidebar, enter the key from your CINEXIS order or console, and the bot starts. That needs the internet once. From then on the add-on starts on its own, online or not.

A licence belongs to one box. The box is identified by its primary network hardware address, which the add-on reads from Home Assistant. A second box that tries the same key is refused and the attempt is recorded. To move a licence to a new box, ask CINEXIS support or your dealer to release it; the next activation binds it again.

A licence unlocks the capabilities of its plan. When it lapses, cloud-backed features pause and everything local keeps running. A gate applies to using or creating a feature, never to what is already running. After an update, the first start needs the internet once more for the new version's key.

The add-on is delivered as a sealed image; the licence terms shipped with it apply.

## Upgrading from 3.x

The bot box is gone; this add-on replaces it. Install the add-on beside the old bot, link WhatsApp Web and Telegram, recreate the notification rules on the Automations page, then stop the old bot and remove its device under WhatsApp's Linked devices so the two do not both answer.
