// Draft survey Wahid
const timestamps = ['10:25','19:50'];
const draftTimeline = [
  { port:0.73, mid:0.745, starboard:0.77 }, // initial
  { port:3.94, mid:4.38, starboard:4.835 }  // final
];

// Konstanta
const waterplaneArea = 91*24; // m²
const coef = 0.75;
const density = 1.015; 
const initialDisp = 1349.123; 
const overlayBarge = document.getElementById('overlay-barge');
const dataDisplay = document.getElementById('data-display');

const scale = 50; 
const duration = 10000; // total animasi 10 detik

// Hitung mean draft & cargo
function computeData(draft){
  const meanDraft = (draft.port + draft.mid + draft.starboard)/3;
  const deltaDraft = meanDraft - 0.74625; // QM initial
  const volume = waterplaneArea * deltaDraft / coef;
  const cargo = volume * density;
  const dispFinal = initialDisp + cargo;
  return {meanDraft, deltaDraft, volume, cargo, dispFinal};
}

// Animasi gradual
function animateDraft(){
  const startDraft = draftTimeline[0];
  const endDraft = draftTimeline[1];
  const startTime = performance.now();

  function step(now){
    const t = Math.min((now - startTime)/duration, 1); // 0→1
    // interpolasi draft tiap sisi
    const draft = {
      port: startDraft.port + (endDraft.port - startDraft.port)*t,
      mid: startDraft.mid + (endDraft.mid - startDraft.mid)*t,
      starboard: startDraft.starboard + (endDraft.starboard - startDraft.starboard)*t
    };

    // update overlay (tinggi rata-rata)
    const avgDraft = (draft.port + draft.mid + draft.starboard)/3;
    overlayBarge.style.height = (avgDraft*scale)+'px';

    // update panel data
    const data = computeData(draft);
    dataDisplay.textContent =
`Time: interpolated
Draft (Port/Mid/Starboard): ${draft.port.toFixed(3)}/${draft.mid.toFixed(3)}/${draft.starboard.toFixed(3)} m
Mean Draft: ${data.meanDraft.toFixed(3)} m
ΔDraft (QM Initial): ${data.deltaDraft.toFixed(3)} m
Volume Air Dipindahkan: ${data.volume.toFixed(0)} m³
Perkiraan Cargo: ${data.cargo.toFixed(0)} MT
Total Displacement: ${data.dispFinal.toFixed(0)} MT`;

    if(t<1){
      requestAnimationFrame(step);
    } else {
      // animasi selesai, tampilkan final timestamp
      const finalData = computeData(endDraft);
      dataDisplay.textContent =
`Time: 19:50
Draft (Port/Mid/Starboard): ${endDraft.port.toFixed(3)}/${endDraft.mid.toFixed(3)}/${endDraft.starboard.toFixed(3)} m
Mean Draft: ${finalData.meanDraft.toFixed(3)} m
ΔDraft (QM Initial): ${finalData.deltaDraft.toFixed(3)} m
Volume Air Dipindahkan: ${finalData.volume.toFixed(0)} m³
Perkiraan Cargo: ${finalData.cargo.toFixed(0)} MT
Total Displacement: ${finalData.dispFinal.toFixed(0)} MT`;
    }
  }

  requestAnimationFrame(step);
}

window.onload = animateDraft;
