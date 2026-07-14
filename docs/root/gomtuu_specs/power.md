---
date: 2026-03-15  # PLACEHOLDER — set to the real power-system build/documentation date
---

# Power Systems

**Gomtuu Primary Power Architecture**

Hybrid solar + auxiliary battery redundancy for sustained 72+ hour autonomous operation.

## Power Budget
- **Primary:** 400W solar array (LiFePO₄ bank, 10kWh usable)
- **Auxiliary:** Diesel generator (15kW, gen-set backup)
- **UPS:** Dedicated inverter (5kW continuous, 10kW peak)

## Telemetry
- Battery voltage (nominal 48V)
- Charge current (MPPT controller)
- Solar array output (real-time)
- Load distribution (sub-metered)

## Design Philosophy
No single point of failure. Loss of solar = fallback to batteries. Loss of batteries = generator spin-up. System restarts itself.

*Detailed specifications and wiring diagrams coming soon.*
