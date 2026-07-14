---
#title: "FIELD REPORT #003: Battery Bank Thermal Event"
date: 2026-04-18
# summary: One cell in the LiFePO4 bank ran hot during fast-charge. BMS caught it before it became a headline.
image: /logo.jpg
---

# FIELD REPORT #003: BATTERY BANK THERMAL EVENT
**SUBJECT:** GOMTUU PRIMARY POWER CORE (LIFEPO4 BANK, 4S CONFIGURATION)
**STATUS:** CONTAINED // BANK DERATED PENDING CELL REPLACEMENT  
**LOCATION:** STATIC CAMP, ELEVATION 6200FT

### THE INCIDENT
During a fast-charge cycle off shore power, the battery management system flagged an over-temperature condition on cell 3 of 4. Ambient temperature was unremarkable (68°F) — the anomaly was isolated to the cell itself, not the environment. The BMS correctly throttled charge current and, when the cell continued climbing, cut charging entirely.


<figure style="text-align: center;">
  <img src="/logo.jpg" alt="Pulled cell 3, flagged by the BMS before it went critical" style="display: block; margin: 0 auto; max-width: 320px;" />
  <figcaption><em>Cell 3, pulled from the pack — placeholder image, swap for a real field photo.</em></figcaption>
</figure>

### DAMAGE ASSESSMENT
- **Cell 3:** Measurable capacity fade, likely from a developing internal short. Not yet in thermal runaway territory, but trending the wrong direction.
- **Cells 1, 2, 4:** Nominal. No cross-contamination of the fault.
- **BMS:** Performed exactly as specified. This is the whole point of paying for a real one instead of the cheap balance-only version.

### RECOVERY & DIAGNOSTICS
Bank was isolated and load-tested cell-by-cell with an external analyzer. Cell 3 confirmed as the fault source and pulled from the pack. Running on 3-cell configuration at reduced capacity until a matched replacement cell arrives — matching internal resistance matters more than matching nominal capacity when you're mixing a new cell into an aged pack.

**Current Telemetry:**
- **Pack voltage:** 12.8V nominal (3-cell derate)
- **Usable capacity:** ~75% of rated
- **BMS cutoff margin:** holding steady, no repeat events in 96 hours

### CITIZEN SCIENTIST VERDICT
This is the failure mode you want — caught early, by a system designed to catch it, with zero drama. The expensive BMS is not a luxury item. It's the difference between a field report and an insurance claim.

> **Lesson:** Buy the BMS that acts like it's guarding something valuable. It is.
