<template>
  <div class="blog-index">
    <a
      v-for="post in posts"
      :key="post.url"
      :href="withBase(post.url)"
      class="blog-entry"
    >
      <div class="entry-date">
        <div class="entry-stardate">{{ toStardate(post.date) }}</div>
        <div class="entry-realdate">{{ formatDate(post.date) }}</div>
      </div>
      <div class="entry-body">
        <img
          v-if="post.image"
          :src="withBase(post.image)"
          :alt="post.title"
          class="entry-thumb"
        />
        <div class="entry-text">
          <h3 class="entry-title">{{ post.title }}</h3>
          <p class="entry-summary">{{ post.summary }}</p>
          <div v-if="post.link" class="entry-link-chip">
            🔗 {{ post.link.domain }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  posts: {
    title: string
    date: string
    summary: string
    url: string
    image?: string
    link?: { url: string; domain: string }
  }[]
}>()

// Bare "YYYY-MM-DD" is parsed by `new Date()` as UTC midnight, which
// displays as the previous day in any timezone behind UTC. Forcing
// local midnight avoids that silent off-by-one.
function toLocalDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`)
}

function formatDate(iso: string): string {
  return toLocalDate(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Captain Video's canon is set in 2254 — display-only offset from the
// real `date:` frontmatter, which stays untouched for actual sorting.
// Format: YEAR.DAYOFYEAR (day-of-year, 3-digit padded).
const STARDATE_OFFSET_YEARS = 228

function toStardate(iso: string): string {
  const real = toLocalDate(iso)
  const future = new Date(real)
  future.setFullYear(real.getFullYear() + STARDATE_OFFSET_YEARS)

  const startOfYear = new Date(future.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((future.getTime() - startOfYear.getTime()) / 86400000) + 1

  return `STARDATE ${future.getFullYear()}.${String(dayOfYear).padStart(3, '0')}`
}
</script>

<style scoped>
.blog-index {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--crt-border, #333);
}

.blog-entry {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1.5rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--crt-border, #333);
  text-decoration: none;
  color: inherit;
}

.blog-entry:hover .entry-title {
  text-decoration: underline;
}

.entry-date {
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  padding-top: 0.2rem;
}

.entry-stardate {
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: var(--crt-text-dim, #444);
  text-shadow:
    0 0 6px rgba(var(--crt-phosphor, 20, 20, 20), 0.5),
    0 0 14px rgba(var(--crt-phosphor, 20, 20, 20), 0.25);
}

.entry-realdate {
  font-size: 0.7rem;
  color: var(--crt-text-faint, #787878);
  margin-top: 0.15rem;
}

.entry-body {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.entry-thumb {
  width: 96px;
  height: 64px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid var(--crt-border, #333);
}

.entry-text {
  min-width: 0;
}

.entry-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.05rem;
}

.entry-summary {
  margin: 0;
  font-size: 0.9rem;
  color: var(--crt-text-dim, #444);
}

.entry-link-chip {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.2rem 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--crt-text-faint, #787878);
  border: 1px solid var(--crt-border, #333);
  border-radius: 3px;
}

@media (max-width: 600px) {
  .blog-entry {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
}
</style>
