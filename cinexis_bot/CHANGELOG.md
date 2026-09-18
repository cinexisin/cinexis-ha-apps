# Changelog

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
