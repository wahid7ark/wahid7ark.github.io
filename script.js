document.getElementById("year").innerText = new Date().getFullYear();

// ===== HYDROSTATIC TABLE – BG ARK CARNELIAN =====
// Draft, disp, tpc, lcf, mct, kml, kmt, vcb
// Data akan diisi manual nanti
const hydroTable = [
    // {draft: , disp: , lcb: , vcb: , tpc: , lcf: , degTrim: , kml: , kmt: , mct: }
];

// ================== UTILITY FUNCTIONS ==================
function num(x) { return parseFloat(String(x).replace(",", ".") || 0); }
function mean(p, s) { return (num(p) + num(s)) / 2; }
function qmd(f, m, a) { return (f + a + 6 * m) / 8; }

function interpolate(draft) {
    if (hydroTable.length < 2) return null;
    for (let i = 0; i < hydroTable.length - 1; i++) {
        let a = hydroTable[i], b = hydroTable[i + 1];
        if (draft >= a.draft && draft <= b.draft) {
            let r = (draft - a.draft) / (b.draft - a.draft);
            return {
                disp: a.disp + (b.disp - a.disp) * r,
                tpc: a.tpc + (b.tpc - a.tpc) * r,
                lcf: a.lcf + (b.lcf - a.lcf) * r,
                mct: a.mct + (b.mct - a.mct) * r,
                vcb: a.vcb + (b.vcb - a.vcb) * r
            };
        }
    }
    return null;
}

// ================== PLACEHOLDER FUNCTIONS ==================
function calculate() {
    // Fungsi utama nanti diisi logika perhitungan draft survey
    console.log("Calculate button clicked");
}

function exportReport() {
    console.log("Export report button clicked");
}

function showAbout() {
    document.getElementById("aboutBox").style.display = "block";
}
