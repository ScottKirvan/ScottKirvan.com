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
      text: Access DevLab
      link: /root/devlab/
    - theme: alt
      text: Hardware Specs
      link: /root/gomtuu_specs/

features:
  - icon: 🔧
    title: The DevLab
    details: Tools built and stress-tested under field conditions.
    link: /root/devlab/
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

<!-- Begin Sponsors -->

<div align="center" style="margin-top: 3rem; margin-bottom: 2rem;">
<h2>Sponsors</h2>
 <a href="https://www.sabelhawk.com/" target="_blank">
    <img src="/sabelhawk_dark.png" alt="Sabelhawk Studios" width="300" class="sponsor-logo dark-only" />
    <img src="/sabelhawk_lite.png" alt="Sabelhawk Studios" width="300" class="sponsor-logo light-only" />
  </a>
  <br><br>
  <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem;">
    If you're enjoying this project, or it's saved you some time, consider<br>buying me a coffee or becoming a sponsor — it helps keep the<br> projects going.
  </p><br>
  <div style="display: flex; gap: 12px; justify-content: center; align-items: center; flex-wrap: wrap;">
  <a href="https://ko-fi.com/ScottKirvan" target="_blank">
    <img src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" alt="Support on Ko-fi"  width="160"  />
  </a> &nbsp; &nbsp;
  <a href="https://github.com/sponsors/ScottKirvan" target="_blank">
    <img src="https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github" height="36" />
  </a>
  </div>
  <br>
Thank you! Supporting indie devs makes a real difference.
</div>

<!-- End Sponsors -->
