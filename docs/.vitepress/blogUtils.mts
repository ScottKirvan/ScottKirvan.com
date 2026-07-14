import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  date: string
  summary: string
  url: string
  image?: string
  link?: { url: string; domain: string }
}

// Strip the frontmatter block so title/summary extraction below never
// accidentally matches something inside it.
function stripFrontmatter(src: string): string {
  return src.replace(/^---\n[\s\S]*?\n---\n?/, '')
}

// Fallback title: first H1 in the body. Lets you skip `title:` in
// frontmatter entirely as long as the post has a `# Heading`.
function extractTitle(src: string): string {
  const match = stripFrontmatter(src).match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Untitled'
}

// Fallback summary: first real prose paragraph. Skips the H1 itself
// and any **LABEL:** metadata lines, then takes the first paragraph
// after that, strips markdown formatting characters.
function extractSummary(src: string): string {
  const body = stripFrontmatter(src)
    .split('\n')
    .filter((line) => !/^#{1,6}\s+/.test(line.trim())) // drop all heading lines, any level
    .filter((line) => !/^\*\*[^*]+:\*\*/.test(line.trim())) // drop **LABEL:** metadata lines
    .join('\n')
    .trim()

  const firstParagraph =
    body.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p.length > 0) ?? ''

  return firstParagraph.replace(/[#*_>`]/g, '').replace(/\s+/g, ' ').trim()
}

// Bluesky's actual post limit — applied uniformly whether the summary
// came from frontmatter or was auto-extracted.
const SUMMARY_LIMIT = 300

function truncate(text: string): string {
  return text.length > SUMMARY_LIMIT
    ? text.slice(0, SUMMARY_LIMIT - 3).trimEnd() + '…'
    : text
}

// Fallback thumbnail: first inline image in the body, markdown
// (`![alt](src)`) or raw HTML (`<img src="...">`), whichever appears
// first.
function extractImage(src: string): string | undefined {
  const body = stripFrontmatter(src)
  const mdMatch = body.match(/!\[[^\]]*\]\(([^)\s]+)\)/)
  const htmlMatch = body.match(/<img[^>]+src=["']([^"']+)["']/)
  const mdIndex = mdMatch ? body.indexOf(mdMatch[0]) : Infinity
  const htmlIndex = htmlMatch ? body.indexOf(htmlMatch[0]) : Infinity
  if (mdIndex === Infinity && htmlIndex === Infinity) return undefined
  return mdIndex <= htmlIndex ? mdMatch?.[1] : htmlMatch?.[1]
}

// Detect a bare URL or markdown link in the body for the "link chip."
// Lightweight — does NOT fetch the target page for a real Bluesky-style
// unfurl (title/description/image). That needs a build-time fetch +
// cache, deliberately deferred as a separate feature.
function extractLink(src: string): { url: string; domain: string } | undefined {
  const body = stripFrontmatter(src)
  const match = body.match(/https?:\/\/[^\s)]+/)
  if (!match) return undefined
  const url = match[0]
  try {
    return { url, domain: new URL(url).hostname.replace(/^www\./i, '') }
  } catch {
    return undefined
  }
}

// YAML auto-parses an unquoted "YYYY-MM-DD" into a real Date object
// (UTC midnight), not a string — normalize back to a plain date string
// so every consumer downstream always gets the same shape.
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

// Shared loader factory — every section's `*.data.mts` should just be
// a one-line call into this with its own glob pattern. All fallback
// rules, the summary cap, and sort order live here exactly once.
export function createBlogLoader(pattern: string) {
  return createContentLoader(pattern, {
    includeSrc: true,
    render: false,
    excerpt: false,
    transform(rawData) {
      return rawData
        .filter((page) => page.frontmatter.date)
        .map((page) => ({
          title: page.frontmatter.title ?? extractTitle(page.src ?? ''),
          date: normalizeDate(page.frontmatter.date),
          summary: truncate(page.frontmatter.summary ?? extractSummary(page.src ?? '')),
          url: page.url,
          image: page.frontmatter.image ?? extractImage(page.src ?? ''),
          link: extractLink(page.src ?? '')
        }))
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    }
  })
}
