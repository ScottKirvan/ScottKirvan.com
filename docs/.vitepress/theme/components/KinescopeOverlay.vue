<template>
  <div class="crt-kinescope" aria-hidden="true" />
</template>

<style scoped>
.crt-kinescope {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 10000;

  background-image: url('/crt.gif');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  /* Screen blend: bright GIF areas brighten the page beneath,
     dark areas are transparent — classic kinescope roll */
  mix-blend-mode: screen;

  opacity: 0;
  animation: kinescope-appear var(--crt-startup-dur, 5.2s) ease-out 1 forwards;
}

@keyframes kinescope-appear {
  0%   { opacity: 0; }
  80%  { opacity: 0; }
  100% { opacity: var(--crt-kinescope-opacity, 0.18); }
}
</style>
