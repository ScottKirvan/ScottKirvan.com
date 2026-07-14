<template>
  <!--
    ColorGrade — applies a backdrop-filter color grade to everything
    rendered beneath this overlay (the "signal"), while leaving CRT
    screen artifacts (scanlines, vignette, kinescope) unaffected above it.

    Control via CSS variable in custom.css:
      --crt-grade-filter: grayscale(1);

    Or swap the preset at runtime:
      document.documentElement.style.setProperty('--crt-grade-filter', ColorGrade.presets.heatmap)

    Available presets are exported below as ColorGrade.presets.
  -->

  <!--
    Inline SVG — defines advanced filter kernels referenced by url(#id).
    These are available to backdrop-filter and filter in CSS/style bindings.

    SVG filter primitives (lower-level than CSS functions, full per-channel control):

      feColorMatrix
        type="saturate"  values="0–1"      desaturate/saturate
        type="hueRotate" values="0–360"    rotate hues
        type="luminanceToAlpha"            convert luma to alpha channel
        type="matrix"    values="4x5 mat"  full RGBA→RGBA linear transform
                         matrix layout (row per output channel R G B A):
                           [ rr rg rb ra rc ]   R' = rr*R + rg*G + rb*B + ra*A + rc
                           [ gr gg gb ga gc ]   G' = ...
                           [ br bg bb ba bc ]   B' = ...
                           [ ar ag ab aa ac ]   A' = ...

      feComponentTransfer  — per-channel curve remapping
        feFuncR/G/B/A
          type="table"    tableValues="v0 v1 v2 ..."  piecewise linear lookup
          type="linear"   slope intercept
          type="gamma"    amplitude exponent offset
          type="discrete" tableValues="..."  posterise

      feBlend              — composite two layers (mode: normal multiply screen etc.)
      feComposite          — combine layers with Porter-Duff operators
      feConvolveMatrix     — kernel convolution (sharpen, emboss, edge-detect)
      feGaussianBlur       — gaussian blur
      feOffset             — translate a layer (used with feBlend for shadows)
      feMorphology         — erode / dilate
      feTurbulence         — procedural noise (used in the startup static overlay)
  -->
  <svg class="crt-grade-defs" aria-hidden="true">
    <defs>

      <!--
        Luminance greyscale — explicit weighted sum per ITU-R BT.601 approximation:
          grey = 0.3*R + 0.59*G + 0.11*B
        Applied identically to R, G, and B output channels.
        The 4×5 matrix rows are: [R G B A const] for each of R' G' B' A'
      -->
      <filter id="crt-filter-luminance" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="
          0.3  0.59  0.11  0  0
          0.3  0.59  0.11  0  0
          0.3  0.59  0.11  0  0
          0    0     0     1  0"/>
      </filter>

      <!--
        True heatmap: desaturate → remap luminance to thermal colour ramp
          Dark   → blue / purple
          Mid    → green / yellow
          Bright → orange / red / white
        tableValues are 6 evenly-spaced stops from input=0.0 to input=1.0
      -->
      <filter id="crt-filter-heatmap-svg" color-interpolation-filters="sRGB">
        <feColorMatrix type="saturate" values="0" result="grey"/>
        <feComponentTransfer in="grey">
          <feFuncR type="table" tableValues="0   0   0.2 0.8 1   1  "/>
          <feFuncG type="table" tableValues="0   0.2 0.7 0.9 0.4 0  "/>
          <feFuncB type="table" tableValues="0.4 0.8 0.3 0   0   0  "/>
        </feComponentTransfer>
      </filter>

    </defs>
  </svg>

  <div
    v-if="filter"
    class="crt-grade"
    :style="{ backdropFilter: filter, webkitBackdropFilter: filter }"
    aria-hidden="true"
  />
</template>

<script lang="ts">
/** Named presets — import and pass as the `preset` prop, or use the
 *  CSS variable --crt-grade-filter for pure-CSS control. */
/**
 * CSS backdrop-filter functions available to all presets:
 *
 *   grayscale(0–1)        desaturate fully (1) or partially
 *   sepia(0–1)            shift toward warm brown tones
 *   hue-rotate(deg)       rotate all hues around the colour wheel
 *   saturate(amount)      1=normal  0=grey  3=oversaturated
 *   brightness(amount)    1=normal  0=black  2=doubled
 *   contrast(amount)      1=normal  0=flat grey  2=high contrast
 *   invert(0–1)           1=full photographic negative
 *   blur(px)              gaussian blur
 *   opacity(0–1)          same as CSS opacity
 *   drop-shadow(x y blur colour)   respects alpha unlike box-shadow
 *
 * Chain them in order — each feeds into the next:
 *   e.g. grayscale(1) sepia(1) hue-rotate(-50deg)
 *   = strip colour → add warm tones → rotate toward red
 *
 * SVG filters (full per-channel control, reference by url(#id)):
 *   url(#crt-filter-luminance)    weighted greyscale  0.3R+0.59G+0.11B
 *   url(#crt-filter-heatmap-svg)  luminance → thermal colour ramp
 */
export const presets = {
  none:        '',
  monochrome:  'grayscale(1)',
  luminance:   'url(#crt-filter-luminance)',   // 0.3R + 0.59G + 0.11B per channel
  sepia:       'sepia(0.85) brightness(0.95)',
  heatmap:     'grayscale(1) sepia(1) hue-rotate(-50deg) saturate(8) contrast(1.4)',
  heatmapSvg:  'url(#crt-filter-heatmap-svg)', // true luminance→thermal remap
  cool:        'hue-rotate(180deg) saturate(1.8) brightness(0.9)',
  invert:      'invert(1)',
  nightVision: 'invert(1) hue-rotate(90deg) saturate(3) brightness(0.85)',
  bleach:      'contrast(1.4) brightness(1.1) saturate(0.4)',
} as const

export type Preset = keyof typeof presets
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  /** Named preset. If omitted, falls back to --crt-grade-filter CSS variable. */
  preset?: Preset
}>(), {
  preset: undefined
})

// Read CSS variable fallback on client only
const cssVar = ref('')
onMounted(() => {
  cssVar.value = getComputedStyle(document.documentElement)
    .getPropertyValue('--crt-grade-filter').trim()
})

const filter = computed(() => {
  if (props.preset !== undefined) return presets[props.preset]
  return cssVar.value
})
</script>

<style scoped>
.crt-grade-defs {
  position: absolute;
  width: 0; height: 0;
  overflow: hidden;
  pointer-events: none;
}

.crt-grade {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  pointer-events: none;
  /* Below all CRT screen artifacts (vignette: 9998, scanlines: 9999)
     but above page content — grades the signal, not the screen */
  z-index: 9995;
}
</style>
