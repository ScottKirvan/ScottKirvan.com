import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ScottKirvan.com",
  description: "TODO: Replace with your project description.",
  base: '/ScottKirvan.com/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/ScottKirvan/ScottKirvan.com' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ScottKirvan/ScottKirvan.com' },
      { icon: 'discord', link: 'https://discord.gg/TN6XJSNK5Y' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Scott Kirvan'
    }
  }
})
