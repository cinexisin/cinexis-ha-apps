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

### Bulk action picker

In an automation, choose **+ Devices**, **+ Cameras** or **+ Scenes**. Search by name,
filter by kind, then select one item or several (up to 25 in a batch). Technical
IDs are available under a disclosure, not required as input. Device batches can
turn on, turn off or toggle; camera batches take snapshots; scene batches run
existing saved scenes. The picker never executes or sends anything.

Review **Execution order**, move items up/down, and set **Gap between items** in
milliseconds or seconds. A gap may be 0–300,000 whole milliseconds (0–300 seconds).
Zero means sequential actions with no extra wait, not simultaneous execution.
The gap starts after the preceding action and its notifications finish. Device
responses, provider pacing and delivery add time; millisecond input does not
promise real-time precision. **Add to steps** adds an editable action sequence;
change each action or gap independently before saving. New batches must fit
within 50 total steps, including gaps. No existing rule is trimmed or migrated.

New camera batches select **Capture when this step runs**: each camera is fetched
after earlier steps and their delays, then its frame is shared across the rule's
recipients. Existing snapshots keep their trigger-time, parallel capture unless
you explicitly change that checkbox. Captions, photo policy, selected channels
and saved delivery preferences still apply. This does not add new permissions
to legacy photos/actions or change their recipient rules. Only the existing
administrator editor can configure these actions; no new public endpoint exists.

Disabling, deleting or editing a rule cancels waiting gaps and remaining steps;
already submitted actions or messages cannot be recalled. Missing saved devices
are kept until you choose a replacement. An empty picker is not proof of deletion:
check the Home Assistant connection and configuration, then refresh.

### Detailed automation notifications

Existing rules are not automatically converted.

Scheduled rules use the home timezone displayed in their editor. The saved
timezone takes precedence; otherwise the Home Assistant add-on timezone applies,
with Asia/Kolkata as the default. Restart after changing the add-on timezone.
Review existing scheduled wall-clock times before upgrading: earlier versions
relied on the container timezone instead. Expressions and recipients are preserved.
Invalid cron expressions or timezones cannot be saved as an enabled schedule.
Switching a scheduled rule back on registers its next run without a restart;
missed runs while disabled/offline are not replayed. Scheduled current-state
reports are readings at that time, not a history of all changes since the last run.

In **Automations**, choose **Device notification**, or add a **Detailed device
update** step to a rule. Notifications links to the same editor. Device-state,
scheduled and manual/HTTP rules all use the same choices:

1. Select one saved person or several, then WhatsApp, Telegram or both. The
   selection narrows each person's saved delivery preferences; it does not
   grant device access or fall back to an unselected channel.
2. Choose devices in the order you want them reported, or choose an HA
   automation with resolvable entity targets. Area/device/label targets,
   templates, scripts and scenes require an explicit device list.
3. Choose current status, currently active/inactive, observed changes or
   observed on/off transitions. Set a reading delay of 0–120 seconds and choose
   whether to include the event, reading time (IST) and entity IDs.
4. Use **Preview permitted recipients — no sending**. It only reads device
   states; it does not run actions or save the rule. Transition previews show
   current readings, not predictions. Review, then save deliberately.

Ordinary recipients need explicit device `allow` permission and, for a
state-triggered report, permission for the triggering sensor. Approval or
location access alone is not sufficient for unattended readings. Hidden devices
and temporarily blocked ordinary users are excluded. Preferences and grants are
checked again before each submission. Remove recipients or disable the rule to
stop future notifications; already submitted messages cannot be recalled.

“Currently on” is not “turned on because the door opened.” The new report
baseline starts before the rule's action steps but after any trigger hold. It
cannot reconstruct earlier changes or prove their cause. Unknown/unavailable
readings show warnings. An unresolved automation never expands to the whole
home. Legacy what-changed steps also receive the no-fallback and unavailable
state safety fixes, but retain their old sampling point and recipient rules.
Custom messages, photos and legacy reports do not acquire the new report ACLs.

For the office door rule, the literal “Main door opened” step is independent
of the device report. Keep or remove it intentionally; review the report source
and mode before changing the live rule. Do not synthesize a real door sensor
state. No live rule is changed by this documentation.

### Add-on configuration

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

## Photos sent by the bot

Camera snapshots fill a phone fast. Settings → **Photos sent by the bot** sets how big they are sent (800, 1024 or 1600 px on the longest side, or the original frame; 1024 is the default and about 90 KB), how long they stay in the chat (removed automatically after 30 minutes to 2 days on the linked WhatsApp and on Telegram), and WhatsApp view-once (gone after it is opened, never saved to the gallery). Removal works on the linked WhatsApp and on Telegram; photos sent through an official WhatsApp provider or the CINEXIS number cannot be recalled, so size is the lever there. On the phone, WhatsApp → Settings → Storage and data → Media visibility off keeps photos out of the gallery.

## Cloud WhatsApp

Cloud WhatsApp lets the people you choose control this home from CINEXIS's official WhatsApp number, with no phone linked here and no port opened on your router. It is included with Smart and above.

How it works: the add-on opens one outbound connection to the CINEXIS cloud and keeps it open. A message to the CINEXIS number from a granted user is passed down that connection, runs on this box under that user's own permissions (allow, approval, location, block), and the answer goes back the same way. Menus arrive as tap-lists, replies carry buttons, cameras arrive as photos, and plain sentences are understood. If the box is offline the user is told so at once.

Setting it up:

1. Settings → **CINEXIS Cloud WhatsApp** → On, then Save. The card shows *connected* within a few seconds, with the site code the CINEXIS number knows this home by.
2. Users → **Cloud WhatsApp** column → switch On for each person who may use the CINEXIS number. Everyone is Off until you do; a number that is not granted gets a "not linked to a home" reply there and nothing else. Granting takes effect immediately.
3. Give them the number. They send *hi* or *menu* to it and their home answers.

Notifications through the CINEXIS number: by default the box uses it only when no WhatsApp is linked here (fallback). Choose *Always* to send every WhatsApp notification through it as well, or *Never* to keep notifications local. A message to someone who has not written to the CINEXIS number in the last 24 hours goes as an approved template, per WhatsApp's rules.

CINEXIS support access: on by default, the switch on the same card lets CINEXIS support operate this home through the cloud as an admin, for help and diagnosis. Support actions show in Activity as "cinexis:<number>". Switch it off and only your granted users can reach the home.

Nothing on this box depends on the cloud. If the connection drops, local control, the linked WhatsApp, Telegram and every rule keep working, and the link reconnects on its own.

## Activation and licence

The first start asks for your licence key on the add-on's own page: open the add-on from the Home Assistant sidebar, enter the key from your CINEXIS order or console, and the bot starts. That needs the internet once. From then on the add-on starts on its own, online or not.

A licence belongs to one box. The box is identified by its primary network hardware address, which the add-on reads from Home Assistant. A second box that tries the same key is refused and the attempt is recorded. To move a licence to a new box, ask CINEXIS support or your dealer to release it; the next activation binds it again.

A licence unlocks the capabilities of its plan. When it lapses, cloud-backed features pause and everything local keeps running. A gate applies to using or creating a feature, never to what is already running. After an update, the first start needs the internet once more for the new version's key.

The add-on is delivered as a sealed image; the licence terms shipped with it apply.

## Upgrading from 3.x

The bot box is gone; this add-on replaces it. Install the add-on beside the old bot, link WhatsApp Web and Telegram, recreate the notification rules on the Automations page, then stop the old bot and remove its device under WhatsApp's Linked devices so the two do not both answer.
