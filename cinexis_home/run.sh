#!/bin/sh
#
# CINEXIS Home application entrypoint.
#
# Invoked by s6 as the container CMD, through /command/with-contenv so the
# service inherits SUPERVISOR_TOKEN and CINEXIS_CHANNEL from the s6 container
# environment. Without that wrapper the process cannot detect Home Assistant and
# silently falls back to the stable channel.
#
# `exec` so node replaces this shell and becomes the process s6 supervises —
# otherwise signals stop at the wrapper and shutdown hangs.
set -e
exec node /app/src/server.js
