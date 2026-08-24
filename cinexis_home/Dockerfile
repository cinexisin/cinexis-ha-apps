# CINEXIS Home — minimal owner-facing runtime.
#
# No package manager, no shell tooling, no build chain and no dependencies in the
# final image. This app runs in every customer's house, so its attack surface is
# the one worth spending effort on.
ARG BUILD_FROM
ARG BUILD_ARCH=unset

FROM $BUILD_FROM

ARG BUILD_ARCH
ARG CINEXIS_CHANNEL=stable

# ── Node, from Alpine, pinned to an exact package version ────────────────────
#
# NOT the official nodejs.org tarball. Those are glibc-linked, and this is a musl
# base — the binary extracts fine and then `node` is "not found", which is the
# same trap the face-recognition stack fell into on Alpine. Alpine packages a
# musl-native build; pinning the exact package version gives the same
# reproducibility a checksum would, and `apk` verifies its own signatures.
ARG NODE_PKG=20.15.1-r0
RUN set -eu; \
    case "${BUILD_ARCH}" in \
      aarch64|amd64) : ;; \
      *) echo "ERROR: BUILD_ARCH must be aarch64 or amd64 (got '${BUILD_ARCH}')." >&2; exit 1 ;; \
    esac; \
    # A pinned base digest fixes the STARTING POINT, not the patch level.
    # Shipping it unpatched means shipping every fix published since it was cut.
    apk upgrade --no-cache; \
    apk add --no-cache "nodejs=${NODE_PKG}"; \
    # Unused base tooling does not ship. `tempio` renders config templates at
    # container start and nothing here calls it; `bind-tools` is a DNS toolkit
    # this app has no use for. Between them they were 34 of this image's
    # CRITICAL/HIGH findings, all inherited rather than ours.
    apk del --no-cache bind-tools 2>/dev/null || true; \
    rm -f /usr/bin/tempio; \
    node --version; \
    # npm is not installed at all — this app has no dependencies to install, and
    # npm carries its own vendored modules that a scanner reports against an
    # image that never calls it.
    ! command -v npm >/dev/null 2>&1; \
    echo "OK: musl-native Node ${NODE_PKG}, no npm."

WORKDIR /app
COPY src/ ./src/
COPY ui/ ./ui/
COPY keys/ ./keys/
COPY package.json ./
COPY --chmod=0755 run.sh ./run.sh

ENV CINEXIS_CHANNEL=${CINEXIS_CHANNEL}
ENV INGRESS_PORT=8099

# ── Build-time policy assertions ─────────────────────────────────────────────
# The separation is asserted in the image, not only in a document. A future
# change that drags remote-support machinery into the owner app fails here.
RUN set -eu; \
    for banned in frpc ssh sshd docker chromium chromium-browser gcc g++ npm npx; do \
      if command -v "$banned" >/dev/null 2>&1; then \
        echo "ERROR: '$banned' is present in the owner-facing app image." >&2; exit 1; \
      fi; \
    done; \
    if [ -d /app/node_modules ]; then \
      echo "ERROR: node_modules present; this app has no dependencies." >&2; exit 1; \
    fi; \
    if find /app -iname '*baileys*' -o -iname '*whatsapp-web*' 2>/dev/null | grep -q .; then \
      echo "ERROR: a scanned-session WhatsApp library reached the owner app." >&2; exit 1; \
    fi; \
    [ -f /app/keys/bootstrap.pub ] || { echo "ERROR: bootstrap public key missing; the app could not verify a bootstrap document." >&2; exit 1; }; \
    # Fixture rendering is a review aid. It returns a state document and issues
    # no credential, but a shipped image must not start with it switched on.
    if [ -n "${CINEXIS_HOME_FIXTURES:-}" ]; then \
      echo "ERROR: fixture mode is baked into the image environment." >&2; exit 1; \
    fi; \
    node -e 'const f=require("/app/ui/fixtures.json");if(f.states.length!==16)throw new Error("expected 16 contract states, found "+f.states.length);for(const s of f.states)if(!f.fixtures[s])throw new Error("no fixture for "+s)'; \
    echo "OK: no tunnel client, no shell daemon, no compiler, no npm, no dependencies, bootstrap key present. (apk remains: it is the Alpine base's own package manager.)"

# ── Entrypoint ───────────────────────────────────────────────────────────────
#
# `with-contenv` is not decoration. The Home Assistant base runs s6-overlay,
# which sanitises the environment before starting the container command: it
# stashes the container's variables under /run/s6/container_environment and
# hands the command a clean environment. Without this wrapper the server process
# never sees SUPERVISOR_TOKEN — so it can never detect Home Assistant — and
# CINEXIS_CHANNEL silently falls back to `stable`, which then asks the server for
# a channel this build was not signed for.
#
# `docker exec` hides the bug: exec injects the image's configured environment,
# so an interactive check shows the variables present while the actual service
# runs without them. The lifecycle harness asserts against the real service
# process for exactly that reason.
CMD ["/command/with-contenv", "/app/run.sh"]
