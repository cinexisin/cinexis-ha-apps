# AGENTS.md — CINEXIS add-on store

This repository is the Home Assistant add-on store that customers add to their
Home Assistant. **It contains no source code.** It carries manifests, icons and
customer-facing documentation; the add-on images themselves are built from
`cinexisin/cinexis-bot` and published to GHCR, and the manifest here points at
them by version.

This repository is **public**. Anything committed here is world-readable,
forever. Check twice before adding a file.

## What is here

```
repository.yaml       the store's own identity
cinexis_bot/          the product: config.yaml, DOCS.md, CHANGELOG.md, README.md,
                      LICENSE.md, apparmor.txt, icon.png, logo.png, translations/
cinexis_home/         the companion add-on
README, SECURITY, SUPPORT, PRIVACY
```

`cinexis_bot/config.yaml`, `DOCS.md` and `CHANGELOG.md` are **copies** whose
source of truth is `addons/cinexis-bot/` in the add-on repository. Edit them
there and copy them here; an edit made only here is lost at the next release.

## Releasing a version here

Only after the **Release add-on images** workflow in the add-on repo has gone
green for that tag. The manifest points at an image by version: bump it before
the image exists and every customer's Home Assistant shows a broken update.

1. Set `version:` in `cinexis_bot/config.yaml`.
2. Copy `CHANGELOG.md` and `DOCS.md` from the add-on repo.
3. Commit and push `main`.

The changelog is shown to the customer on the Update card inside Home
Assistant. Write it for them: what changed for their home, not what changed in
the code.

## Rules

- Never hand-edit a version to a number that has no published image.
- Never replace a digest pin with a floating tag.
- No secrets, no licence keys, no phone numbers, no customer names, no internal
  hostnames or IP addresses. This repository is public.
- Screenshots are customer-facing marketing: no real phone numbers, no real
  addresses, no other customers' device names.

## Conventions

- Branch, PR against `main`, one concern per PR.
- End the PR description with **Asks for Claude Code / owner** for anything you
  cannot do yourself.
- Times in IST.
