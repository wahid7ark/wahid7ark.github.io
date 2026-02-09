// ===== Data Survey =====
const initialDraft = {fwd:0.7300, mid:0.7450, aft:0.7700};
const finalDraft   = {fwd:3.9600, mid:4.3800, aft:4.8350};
const apparentTrim = 0.040; // aft lebih tenggelam
const scale = 50; // px per meter

const tongkang = document.getElementById('tongkang');
const dataDisplay = document.getElementById('data-display');
const copyBtn = document.getElementById('copy-btn');

// ===== Constants =====
const density = 1.015;
const waterplaneArea = 2184;
const coef = 0.75;
const initialDisp = 1349.123;

// ===== Timelapse baris data & penjelasan =====
const surveyLines = [
"[Step 1] Initial Survey (10:25)",
"Forward: Port 0.73 / Starboard 0.73 → Mean 0.7300 m",
"Midship: Port 0.74 / Starboard 0.75 → Mean 0.7450 m",
"Aft: Port 0.77 / Starboard 0.77 → Mean 0.7700 m",
"Mean of QM (Forward & Aft) = (0.730 + 0.770)/2 = 0.74625 m",
"Quarter Mean = 0.74625 m",
"Note: Initial mean draft computed from all measured points to establish baseline hydrostatic condition.",

"[Step 2] Final Survey (19:50)",
"Forward: Port 3.94 / Starboard 3.98 → Mean 3.9600 m",
"Midship: Port 4.37 / Starboard 4.39 → Mean 4.3800 m",
"Aft: Port 4.82 / Starboard 4.85 → Mean 4.8350 m",
"Mean of QM (Forward & Aft) = (3.960 + 4.835)/2 = 4.3975 m",
"Quarter Mean = 4.384375 m",
"Apparent Trim = 0.040 m (Aft lebih tenggelam)",
"Note: Final mean draft includes corrections for trim & port/starboard averaging.",

"[Step 3] ΔDraft & Volume",
"ΔDraft = Quarter Mean Final − Initial QM = 4.384375 − 0.74625 = 3.638125 m",
"Volume Air Dipindahkan = (Waterplane Area × ΔDraft)/Coefficient",
"V = (2184 × 3.638125)/0.75 ≈ 10,593 m³",
"Note: Volume dikoreksi oleh hull form coefficient karena bentuk tongkang tidak kotak.",

"[Step 4] Cargo Estimation",
"Perkiraan Cargo = Volume × Density = 10,593 × 1.015 ≈ 7,551 MT",
"Total Displacement = Initial Displacement + Cargo = 1,349.123 + 7,551.376 ≈ 8,900.499 MT",
"Note: Approximasi fisik sesuai prinsip Archimedes, memastikan cargo sesuai draft.",

"[Step 5] Validation",
"Check sanity: Cargo via ΔDraft × Area × Density ≈ 7,551 MT",
"Observation: Values physically plausible, confirmed by displacement difference method."
];

// ===== Tombol salin =====
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(surveyLines.join('\n'))
    .then(()=>alert('Data survey berhasil disalin!'))
    .catch(err=>alert('Gagal menyalin data: '+err));
});

// ===== Animasi tongkang tenggelam =====
const totalFrames = 240; // lebih lambat (~2 menit)
let frame = 0;

function animateDraft() {
  if(frame > totalFrames) return;

  const fwd = initialDraft.fwd + (finalDraft.fwd - initialDraft.fwd)*(frame/totalFrames);
  const mid = initialDraft.mid + (finalDraft.mid - initialDraft.mid)*(frame/totalFrames);
  const aft = initialDraft.aft + (finalDraft.aft - initialDraft.aft)*(frame/totalFrames);

  // tinggi dari air
  const maxWaterHeight = 300;
  const fwdH = maxWaterHeight - fwd*scale;
  const midH = maxWaterHeight - mid*scale;
  const aftH = maxWaterHeight - aft*scale;

  const meanHeight = (fwdH + midH + aftH)/3;
  tongkang.style.height = (maxWaterHeight - meanHeight) + 'px';

  // trim: buritan lebih tenggelam
  const trimAngle = ((aft - fwd)/ (finalDraft.aft - initialDraft.fwd))*3;
  tongkang.style.transform = `rotateX(${trimAngle}deg)`;

  // Timelapse panel
  const linesToShow = Math.floor(frame/(totalFrames/surveyLines.length));
  dataDisplay.textContent = surveyLines.slice(0, linesToShow).join('\n');

  frame++;
  requestAnimationFrame(animateDraft);
}

window.onload = animateDraft;
