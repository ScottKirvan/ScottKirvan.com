---
# ── page metadata (invisible — controls <title>/<meta>, not page body) ──
title: Captain Video's Mountain Retreat
titleTemplate: false
description: Field documentation site for a citizen-scientist mobile command center.
# head:
#   - - meta
#     - name: og:image
#       content: /logo.jpg

# ── layout ────────────────────────────────────────────────────────────
layout: home

# pageClass: home-page          # adds a custom class to the root .Layout div

# footer: false                 # would hide the footer on this page — moot right
                                 # now since themeConfig.footer isn't set in config.mts

hero:
  name: "CAPTAIN VIDEO'S MOUNTAIN RETREAT"
  text: "SYSTEM INITIALIZED."
  tagline: "Primary Telemetry & Command Center"
#  image:
#    src: /logo.jpg
#    alt: Scott Kirvan
  actions:
    - theme: brand
      text: Access Foundry
      link: /root/foundry/
    - theme: alt
      text: Hardware Specs
      link: /root/gomtuu_specs/

features:
  - icon: 🔧
    title: The Foundry
    details: Tools built and stress-tested under field conditions.
    link: /root/foundry/
    linkText: Enter
  - icon: 🚐
    title: Gomtuu Specs
    details: Power systems and uplink topology — real engineering docs.
    link: /root/gomtuu_specs/
    linkText: Enter
  - icon: 📡
    title: Captain's Log
    details: Field failures, documented honestly.
    link: /root/post_mortem/
    linkText: Enter

# markdownStyles: true          # default — wraps content below in prose styling.
                                 # set false to render it raw/unstyled instead.
---

## Transmission Log

This is ordinary markdown, rendered by `<Content />` inside `VPHomeContent`, underneath the hero and features grid above.

- Mobile command center, currently field-testing
- All systems documented as they're built, not after the fact
- Signal strength: nominal
