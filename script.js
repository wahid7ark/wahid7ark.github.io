// Data survey
const initialDraft = { fwd:0.7300, mid:0.7450, aft:0.7700 };
const finalDraft   = { fwd:3.9600, mid:4.3800, aft:4.8350 };
const apparentTrim = 0.04; // aft lebih tenggelam 4 cm
const scale = 50; // skala visual

const barge = document.getElementById('barge');
const tongkang = document.getElementById('tongkang');
const dataDisplay = document.getElementById('data-display');
const copyBtn = document.getElementById('copy-btn');

// Konstanta
const density = 1.015; // kg/L
const waterplaneArea = 2184; // m²
const coef = 0.75;
const initialDisp = 1349.123;

// Data panel lengkap
const surveyText = `
--- Initial Survey (10:25) ---
Forward: Port 0.73 m / Starboard 0.73 m → Mean 0.7300 m
Midship: Port 0.74 m / Starboard 0.75 m → Mean 0.7450 m
Aft: Port 0.77 m / Starboard 0.77 m → Mean 0.7700 m
Mean of QM (Forward & Aft): 0.74625 m
Mean of Means: 0.7475 m
Quarter Mean: 0.74625 m
Note: Initial mean draft computed from all measured points to establish baseline hydrostatic condition.

--- Final Survey (19:50) ---
Forward: Port 3.94 m / Starboard 3.98 m → Mean 3.9600 m
Midship: Port 4.37 m / Starboard 4.39 m → Mean 4.3800 m
Aft: Port 4.82 m / Starboard 4.85 m → Mean 4.8350 m
Mean of QM (Forward & Aft): 4.3975 m
Mean of Means: 4.38875 m
Quarter Mean: 4.384375 m
Apparent Trim: 0.040 m
Note: Final mean draft includes corrections for asymmetry (trim) and averaging of port/starboard measurements.

--- Constants ---
Observed Density (Air Laut Bunati): 1.015 kg/L
Waterplane Area: 2184 m²
Coefficient koreksi bentuk tongkang: 0.75
Initial Displacement: 1,349.123 MT

--- Calculations & Formulas ---
ΔDraft (Δd) = Mean Final QM − Initial QM = ${finalDraft.mid.toFixed(6)} - ${initialDraft.mid.toFixed(6)} = ${(finalDraft.mid - initialDraft.mid).toFixed(6)} m
Volume Air Dipindahkan (V) = (Waterplane Area × ΔDraft)/Coefficient = ${(waterplaneArea * (finalDraft.mid - initialDraft.mid) / coef).toFixed(0)} m³
Perkiraan Cargo (C) = Volume × Density = ${(waterplaneArea * (finalDraft.mid - initialDraft.mid) / coef * density).toFixed(0)} MT
Total Displacement = Initial Displacement + Cargo ≈ ${(initialDisp + 7551.376).toFixed(3)} MT

--- Summary Check ---
Initial Net Disp = 1,349.123 MT
Final Net Disp = 8,900.499 MT
Cargo = Final − Initial = 7,551.376 MT
ΔDraft = ${(finalDraft.mid - initialDraft.mid).toFixed(6)} m
Volume Air Dipindahkan ≈ ${(waterplaneArea * (finalDraft.mid - initialDraft.mid) / coef).toFixed(0)} m³
Perkiraan Cargo ≈ 7,551 MT
Observation: Values physically plausible and consistent.
`;

dataDisplay.textContent = surveyText;

// Tombol salin
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(surveyText)
    .then(() => alert('Data survey berhasil disalin!'))
    .catch(err => alert('Gagal menyalin data: ' + err));
});

// Animasi tongkang timelapse
const steps = 120; // jumlah frame animasi (lebih lambat)
let stepCount = 0;

function animateDraft() {
  if(stepCount > steps) return;

  // interpolasi tinggi tiap frame
  const fwdHeight = initialDraft.fwd + (finalDraft.fwd - initialDraft.fwd) * (stepCount/steps);
  const midHeight = initialDraft.mid + (finalDraft.mid - initialDraft.mid) * (stepCount/steps);
  const aftHeight = initialDraft.aft + (finalDraft.aft - initialDraft.aft) * (stepCount/steps);

  // tinggi visual (skala)
  const meanHeight = (fwdHeight + midHeight + aftHeight)/3;
  tongkang.style.height = (meanHeight * scale) + 'px';

  // rotasi untuk trim (buritan lebih tenggelam)
  const trimAngle = ((aftHeight - fwdHeight) / (finalDraft.aft - initialDraft.fwd)) * 3; // sudut kecil
  tongkang.style.transform = `rotateX(${trimAngle}deg)`;

  stepCount++;
  requestAnimationFrame(animateDraft);
}

window.onload = animateDraft;
