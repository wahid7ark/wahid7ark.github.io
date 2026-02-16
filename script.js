// ======================================================
// BG ARK CARNELIAN — SURVEYOR CALCULATION ENGINE
// Quarter Mean Draft + Hydrostatic Interpolation
// + TRIM CORRECTION (MCT) + LCF + Density
// ======================================================

// ---------- HYDROSTATIC TABLE (dipersingkat contoh) ----------
// (pakai seluruh tabel yang sudah kamu punya — JANGAN DIUBAH)
const hydroTable = [
{d:0.70,disp:1273.65,tpc:19.15,lcf:47.413,mct:16385},
{d:0.75,disp:1369.61,tpc:19.25,lcf:47.464,mct:16626},
{d:4.35,disp:8911.67,tpc:22.24,lcf:44.512,mct:26050},
{d:4.40,disp:9022.97,tpc:22.24,lcf:44.523,mct:26083}
];

// ======================================================
// INTERPOLATION (linear — sama seperti surveyor manual)
// ======================================================
function interpolate(draft){

let low=null, high=null;

for(let i=0;i<hydroTable.length-1;i++){
if(draft>=hydroTable[i].d && draft<=hydroTable[i+1].d){
low=hydroTable[i];
high=hydroTable[i+1];
break;
}
}

if(!low||!high) return null;

let ratio=(draft-low.d)/(high.d-low.d);

return{
disp: low.disp + ratio*(high.disp-low.disp),
tpc:  low.tpc  + ratio*(high.tpc-low.tpc),
lcf:  low.lcf  + ratio*(high.lcf-low.lcf),
mct:  low.mct  + ratio*(high.mct-low.mct)
};
}

// ======================================================
// MAIN CALCULATION
// ======================================================
window.calculateSurveyorCargo=function(){

// ---------- ambil input ----------
function val(id){return parseFloat(document.getElementById(id).value)||0;}

let ifp=val("ifp"), ifs=val("ifs");
let imp=val("imp"), ims=val("ims");
let iap=val("iap"), ias=val("ias");
let densI=val("densI")||1.025;

let ffp=val("ffp"), ffs=val("ffs");
let fmp=val("fmp"), fms=val("fms");
let fap=val("fap"), fas=val("fas");
let densF=val("densF")||1.025;

// ---------- rata kiri kanan ----------
function mean(a,b){return (a+b)/2;}

let iF=mean(ifp,ifs);
let iM=mean(imp,ims);
let iA=mean(iap,ias);

let fF=mean(ffp,ffs);
let fM=mean(fmp,fms);
let fA=mean(fap,fas);

// ---------- QUARTER MEAN DRAFT ----------
let iQM=(iF+6iM+iA)/8;
let fQM=(fF+6fM+fA)/8;

// ---------- TRIM ----------
let iTrim=iA-iF;
let fTrim=fA-fF;

// ---------- HYDROSTATIC ----------
let iHyd=interpolate(iQM);
let fHyd=interpolate(fQM);

if(!iHyd||!fHyd){
alert("Draft diluar tabel hidrostatik");
return;
}

// ---------- TRIM CORRECTION (INI YANG DULU HILANG) ----------
function trimCorrection(trim,hydro){

// convert meter -> centimeter
let trim_cm=trim*100;

// MCT unit: moment per 1cm
// correction displacement:
return (trim_cm * hydro.tpc * hydro.lcf) / hydro.mct;
}

let iTrimCorr=trimCorrection(iTrim,iHyd);
let fTrimCorr=trimCorrection(fTrim,fHyd);

// ---------- DISPLACEMENT SETELAH TRIM ----------
let iDisp=iHyd.disp + iTrimCorr;
let fDisp=fHyd.disp + fTrimCorr;

// ---------- DENSITY CORRECTION ----------
iDisp=iDisp*(densI/1.025);
fDisp=fDisp*(densF/1.025);

// ---------- CARGO ----------
let cargo=fDisp-iDisp;

// ---------- OUTPUT DETAIL ----------
document.getElementById("result").innerHTML=`
<b>Initial QM:</b> ${iQM.toFixed(3)} m<br>
<b>Final QM:</b> ${fQM.toFixed(3)} m<br><br>

<b>Initial Disp (corr):</b> ${iDisp.toFixed(2)} MT<br>
<b>Final Disp (corr):</b> ${fDisp.toFixed(2)} MT<br><br>

<b style="font-size:20px">CARGO WEIGHT: ${cargo.toFixed(2)} MT</b>
`;

}
