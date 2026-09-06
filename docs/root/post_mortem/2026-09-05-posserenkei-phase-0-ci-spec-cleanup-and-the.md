---
title: "PosseRenkei Phase 0: CI, Spec Cleanup, and the Blog Writer Verified End-to-End"
date: 2026-09-05
summary: "PosseRenkei is a self-hosted syndication pipeline that publishes content on my own blog and pushes it out to social platforms, starting with Bluesky. This post is itself a real test of that pipeline's blog-writing path: it was generated and opened as a pull request by the same V…"
image: "/posserenkei/logo.jpg"
---

PosseRenkei is a self-hosted syndication pipeline that publishes content on my own blog and pushes it out to social platforms, starting with Bluesky. This post is itself a real test of that pipeline's blog-writing path: it was generated and opened as a pull request by the same VitePress destination adapter (destinations/vitepress.py) that will eventually carry syndicated posts from Facebook, Instagram, and other sources onto this site.

Today's work session covered three things. First, a Phase 0 environment audit found the dev sandbox had no working Python 3.11+ toolchain and no CI enforcing tests or lint, so both got fixed: a uv-managed Python 3.11.16 interpreter was already available, the full test suite now runs clean (41 passing), and a new GitHub Actions workflow runs pytest and ruff on every push and pull request. Second, a handful of stale cross-references in the project's spec documents got corrected. Third, and most directly relevant to this post: composing a realistic, multi-paragraph test post with a distinct headline surfaced a real bug, where the headline was duplicating itself into both the post body and the summary field. That's fixed now, and this post is the proof.

If you're reading this as a real, merged post on scottkirvan.com, the blog-writer adapter's pull_request mode worked exactly as designed: no auto-merge, generated markdown and image committed to a new branch, and a PR opened for review.

![PosseRenkei logo](/posserenkei/logo.jpg)
