# Security policy

## Reporting a vulnerability

Email **security@cinexis.in** with enough detail to reproduce the issue. If you
would rather not use email, open a GitHub security advisory on this repository.

Please include what you did, what happened, and what you expected. A proof of
concept helps but is not required to make a report worth sending.

**Please do not** open a public issue for a security problem, and please do not
test against a home that is not yours.

## What to expect

| | |
|---|---|
| Acknowledgement | Within 3 working days |
| Initial assessment | Within 10 working days |
| Fix or mitigation plan | Communicated with the assessment |
| Credit | Offered by default; tell us if you would rather stay anonymous |

We will not take legal action against research carried out in good faith against
your own installation, that does not access other people's data, does not
degrade the service for others, and gives us a reasonable chance to fix the
issue before it is described publicly.

## Scope

**In scope:** the add-ons published in this repository, the images they resolve
to, the enrolment and activation flow, and the way this add-on talks to CINEXIS.

**Out of scope:** Home Assistant itself (report those to the Home Assistant
project), findings that require physical access to an already-trusted device,
and reports produced only by an automated scanner with no demonstrated impact.

## How this add-on is built to limit damage

* **The everyday app is minimal.** No tunnel client, no shell, no compiler, no
  package manager beyond the base image's own, and no dependencies at all.
* **No broad Supervisor access.** It holds `homeassistant_api` only. It cannot
  install, update or remove other add-ons, and it has no `/config` or `/share`
  mount.
* **AppArmor is enforced**, not optional.
* **Ingress only.** No port is published to your home network.
* **Instructions are verified before they are trusted.** The add-on checks an
  Ed25519 signature on the configuration it receives. A document that does not
  verify is discarded and the app reports that CINEXIS is unavailable — it never
  falls back to an unverified endpoint.
* **The device key never leaves the device.** Enrolment sends a public key.
* **No shared fleet credential exists.** Every device has its own identity, and
  any one of them can be revoked without affecting another.
