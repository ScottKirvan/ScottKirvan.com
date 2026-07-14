<template>
  <div class="telemetry-container">
    <!-- System Status Header -->
    <div class="status-header">
      <h3>[ GOMTUU PRIMARY SYSTEMS ]</h3>
      <div class="status-indicator" :class="systemStatus.toLowerCase()">
        ● {{ systemStatus }}
      </div>
    </div>

    <!-- Gauge Readout -->
    <div class="gauge-grid">
      <div class="gauge-item">
        <div class="gauge-label">POWER CHARGE</div>
        <svg class="gauge" viewBox="0 0 120 120">
          <!-- Background circle -->
          <circle cx="60" cy="60" r="50" class="gauge-bg" />
          <!-- Progress arc -->
          <circle
            cx="60"
            cy="60"
            r="50"
            class="gauge-progress"
            :style="{ '--percentage': batteryLevel }"
          />
          <!-- Center text -->
          <text x="60" y="65" class="gauge-text">{{ batteryLevel }}%</text>
        </svg>
      </div>

      <div class="gauge-item">
        <div class="gauge-label">UPLINK SNR</div>
        <svg class="gauge" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" class="gauge-bg" />
          <circle
            cx="60"
            cy="60"
            r="50"
            class="gauge-progress signal"
            :style="{ '--percentage': uplinkSNR }"
          />
          <text x="60" y="65" class="gauge-text">{{ uplinkSNR }}dB</text>
        </svg>
      </div>

      <div class="gauge-item">
        <div class="gauge-label">CORE TEMP</div>
        <svg class="gauge" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" class="gauge-bg" />
          <circle
            cx="60"
            cy="60"
            r="50"
            class="gauge-progress temperature"
            :style="{ '--percentage': coreTemp }"
          />
          <text x="60" y="65" class="gauge-text">{{ coreTemp }}°C</text>
        </svg>
      </div>
    </div>

    <!-- Data Feed -->
    <div class="telemetry-feed">
      <div class="feed-item">
        <span class="label">UPTIME:</span>
        <span class="value">{{ uptime }}</span>
      </div>
      <div class="feed-item">
        <span class="label">THROUGHPUT:</span>
        <span class="value">140Mbps ↓ / 18Mbps ↑</span>
      </div>
      <div class="feed-item">
        <span class="label">LOCATION:</span>
        <span class="value">MOBILE OPS</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Simulated telemetry data
const systemStatus = ref("OPERATIONAL");
const batteryLevel = ref(75);
const uplinkSNR = ref(11.2);
const coreTemp = ref(45);
const uptime = ref("284h 18m");

// Animate gauges on mount
onMounted(() => {
  // Battery level pulse animation
  setInterval(() => {
    batteryLevel.value = Math.max(
      65,
      Math.min(85, batteryLevel.value + (Math.random() - 0.5) * 4)
    );
  }, 2000);

  // Signal strength variation
  setInterval(() => {
    uplinkSNR.value = Math.max(
      8,
      Math.min(13, uplinkSNR.value + (Math.random() - 0.5) * 0.8)
    );
  }, 1500);

  // Temperature drift
  setInterval(() => {
    coreTemp.value = Math.max(
      40,
      Math.min(55, coreTemp.value + (Math.random() - 0.5) * 3)
    );
  }, 2500);
});
</script>

<style scoped>
.telemetry-container {
  border: 2px solid #ffb000;
  background: rgba(5, 5, 5, 0.8);
  padding: 1.5rem;
  font-family: "JetBrains Mono", monospace;
  color: #ffb000;
  text-transform: uppercase;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 176, 0, 0.3);
}

.status-header h3 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 2px;
}

.status-indicator {
  font-size: 0.85rem;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border: 1px solid #ffb000;
  background: rgba(255, 176, 0, 0.1);
}

.status-indicator.operational {
  border-color: #00ff00;
  color: #00ff00;
}

.gauge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.gauge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gauge-label {
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
  color: rgba(255, 176, 0, 0.8);
}

.gauge {
  width: 100px;
  height: 100px;
  transform: rotate(-90deg);
}

.gauge-bg {
  fill: none;
  stroke: rgba(255, 176, 0, 0.1);
  stroke-width: 8;
}

.gauge-progress {
  fill: none;
  stroke: #ffb000;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 314; /* 2 * π * 50 */
  stroke-dashoffset: calc(314 * (1 - var(--percentage, 0) / 100));
  transition: stroke-dashoffset 0.6s ease-out;
}

.gauge-progress.signal {
  stroke: #00ff00;
}

.gauge-progress.temperature {
  stroke: #ff6b35;
}

.gauge-text {
  font-size: 14px;
  font-weight: bold;
  text-anchor: middle;
  fill: #ffb000;
  transform: rotate(90deg) translateX(50%);
}

.gauge-progress.signal ~ .gauge-text {
  fill: #00ff00;
}

.gauge-progress.temperature ~ .gauge-text {
  fill: #ff6b35;
}

.telemetry-feed {
  border-top: 1px solid rgba(255, 176, 0, 0.3);
  padding-top: 1rem;
  display: grid;
  gap: 0.5rem;
}

.feed-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 0.25rem 0;
}

.label {
  color: rgba(255, 176, 0, 0.7);
  flex: 0 0 auto;
}

.value {
  color: #ffb000;
  font-weight: bold;
  flex: 1;
  text-align: right;
}
</style>
