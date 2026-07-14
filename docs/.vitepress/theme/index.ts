import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Telemetry from './components/Telemetry.vue'
import ReplayButton from './components/ReplayButton.vue'
import KinescopeOverlay from './components/KinescopeOverlay.vue'
import ColorGrade from './components/ColorGrade.vue'
import BlogIndex from './components/BlogIndex.vue'
import './custom.css'

const theme: Theme = {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, {
        'layout-bottom': () => [h(ColorGrade), h(KinescopeOverlay), h(ReplayButton)]
    }),
    enhanceApp({ app }) {
        // Register Telemetry component globally
        app.component('Telemetry', Telemetry)
        // Register BlogIndex globally — used by post-list index pages
        app.component('BlogIndex', BlogIndex)
    }
}

export default theme
