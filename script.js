const hydrostaticData = {

  moulded: [
    { draft: 3.000, disp: 5954.66, tpc: 21.38 },
    { draft: 3.050, disp: 6061.65, tpc: 21.42 },
    { draft: 3.100, disp: 6168.76, tpc: 21.46 },
    { draft: 3.150, disp: 6275.99, tpc: 21.50 }
  ],

  extreme: [
    { draft: 3.000, disp: 6002.62, tpc: 21.43 },
    { draft: 3.050, disp: 6109.86, tpc: 21.47 },
    { draft: 3.100, disp: 6217.21, tpc: 21.51 },
    { draft: 3.150, disp: 6324.68, tpc: 21.55 }
  ]
};

function switchMode() {
  let mode = document.getElementById("mode").value;
  document.getElementById("quickMode").style.display =
    mode === "surveyor" ? "block" : "none";
  document.getElementById("fullMode").style.display =
    mode === "full" ? "block" : "none";
}

function interpolate(lower, upper, draftInput, key) {
  let ratio = (draftInput - lower.draft) / (upper.draft - lower.draft);
  return lower[key] + ratio * (upper[key] - lower[key]);
}

function calculate() {

  let mode = document.getElementById("mode").value;
  let hydro = document.getElementById("hydroType").value;
  let density = parseFloat(document.getElementById("density").value);

  let F, M, A;

  if (mode === "surveyor") {
    F = parseFloat(document.getElementById("fwd").value);
    M = parseFloat(document.getElementById("mid").value);
    A = parseFloat(document.getElementById("aft").value);
  } else {
    let fp = parseFloat(document.getElementById("fp").value);
    let fs = parseFloat(document.getElementById("fs").value);
    let mp = parseFloat(document.getElementById("mp").value);
    let ms = parseFloat(document.getElementById("ms").value);
    let ap = parseFloat(document.getElementById("ap").value);
    let as = parseFloat(document.getElementById("as").value);

    F = (fp + fs) / 2;
    M = (mp + ms) / 2;
    A = (ap + as) / 2;
  }

  let trim = A - F;
  let mean = (F + 2 * M + A) / 4;

  document.getElementById("resF").innerText = F.toFixed(4);
  document.getElementById("resM").innerText = M.toFixed(4);
  document.getElementById("resA").innerText = A.toFixed(4);
  document.getElementById("trim").innerText = trim.toFixed(4);
  document.getElementById("meanDraft").innerText = mean.toFixed(4);

  let data = hydrostaticData[hydro];

  for (let i = 0; i < data.length - 1; i++) {
    if (mean >= data[i].draft && mean <= data[i + 1].draft) {

      let disp = interpolate(data[i], data[i + 1], mean, "disp");
      let tpc = interpolate(data[i], data[i + 1], mean, "tpc");
      let dispCorr = disp * (density / 1.025);

      document.getElementById("disp").innerText = disp.toFixed(2);
      document.getElementById("tpc").innerText = tpc.toFixed(3);
      document.getElementById("dispCorr").innerText = dispCorr.toFixed(2);
      return;
    }
  }

  alert("Draft out of table range.");
}
