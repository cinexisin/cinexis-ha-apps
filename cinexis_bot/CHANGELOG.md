# Changelog

## 4.2.13 — 21 September 2026

### Changed
- **"What changed" prints one device per line, old-bot style.** Each assigned device is its own line: state dot, a glyph for the kind of device, then the name (🟢 💡 LIVING LIGHT / 🔴 🔌 BOARD AC), in the automation's own order. No On/Off groups, no counts. A device the automation names but Home Assistant no longer has shows as ⚠️ with "(not found)".

## 4.2.12 — 21 September 2026

### Changed
- **"What changed" step lists one device per line.** The On / Off (and Turned on / Turned off) read-outs now put each light on its own bulleted line under a counted heading instead of a comma run, so a ten-light door report reads as a column on the phone. Devices the automation names but Home Assistant no longer has are listed the same way under "Not found".

## 4.2.11 — 21 September 2026

- Automations: the "What changed" step can now follow a Home Assistant automation. Name the automation (for example the one that lights the door lights) and the step reads its turn-on/turn-off devices live from Home Assistant, waits, and reports the state of exactly those devices: On (n): …, Off (n): …. A fixed list of devices works too. The old behaviour, every device of a kind and only what switched, remains the default.

## 4.2.10 — 21 September 2026

- Home Assistant integration: the CINEXIS services (cinexis.trigger, send, snapshot, report, notify and notify.cinexis) now reach the add-on from Home Assistant Core, so existing automations that call them work against this add-on. A photo saved by an automation (notify.cinexis with data.file) is sent as a photo; the older send fields (targets, camera_entity_id) are accepted.

## 4.2.9 — 21 September 2026

- Photos: a new Settings card, "Photos sent by the bot". Choose the size photos are sent at (800, 1024 or 1600 px on the longest side, or the original frame; default 1024, about 90 KB instead of 200+ KB), how long they stay in the chat (removed automatically after 30 minutes to 2 days on the linked WhatsApp and on Telegram), and WhatsApp view-once (gone after it is opened, never saved to the gallery). Retractions survive a restart.
- WhatsApp Web: the log no longer fills with libsignal traces when a receipt cannot be decrypted; they are counted and reported once a minute like the rest.

## 4.2.8 — 21 September 2026

- WhatsApp Web: messages reach the recipient's phone at once instead of waiting until WhatsApp is opened. The bridge now announces itself as available and signals "typing" before every send, which is what makes the recipient's phone fetch and push the message.
- Automations: every camera in a rule is grabbed at the same moment the rule fires, in parallel; only the WhatsApp uploads stay one after another. A four-camera gate alert no longer waits for each camera in turn.

## 4.2.7 — 20 September 2026

- Automations page: the Test, Edit and On/Off buttons work again in the store (locked) image. The page's browser script was being compiled like server code since 4.2.0, so the browser received an empty stub; it now ships as a browser asset in every image stage, and the release check fails if it is missing. (4.2.6 fixed only the open image.)

## 4.2.5 — 20 September 2026

- WhatsApp page: fixed a script error introduced in 4.2.2 that left the page on "Checking…" with no Link button, so WhatsApp Web could not be linked or re-linked. A test now parses every page script the add-on serves.

## 4.2.4 — 19 September 2026

- Cloud WhatsApp: a per-user grant on the Users page ("Cloud WhatsApp" column, off for everyone by default). Only granted users are known to the CINEXIS number; everyone else gets a "not linked" reply there. The box refuses a hub command from an ungranted number even if the hub forwards one.

## 4.2.3 — 19 September 2026

- Cloud WhatsApp: CINEXIS support can operate the home through the hub as an admin without being a user on the box (Settings → Cloud WhatsApp → CINEXIS support access, on by default, switch it off to keep the home to your own users). Support actions appear in Activity as "cinexis:<number>".

## 4.2.2 — 19 September 2026

- WhatsApp Web: commands and live locations no longer take a minute to land. The bridge now answers WhatsApp's "resend that message" requests (a cache of what it sent plus a retry counter), so a phone whose keys drifted gets the message instead of waiting. When the keys are genuinely out of step the WhatsApp page says so and asks for a re-link, instead of the log filling with encryption dumps.
- WhatsApp Web: the log no longer prints a session dump for every failed decrypt; one line a minute counts them.
- Sending: photos and messages from a rule go out ~1 s apart instead of up to 3 s, so a four-camera gate alert arrives in seconds.
- Log lines carry the time of day.
- Cloud WhatsApp (CINEXIS Hub): a new Settings card lets a home be served from CINEXIS's official WhatsApp number through an outbound link; off by default, needs the hub live.

## 4.2.1 — 19 September 2026

- Automations: a new "What changed" step remembers every device, waits a few seconds, then names exactly which lights or devices turned on or off. Made for door and gate rules that trigger Home Assistant automations.
- Automations: the Test button works under ingress again.


## 4.2.0 — 18 September 2026

The lock. Published images no longer contain readable code, and a licence
belongs to one box.

- Every server module ships as V8 bytecode, sealed under a per-version release
  key. The loader obtains the key for this box from cinexis.cloud at first
  start, in exchange for the licence key, and caches it wrapped for this box
  so later starts are offline. Nothing decrypted touches the disk.
- First start shows an activation page on the add-on's own panel: enter the
  licence key, done. The licence text is one tap away.
- One licence, one box. The box is identified by its primary network hardware
  address. A second box is refused and the attempt is logged; CINEXIS or a
  dealer releases the binding to move a licence.
- The dashboard generator ships as Python bytecode.
- A proprietary licence text ships with the add-on.
- Local builds (the office) are unchanged and open.

## 4.1.0 — 18 September 2026

The first store release of the consolidated add-on.

- One design system across the whole web UI, self-hosted type, light by default with a considered dark mode.
- WhatsApp Web transport linked by scanning a code on the WhatsApp page, beside Telegram and the official providers; outbound prefers WhatsApp Web while linked.
- Telegram replies render reliably (HTML mode) and carry tap-buttons bound to the device, never to a name; the same buttons on Meta and Gupshup.
- A bare device name answers with its state; a shared name lists the devices with their state; a pending question never swallows a command.
- Rules fire on Home Assistant state changes inside the add-on: door and gate notifications with snapshots to many numbers, no automation needed.
- A daily report to the administrator at 08:00 site time, with a digest and a PDF; Analytics and Reports are open on every site.
- Cloud watch: the administrator hears when CINEXIS cloud or the site's internet is gone and when it is back.
- Entitlements from the CINEXIS plan registry: trial, active, grace, expired; gates by capability; limits at creation; local features never depend on a licence.
- The CINEXIS round dashboard ships in the add-on and installs as a package from the Dashboard page.
- Fixed: the process no longer stops five minutes after start when no WhatsApp provider is configured; a fresh site can create rules; the design shows by default regardless of a theme saved by the old interface.
