import { defineConfig } from 'vitepress'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Strip a trailing inline YAML comment (`value  # comment`) from a
// regex-captured frontmatter value. Only the real YAML parser
// (used by blogUtils.mts) understands comments natively — this
// regex-based sidebar reader needs to do it manually.
function stripInlineComment(value: string): string {
  return value.replace(/\s+#.*$/, '').trim()
}

// Auto-generates sidebar items from a section's own frontmatter — same
// source of truth as that section's *.data.mts loader, so adding a new
// post there makes it show up here too without hand-editing this file.
// Plain fs + regex instead of createContentLoader: that API needs an
// active VitePress content-loading process, which isn't up yet this
// early during config resolution.
function sectionSidebarItems(folder: string) {
  const dir = join(__dirname, '../root', folder)
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'index.md')

  return files
    .map((file) => {
      // Normalize CRLF -> LF first: some files in this repo have
      // Windows line endings, which break a literal `\n` regex anchor.
      const raw = readFileSync(join(dir, file), 'utf-8').replace(/\r\n/g, '\n')
      const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
      const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '')
      const fmTitleRaw = frontmatter.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1]
      const h1Title = body.match(/^#\s+(.+)$/m)?.[1]?.trim()
      const title = (fmTitleRaw ? stripInlineComment(fmTitleRaw) : undefined) ?? h1Title ?? file
      const dateRaw = frontmatter.match(/^date:\s*(.*)$/m)?.[1] ?? ''
      const date = stripInlineComment(dateRaw)
      return { text: title, link: `/root/${folder}/${file.replace(/\.md$/, '')}`, date }
    })
    .filter((post) => post.date)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(({ text, link }) => ({ text, link }))
}

export default defineConfig({
  title: "CAPTAIN VIDEO",
  description: "Citizen Scientist Mobile Command Center",
  appearance: 'dark', // Default dark, but light mode is a bright-room TV look
  themeConfig: {
    // logo: '/sc-logo-retro.png', // TODO: add logo when ready
    nav: [
      { text: '[ Labs ]', link: '/root/foundry/' },
      { text: '[ Gomtuu ]', link: '/root/gomtuu_specs/' },
      { text: "[ Captain's Log ]", link: '/root/post_mortem/' },
      { text: '[ Contact ]', link: 'https://patreon.com/yourlink' }
    ],
    sidebar: {
      '/root/foundry/': [
        { text: 'Active Projects', items: sectionSidebarItems('foundry') }
      ],
      '/root/gomtuu_specs/': [
        { text: 'Core Systems', items: sectionSidebarItems('gomtuu_specs') }
      ],
      '/root/post_mortem/': [
        { text: 'Mission Brief', link: '/root/post_mortem/mission-brief' },
        { text: 'Field Reports', items: sectionSidebarItems('post_mortem') }
      ]
    },
    socialLinks: [
      { icon: 'patreon', link: 'https://github.com/ScottKirvan' },
      { icon: 'discord', link: 'https://github.com/ScottKirvan' },
      { icon: 'github', link: 'https://github.com/ScottKirvan' }
    ]
  }
})
