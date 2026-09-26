# Changelog

## 4.3.8 — 25 September 2026

- Turn lights, switches and fans on or off using their exact displayed name, including numbered names such as `studio lights 1 off` or `turn off studio lights 1`. Device names and aliases are matched before room-wide guesses or brightness values, without AI. Duplicate names ask you to choose; an unrecognised number on a matching light name does not switch the whole room. Existing permissions, approval, location and access-hour checks remain in force.
- Updated the underlying regular-expression library to stable PCRE2 10.48 to correct a memory-ownership defect. Messaging, saved automations, permissions and device controls are unchanged. The release still requires native validation and the existing security gates.

## 4.3.7 — 25 September 2026

- WhatsApp Web alerts, images and documents can reuse the hidden conversation address observed in a recent direct message, so background alerts do not switch back to a phone-number address between command replies. Routing hints are bounded, reset on reconnect and never change user permissions or pairing. Conflicting mappings are not reused. This addresses a routing inconsistency; mobile decryption still requires real-phone acceptance and is not certified fixed by local tests.
- Timed photo cleanup retains the original message destination even across restarts. Existing cleanup choices and older history are unchanged.

## 4.3.6 — 25 September 2026

- Linked WhatsApp chat cleanup now has separate controls for bot text/menus/alerts, all sent images/files/media, and answered commands on the bot account. Choose Keep or 30 minutes to 24 hours; new installations default to 24 hours. Existing installations keep text/commands and preserve their previous photo setting until explicitly changed. Cleanup survives restarts, targets individual messages and shows failed/expired work. It never clears old chat history or removes incoming commands from the customer phone; saved gallery copies cannot be reliably removed.
- An explicit WhatsApp media cleanup choice replaces the older WhatsApp photo expiry, cancels its pending requests, and covers images, snapshots, PDF reports, documents and other sent attachments. Keep cancels queued cleanup. The latest successful WhatsApp reply-address handling and read-after-reply behavior are preserved; Telegram and official-provider delivery are unchanged.
- Photo expiry choices now stop at 24 hours to leave retry time inside platform deletion limits. An existing two-day setting is shown as needing a supported choice before saving, not silently migrated. Cleanup is best effort, not proof that every phone or backup has removed a copy.
- Read-after-reply diagnostics now report whether the read-receipt request returned, failed or is taking time, without logging message text or phone numbers.

## 4.3.5 — 24 September 2026

- Restored release builds after an upstream package index changed, while retaining the exact reviewed XML library source and security checks. Version 4.3.4 was not published.

- WhatsApp Web command replies now preserve the conversation's original hidden identity instead of converting it to a phone-number destination. User permissions still use the existing phone-number identity. This correction covers text, choices, images and document replies; read-after-reply behaviour is unchanged. Phone delivery and the bot phone's chat history still require live acceptance testing.

## 4.3.3 — 24 September 2026

- Automation send counts now exclude refused or failed submissions, including camera-caption fallbacks. The Test button says when work is only queued; neither queued work nor a submitted message is presented as confirmed delivery.

- Automation command steps now wait for their result before continuing, send the returned text on the selected channels, and catch asynchronous failures. Cancelling a rule prevents subsequent replies and steps; it cannot recall an action already started.

- Local WhatsApp diagnostics can now distinguish late-arriving messages, time spent handling commands, and time spent submitting replies. Timing lines contain no message text or phone numbers and do not claim that a reply was delivered. Pairing and command behaviour are unchanged.
- WhatsApp Web now requests a read receipt for an incoming command after successfully submitting a reply. Failed or ignored replies are not marked read, other chats are untouched, and existing WhatsApp read-receipt privacy settings still apply.
- Sending `menu` now opens the same command guide as `help`, instead of falling through to an unrecognised-command reply. Existing access restrictions, custom-command precedence and device controls are unchanged.
- Device clarification replies now reject invalid numbers without operating any devices. Number ranges include every selected item, and repeated selections operate each device only once. Existing device permissions remain in force.

Phone-side “Waiting for this message” remains under investigation. These changes do not reset pairing or claim to repair encrypted messages that a phone cannot read.

## 4.3.2 — 22 September 2026

- Startup logs now confirm that the administrator recipient and box identity are ready without printing phone numbers, network hardware addresses, host names or box identifiers. Activation and licence binding are unchanged.
- Add-on startup no longer attempts a developer-only local speech worker when that optional worker is not installed. Home Assistant speech-to-text and configured cloud transcription continue unchanged, and a failed optional worker no longer leaves a two-minute wait.

## 4.3.1 — 22 September 2026

- Supervisor logs now keep safe event types, statuses, counts and timings without recording message text, credentials, recipient or sender identifiers, device/entity identifiers, camera or face details, raw provider responses, or WhatsApp session material.
- Scheduled automation reports now resume when switched back on, without requiring a restart or edit. Timings use the configured home timezone (including the Home Assistant add-on setting), obsolete timers are removed, and invalid schedules are rejected before saving. Existing device-report wording and recipient permissions are unchanged.
- Add several devices, camera snapshots or scenes to an automation using a searchable, name-first picker. Choose on/off/toggle, review the order and set gaps in milliseconds or seconds; individual gaps and actions stay editable. New camera batches capture at each step. Existing rules keep their timing and capture behaviour until you edit them.
- Updated the underlying XML parser to stable Expat 2.8.4 with upstream security fixes while preserving both system library interfaces. Saved automations and notification behaviour are unchanged.
- Updated FFmpeg to stable 8.0.3 with security corrections for voice notes and camera snapshots. Existing codecs and protocols, including legacy HLS, are preserved and checked; build tools stay out of the runtime.
- Included two upstream audio-parser corrections while preserving existing audio formats and the system library interface.
- Updated the underlying sandbox utility to address unsafe path handling while preserving its installed non-setuid mode.
- Hardened the underlying JSON library to correctly handle escaped device-data keys, reject over-deep patch results, and avoid repeated work in nested comparisons. Automation settings and notification wording are unchanged.
- Required Ubuntu's security-fixed GLib library in new add-on builds. This updates an underlying system library without changing screens, saved settings or notification behaviour.
- Replaced affected system file utilities with Ubuntu's security-updated GNU utilities. File permissions, saved settings and notification behaviour are preserved.
- Preserved native face-recognition calculations on Node 24 using a narrowly checked upstream TensorFlow compatibility fix. Face recognition remains optional and unverified on real hardware; ARM64 availability is unchanged.
- Fixed PDF usage reports without adding a browser engine or an internet dependency. Reports retain device, room, daily and hourly views, include exact data as an attachment, wrap long names, and bundle fonts for Tamil, Kannada and Hindi labels. Usage is clearly described as time on, not electricity consumption.
- Updated the add-on runtime to maintained Node 24 LTS and its SQLite binding. Existing settings and databases are preserved; every locked release is rebuilt for the exact runtime on each architecture.
- Updated the add-on's Linux base to Ubuntu 26.04 LTS for newer system libraries, with isolated voice-conversion and camera-stream compatibility checks. Saved settings and notification behaviour are unchanged.
- Fixed an ARM64 startup failure caused by a WhatsApp Web library dependency being available only through the optional face-recognition packages. The dependency now installs on every supported architecture.
- Existing what-changed reports no longer report unrelated whole-home devices when a named automation cannot be resolved. Unknown or unavailable readings show a warning instead of looking off. Valid on/off device rows keep their existing format.
- Automations and Notifications share a detailed device-update editor, selected-device filters and a read-only, per-recipient preview. New report configurations are checked before saving; channel choices never grant access or bypass saved preferences.
- Opt-in device details can report current states or observed on/off changes for a chosen device list or a resolvable Home Assistant automation. Reports respect selected people, device permissions and delivery preferences; missing/unavailable readings are never shown as off. Existing report steps are not silently converted.
- Automation notifications now honour WhatsApp, Telegram or Both for every trigger and step, within each selected person's saved delivery preferences. A missing selected channel never falls back to another channel.
- Automation alerts now send to WhatsApp and Telegram at the same time, so Telegram does not wait behind a slow WhatsApp send. Messages stay in order on each channel, and each step finishes before the next one starts.
- See message text and camera captions update as you type in the automation editor, without sending an alert. The preview explains empty messages, camera-name captions and literal `{name}` text before you save.
- Automations now flag missing saved cameras, devices and scenes, and show the rule and step to review. Offline Home Assistant data is marked as incomplete instead of claiming devices were deleted. Editing a rule keeps its saved selections until you choose a replacement.
- **Set up a home alert in everyday language.** Choose a door opening, a door left open, or movement; select your real sensor and the people to tell; then review the exact message before turning it on. The guide checks your selected devices again before saving, supports an optional Home Assistant camera, and sends no test messages during setup. Existing automations and delivery preferences stay unchanged.
- **Turning an automation off also stops its waiting work.** Disabling, deleting or editing a rule cancels its pending reminders and remaining steps. Turning it back on starts with future triggers; it does not revive an old reminder. Messages or device actions already handed to another service cannot be recalled.
- **See what needs a look at home.** The overview now lists open or moving entrances, unavailable device states, and how many automations are on or off. It shows when Home Assistant was last checked and stops presenting old readings as current when the connection fails. This is read-only: it never switches devices or sends messages.
- Updated web request parsing and archive dependencies to address published security advisories, without changing the Express major version or notification behaviour.

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
