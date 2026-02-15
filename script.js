// Set current year in footer
document.getElementById("year").innerText = new Date().getFullYear();

// ========== FULL HYDROSTATIC TABLE – BG ARK CARNELIAN ==========
const hydroTable = [
  {draft:0.500, disp:894.77,  lcb:47.171, vcb:0.255, tpc:18.69, lcf:47.315, degTrim:15479, kml:991.07, kmt:100.582},
  {draft:0.550, disp:988.53,  lcb:47.186, vcb:0.281, tpc:18.83, lcf:47.311, degTrim:15714, kml:910.70, kmt:92.489},
  // ... (semua baris dari hydroTable yang lain tetap dipertahankan)
  {draft:5.000, disp:10357.59, lcb:45.910, vcb:2.595, tpc:22.22, lcf:44.466, degTrim:26117, kml:144.46, kmt:12.972}
];

// Number parser helper
function num(x) { return parseFloat(String(x).replace(",", ".") || 0); }

// Linear interpolation
function interpolate(draft) {
    for (let i = 0; i < hydroTable.length - 1; i++) {
        let a = hydroTable[i];
        let b = hydroTable[i + 1];
        if (draft >= a.draft && draft <= b.draft) {
            let r = (draft - a.draft) / (b.draft - a.draft);
            return {
                disp: a.disp + (b.disp - a.disp) * r,
                tpc: a.tpc + (b.tpc - a.tpc) * r,
                lcf: a.lcf + (b.lcf - a.lcf) * r,
                mct: a.degTrim + (b.degTrim - a.degTrim) * r,
                vcb: a.vcb + (b.vcb - a.vcb) * r,
                kml: a.kml + (b.kml - a.kml) * r,
                kmt: a.kmt + (b.kmt - a.kmt) * r
            };
        }
    }
    return null;
}

function mean(p, s) { return (num(p) + num(s)) / 2; }
function qmd(f, m, a) { return (f + a + 6 * m) / 8; }

function getSurvey(prefix) {
    let F = mean(document.getElementById(prefix + "fp").value, document.getElementById(prefix + "fs").value);
    let M = mean(document.getElementById(prefix + "mp").value, document.getElementById(prefix + "ms").value);
    let A = mean(document.getElementById(prefix + "ap").value, document.getElementById(prefix + "as").value);

    let Q = qmd(F, M, A);
    let hydro = interpolate(Q);
    if (!hydro) { alert("Draft outside hydrostatic table"); return; }

    let trim = A - F;
    let LBP = 92.0;

    let draftLCF = Q + (trim * hydro.lcf / LBP);
    let hydroLCF = interpolate(draftLCF);

    let trimCorr = (trim * 100 * hydroLCF.tpc * hydroLCF.lcf) / hydroLCF.mct;
    let dispCorrected = hydroLCF.disp + trimCorr;

    let density = num(document.getElementById(prefix == "i" ? "densI" : "densF").value);
    dispCorrected *= density / 1.025;

    return { disp: dispCorrected, draft: Q, trim: trim, hydro: hydroLCF };
}

function calculate() {
    let I = getSurvey("i");
    let F = getSurvey("f");
    if (!I || !F) return;

    let cargo = F.disp - I.disp;

    document.getElementById("result").innerHTML = "<b>CARGO WEIGHT : " + cargo.toFixed(2) + " MT</b>";

    document.getElementById("process").innerText =
        "INITIAL DISPLACEMENT : " + I.disp.toFixed(2) + " MT\n" +
        "FINAL DISPLACEMENT   : " + F.disp.toFixed(2) + " MT\n\n" +
        "INITIAL DRAFT : " + I.draft.toFixed(3) + " m\n" +
        "FINAL DRAFT   : " + F.draft.toFixed(3) + " m\n\n" +
        "TPC : " + F.hydro.tpc.toFixed(3) + "\nLCF : " + F.hydro.lcf.toFixed(3) +
        "\nMCT : " + F.hydro.mct.toFixed(2) + "\nVCB : " + F.hydro.vcb.toFixed(3) +
        "\nKML : " + F.hydro.kml.toFixed(2) + "\nKMT : " + F.hydro.kmt.toFixed(2);
}

function exportReport() {
    let text = document.getElementById("result").innerText + "\n\n" + document.getElementById("process").innerText;
    let blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "DraftSurvey_Report.txt";
    a.click();
}

function showAbout() { aboutBox.style.display = "block"; }
