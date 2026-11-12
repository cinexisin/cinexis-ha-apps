# Privacy

This page covers both Thalir add-ons. They handle data very differently, so
each has its own section: **Thalir Home** first, then the **Thalir Smart Home
Bot**.

# Thalir Home

## What this add-on sends to Thalir

* Your email address, to identify your account, and the code we email back.
* A **public** key this add-on generates on your device.
* An install identifier that is random, generated locally, and not derived from
  your name, address, hardware or network.
* Your Home Assistant version, Supervisor version and processor architecture.
* Whether the connection is alive.

## What it does not send

It does not read, collect or transmit:

* your entity list, device inventory or areas;
* the state of anything in your home;
* camera images, recordings or snapshots;
* your location, latitude or longitude;
* your Home Assistant configuration;
* your Wi-Fi details, passwords, recovery codes or diagnostic archives.

The add-on has **no `/config` or `/share` mount**, so your configuration folder
is not reachable by it even in principle.

## What is shown on screen

Home and account names are shortened wherever they appear — `So••• H•••` —
enough for you to recognise your own home, never enough to identify anyone
else's. The full name of a home is not returned to the add-on at any point in
enrolment, including on success.

## Where it is stored

Your account and subscription records are held on Thalir servers. The device
key stays on your device, in the add-on's private storage, readable only by the
add-on.

## Retention and deletion

Ask us at **hello@thalirone.com** to see, correct or delete what we hold. Removing
the add-on and asking us to revoke the device ends the connection immediately;
local Home Assistant operation is unaffected.

## Remote Support

The separate Remote Support add-on is not installed by default and never
installs itself. When you approve a session, a Thalir engineer can reach your
Home Assistant for a limited window that you can end at any time. Sessions are
recorded in an append-only audit log. Nothing happens without your approval for
that specific session.

## Third parties

Payment is handled by our payment provider; Thalir does not receive or store
your card details. No analytics, advertising or tracking script runs in this
add-on's interface.

# Thalir Smart Home Bot

Everything above describes Thalir Home. The Smart Home Bot is different:
controlling your home from a chat app means some messages leave the house. This
section says what leaves, where it goes, and when.

## Always, while the bot runs

To check its licence, the bot sends Thalir your licence key, an identifier for
this box derived from its network hardware, the box's hostname and the add-on
version. Nothing about your devices, your people or your messages is part of
this.

## Only when you use a feature

| Feature | What leaves the box | Who receives it |
|---|---|---|
| WhatsApp Web, linked to your own phone | Messages between the bot and the people you allow, including photos they ask for | WhatsApp, under its own terms |
| Telegram | The same, for Telegram chats | Telegram, under its own terms |
| Cloud WhatsApp, on Thalir's official number | For each person you switch on: their phone number and name, their requests, the devices they may control and those devices' current state, photos and live locations they ask for or share, and any alerts you choose to send this way | Thalir, then delivered through Gupshup and WhatsApp |
| Natural-language requests on the Thalir number | The text of the request | Anthropic, to interpret it |
| Support requests on the Thalir number | Your message and which home it concerns | Thalir support records |
| AI understanding with your own key | The text of a request and the names of your devices | Anthropic, under your account |
| Cloud voice transcription with your own key | The voice note | OpenAI, under your account |
| An official WhatsApp provider on your own account | Messages | Meta or Gupshup, under your account |
| Back up to cloud, when you press it | A copy of the bot's settings and history, encrypted on the box before upload | Thalir storage |

Cloud WhatsApp is off until you switch it on in Settings, and then only for the
people you tick on the Users page. Voice notes are transcribed on the box unless
you add a cloud key.

Opening the bot's web interface loads its typeface from Google Fonts, which
tells Google the address of the browser you used.

## How long Thalir keeps it

* Cloud WhatsApp conversation records: 90 days.
* Alert delivery records: 180 days.
* Photos sent through the Thalir number: only until the short-lived download
  link expires.
* Licence records: while your licence is active.

Photos the bot sends through WhatsApp Web or Telegram can be set to disappear
from the chat after a time you choose, under Settings. A copy someone has
already saved cannot be recalled.

## On the box

Everything else stays on your Home Assistant: your device list, rules,
schedules, history and reports. To see, correct or delete what Thalir holds,
write to **hello@thalirone.com**.
