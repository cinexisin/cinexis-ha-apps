# Privacy

## What this add-on sends to CINEXIS

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

Your account and subscription records are held on CINEXIS servers. The device
key stays on your device, in the add-on's private storage, readable only by the
add-on.

## Retention and deletion

Ask us at **privacy@cinexis.in** to see, correct or delete what we hold. Removing
the add-on and asking us to revoke the device ends the connection immediately;
local Home Assistant operation is unaffected.

## Remote Support

The separate Remote Support add-on is not installed by default and never
installs itself. When you approve a session, a CINEXIS engineer can reach your
Home Assistant for a limited window that you can end at any time. Sessions are
recorded in an append-only audit log. Nothing happens without your approval for
that specific session.

## Third parties

Payment is handled by our payment provider; CINEXIS does not receive or store
your card details. No analytics, advertising or tracking script runs in this
add-on's interface.
