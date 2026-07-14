<template>
  <button class="crt-replay-btn" title="Replay startup animation" @click="reload">
    &#x23F9; DEGAUSS
  </button>
</template>

<script setup lang="ts">
function reload() {
  window.location.reload()
}
</script>

<style scoped>
.crt-replay-btn {
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
  z-index: 20000;
  background: transparent;
  border: 1px solid #444;
  color: #606060;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s, border-color 0.2s, color 0.2s;
}

.crt-replay-btn:hover {
  opacity: 1;
  border-color: #aaa;
  color: #ccc;
  box-shadow: 0 0 8px rgba(180, 180, 180, 0.3);
}
</style>
