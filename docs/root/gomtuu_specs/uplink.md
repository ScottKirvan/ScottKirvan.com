---
date: 2026-05-25  # PLACEHOLDER — set to the real uplink build/documentation date
---

# Uplink Topology

**Gomtuu Communication Architecture**

Redundant, geographically distributed uplinks for resilient command & control.

## Primary Uplink
- **Starlink Dish V2** (Low-earth orbit, ~40ms latency)
- Real-time telemetry backhaul
- Remote session capability
- Bandwidth: 140Mbps ↓ / 18Mbps ↑

## Fallback Uplink
- **Cellular (4G/5G)** — Universal coverage fallback
- Conditional activation (cost optimization)

## Redundancy Model
Primary → Failover → Fallback. Automatic switchover on SNR degradation (< 8dB).

## Telemetry
- Starlink SNR (Signal-to-Noise Ratio)
- Throughput metrics
- Latency monitoring
- Uplink selection status

*Detailed network topology diagrams and failover procedures coming soon.*
