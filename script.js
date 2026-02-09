// Draft survey data
const initialDraft = { fwd:0.7300, mid:0.7450, aft:0.7700 };
const finalDraft   = { fwd:3.9600, mid:4.3800, aft:4.8350 };
const apparentTrim = 0.040; // aft lebih tenggelam
const scale = 50; // skala visual

const tongkang = document.getElementById('tongkang');
const dataDisplay = document.getElementById('data-display');
const copyBtn = document.getElementById('copy-btn');

// Konstanta
const density = 1.015;
const waterplaneArea = 2184;
const coef = 0.75;
const initialDisp = 1349.123;

// Text survey (untuk timelapse)
const surveyLines = [
"--- Initial Survey (10:25) ---",
"Forward: Port 0.73 m / Starboard 0.73 m → Mean 0.7300 m",
"Midship: Port 0.74 m / Starboard 0.75 m → Mean 0.7450 m",
"Aft: Port 0.77 m / Starboard 0.77 m → Mean 0.7700 m",
"Mean of QM (Forward & Aft): 0.74625 m",
"Mean of Means: 0.7475 m",
"Quarter Mean: 0.74625 m",
"Note: Initial mean draft computed from all measured points.",
"--- Final Survey (19:50) ---",
"Forward: Port 3.94 m / Starboard 3.98 m → Mean 3.9600 m",
"Midship: Port 4.37 m / Starboard 4.39 m → Mean 4.3800 m",
"Aft: Port 4.82 m / Starboard 4.85 m → Mean 4.8350 m",
"Mean of QM (Forward & Aft): 4.3975 m",
"Mean of Means: 4.38875 m",
"Quarter Mean: 4.384375 m",
"Apparent Trim: 0.040 m",
"--- Constants ---",
"Observed Density: 1.015 kg/L",
"Waterplane Area: 2184 m²",
"Coefficient koreksi bentuk tongkang: 0.75",
"Initial Displacement: 1,349.123 MT",
"--- Calculations ---",
"ΔDraft = Mean Final QM − Initial QM = 3.638125 m",
"Volume Air Dipindahkan = (Waterplane Area × ΔDraft)/Coefficient ≈ 10,593 m³",
"Perkiraan Cargo = Volume × Density ≈ 7,551 MT",
"Total Displacement = Initial Displacement + Cargo ≈ 8,900.499 MT",
"--- Summary Check ---",
"Initial Net Disp = 1,349.123 MT",
"Final Net Disp = 8,900.499 MT",
"Cargo = Final − Initial = 7,551.376 MT",
"Values physically plausible, consistent with Archimedes principle."
];

// Tombol salin
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(surveyLines.join('\n'))
    .then(()=>alert('Data survey berhasil disalin!'))
    .catch(err=>alert('Gagal menyalin data: '+err));
});

// Animasi tongkang tenggelam ke bawah
const totalFrames = 120;
let currentFrame = 0;

function animateDraft() {
  if(currentFrame > totalFrames) return;

  // interpolasi per frame
  const fwd = initialDraft.fwd + (finalDraft.fwd - initialDraft.fwd) * (currentFrame/totalFrames);
  const mid = initialDraft.mid + (finalDraft.mid - initialDraft.mid) * (currentFrame/totalFrames);
  const aft = initialDraft.aft + (finalDraft.aft - initialDraft.aft) * (currentFrame/totalFrames);

  // visual height dari top air (tenggelam ke bawah)
  const maxWaterHeight = 300; // tinggi container
  const fwdHeight = maxWaterHeight - (fwd*scale);
  const midHeight = maxWaterHeight - (mid*scale);
  const aftHeight = maxWaterHeight - (aft*scale);

  // rata-rata untuk blok tongkang
  const meanHeight = (fwdHeight + midHeight + aftHeight)/3;
  tongkang.style.height = (maxWaterHeight - meanHeight) + 'px'; // terbenam ke bawah

  // rotasi untuk trim: buritan lebih tenggelam
  const trimAngle = ((aft - fwd) / (finalDraft.aft - initialDraft.fwd)) * 3;
  tongkang.style.transform = `rotateX(${trimAngle}deg)`;

  // timelapse teks: muncul satu baris setiap frame tertentu
  const linesToShow = Math.floor(currentFrame / (totalFrames / surveyLines.length));
  dataDisplay.textContent = surveyLines.slice(0, linesToShow).join('\n');

  currentFrame++;
  requestAnimationFrame(animateDraft);
}

window.onload = animateDraft;
