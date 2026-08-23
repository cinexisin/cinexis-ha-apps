# CINEXIS Home

## Setting up

1. Install the app and start it
2. Open **CINEXIS Home** in the sidebar
3. Enter your email address
4. Enter the 6-digit code we email you
5. If you have more than one home, choose the right one
6. You will see **Connected to \<your home\>**

Nothing else is required.

## Why it only asks for an email

Your email selects **which account** we are talking about. It is not what
secures the connection.

On first start the app generates its own cryptographic key inside your Home
Assistant. The private half never leaves your house and we never ask for it.
After you confirm your email, that key becomes this device's identity. If a
device is ever lost or replaced, we revoke that one key — nothing else is
affected, and no shared password exists to change.

## If CINEXIS is unavailable

Your home keeps working. Lights, scenes, automations and locally generated
alerts all run on your Home Assistant and do not wait for us. The app will show
**Offline** and reconnect by itself.

The same is true if your subscription lapses: cloud features pause, your house
does not.

## Remote Support

Optional, and a separate app. If you install it, a CINEXIS engineer can only
connect after **you** approve a session, the session is limited to what you
approved, and it ends automatically. You can end it sooner at any time.

## What we never ask for

Your Wi-Fi password, your Home Assistant password, a recovery code, or a device
secret. Not by email, not in chat, not on a support call.

## Troubleshooting

**"Check your email" and nothing arrives** — check spam, then tap resend. Codes
last ten minutes.

**"Waiting for an administrator"** — your email is verified but not yet linked to
a home. We assign it manually on purpose, so nobody is connected to the wrong
house by accident. Contact support@cinexis.in.

**"Offline"** — your Home Assistant cannot reach the internet, or CINEXIS is
temporarily unavailable. Your home is unaffected; the app retries by itself.

**Still stuck** — support@cinexis.in
