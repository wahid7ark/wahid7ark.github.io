document.getElementById("year").innerText = new Date().getFullYear();

// ===== HYDROSTATIC TABLE – BG ARK CARNELIAN =====
// Draft, disp, tpc, lcf, mct, kml, kmt, vcb
// Data akan diisi manual nanti
const hydroTable = [
  {draft:0.500, disp:894.77, lcb:47.171, vcb:0.255, tpc:18.69, lcf:47.315, degTrim:15479, kml:991.07, kmt:100.582, mct:12.85},
  {draft:0.550, disp:988.53, lcb:47.186, vcb:0.281, tpc:18.83, lcf:47.311, degTrim:15714, kml:910.70, kmt:92.489, mct:13.06},
  {draft:0.600, disp:1083.03, lcb:47.198, vcb:0.307, tpc:18.98, lcf:47.323, degTrim:15960, kml:844.48, kmt:85.782, mct:13.27},
  {draft:0.650, disp:1178.16, lcb:47.209, vcb:0.333, tpc:19.08, lcf:47.350, degTrim:16186, kml:787.08, kmt:79.408, mct:13.48},
  {draft:0.700, disp:1273.65, lcb:47.221, vcb:0.358, tpc:19.15, lcf:47.413, degTrim:16385, kml:736.55, kmt:73.704, mct:13.68},
  {draft:0.750, disp:1369.61, lcb:47.234, vcb:0.384, tpc:19.25, lcf:47.464, degTrim:16626, kml:688.47, kmt:68.935, mct:13.89},
  {draft:0.800, disp:1465.98, lcb:47.249, vcb:0.410, tpc:19.33, lcf:47.528, degTrim:16889, kml:660.01, kmt:64.846, mct:14.10},
  {draft:0.850, disp:1562.73, lcb:47.262, vcb:0.436, tpc:19.41, lcf:47.514, degTrim:17051, kml:625.10, kmt:61.060, mct:14.31},
  {draft:0.900, disp:1659.80, lcb:47.273, vcb:0.461, tpc:19.47, lcf:47.498, degTrim:17215, kml:594.19, kmt:57.709, mct:14.51},
  {draft:0.950, disp:1757.18, lcb:47.283, vcb:0.487, tpc:19.53, lcf:47.479, degTrim:17377, kml:566.14, kmt:54.714, mct:14.72},
  {draft:1.000, disp:1854.88, lcb:47.293, vcb:0.513, tpc:19.59, lcf:47.454, degTrim:17538, kml:541.69, kmt:52.020, mct:14.93},
  {draft:1.050, disp:1952.88, lcb:47.297, vcb:0.539, tpc:19.65, lcf:47.436, degTrim:17702, kml:519.31, kmt:49.594, mct:15.14},
  {draft:1.100, disp:2051.19, lcb:47.303, vcb:0.565, tpc:19.71, lcf:47.414, degTrim:17869, kml:498.06, kmt:47.396, mct:15.35},
  {draft:1.150, disp:2149.82, lcb:47.305, vcb:0.590, tpc:19.62, lcf:47.095, degTrim:17632, kml:469.89, kmt:45.169, mct:15.55},
  {draft:1.200, disp:2248.17, lcb:47.298, vcb:0.616, tpc:19.70, lcf:47.102, degTrim:17843, kml:454.12, kmt:43.356, mct:15.76},
  {draft:1.250, disp:2346.78, lcb:47.289, vcb:0.642, tpc:19.75, lcf:47.054, degTrim:17997, kml:438.33, kmt:41.697, mct:15.97},
  {draft:1.300, disp:2445.67, lcb:47.280, vcb:0.667, tpc:19.81, lcf:47.032, degTrim:18152, kml:425.22, kmt:40.166, mct:16.18},
  {draft:1.350, disp:2544.82, lcb:47.270, vcb:0.693, tpc:19.85, lcf:47.029, degTrim:18278, kml:411.47, kmt:38.679, mct:16.39},
  {draft:1.400, disp:2644.22, lcb:47.260, vcb:0.719, tpc:19.91, lcf:47.008, degTrim:18438, kml:395.49, kmt:37.365, mct:16.60},
  {draft:1.450, disp:2743.90, lcb:47.251, vcb:0.745, tpc:19.97, lcf:46.987, degTrim:18600, kml:386.36, kmt:36.143, mct:16.81},
  {draft:1.500, disp:2843.86, lcb:47.241, vcb:0.770, tpc:20.03, lcf:46.959, degTrim:18770, kml:376.22, kmt:35.020, mct:17.02},
  {draft:1.550, disp:2944.31, lcb:47.231, vcb:0.795, tpc:20.09, lcf:46.955, degTrim:18947, kml:368.70, kmt:33.959, mct:17.23},
  {draft:1.600, disp:3044.66, lcb:47.221, vcb:0.821, tpc:20.15, lcf:46.945, degTrim:19133, kml:360.02, kmt:32.984, mct:17.44},
  {draft:1.650, disp:3145.51, lcb:47.211, vcb:0.848, tpc:20.22, lcf:46.938, degTrim:19327, kml:352.01, kmt:32.078, mct:17.65},
  {draft:1.700, disp:3246.64, lcb:47.201, vcb:0.873, tpc:20.27, lcf:46.895, degTrim:19471, kml:342.18, kmt:31.199, mct:17.86},
  {draft:1.750, disp:3348.02, lcb:47.190, vcb:0.899, tpc:20.31, lcf:46.851, degTrim:19617, kml:335.67, kmt:30.375, mct:18.07},
  {draft:1.800, disp:3449.64, lcb:47.179, vcb:0.925, tpc:20.36, lcf:46.807, degTrim:19765, kml:328.25, kmt:29.601, mct:18.28},
  {draft:1.850, disp:3551.51, lcb:47.167, vcb:0.951, tpc:20.42, lcf:46.762, degTrim:19915, kml:321.27, kmt:28.873, mct:18.49},
  {draft:1.900, disp:3653.64, lcb:47.154, vcb:0.977, tpc:20.47, lcf:46.717, degTrim:20071, kml:314.72, kmt:28.188, mct:18.70},
  {draft:1.950, disp:3756.01, lcb:47.141, vcb:1.003, tpc:20.52, lcf:46.673, degTrim:20226, kml:306.54, kmt:27.540, mct:18.91},
  {draft:2.000, disp:3858.64, lcb:47.129, vcb:1.029, tpc:20.57, lcf:46.634, degTrim:20376, kml:302.53, kmt:26.916, mct:19.12},
  {draft:2.050, disp:3961.48, lcb:47.115, vcb:1.055, tpc:20.60, lcf:46.620, degTrim:20493, kml:296.37, kmt:26.281, mct:19.33},
  {draft:2.100, disp:4064.57, lcb:47.101, vcb:1.081, tpc:20.65, lcf:46.583, degTrim:20645, kml:290.55, kmt:25.720, mct:19.54},
  {draft:2.150, disp:4167.90, lcb:47.087, vcb:1.107, tpc:20.70, lcf:46.539, degTrim:20785, kml:285.71, kmt:25.181, mct:19.75},
  {draft:2.200, disp:4271.46, lcb:47.073, vcb:1.133, tpc:20.74, lcf:46.493, degTrim:20928, kml:280.45, kmt:24.659, mct:19.96},
  {draft:2.250, disp:4375.27, lcb:47.058, vcb:1.159, tpc:20.79, lcf:46.447, degTrim:21072, kml:275.52, kmt:24.181, mct:20.17},
  {draft:2.300, disp:4479.31, lcb:47.043, vcb:1.185, tpc:20.84, lcf:46.400, degTrim:21217, kml:271.38, kmt:23.718, mct:20.38},
  {draft:2.350, disp:4583.59, lcb:47.029, vcb:1.211, tpc:20.88, lcf:46.352, degTrim:21364, kml:267.02, kmt:23.276, mct:20.59},
  {draft:2.400, disp:4688.12, lcb:47.013, vcb:1.237, tpc:20.93, lcf:46.304, degTrim:21512, kml:262.85, kmt:22.856, mct:20.80},
  {draft:2.450, disp:4792.89, lcb:46.997, vcb:1.262, tpc:20.98, lcf:46.055, degTrim:21349, kml:258.22, kmt:22.396, mct:21.01},
  {draft:2.500, disp:4896.89, lcb:46.972, vcb:1.288, tpc:20.93, lcf:46.006, degTrim:21502, kml:251.56, kmt:22.017, mct:21.22},
  {draft:2.550, disp:5001.63, lcb:46.951, vcb:1.314, tpc:20.98, lcf:45.958, degTrim:21559, kml:248.68, kmt:21.656, mct:21.43},
  {draft:2.600, disp:5106.61, lcb:46.930, vcb:1.340, tpc:21.03, lcf:45.909, degTrim:21920, kml:244.78, kmt:21.312, mct:21.64},
  {draft:2.650, disp:5211.83, lcb:46.910, vcb:1.366, tpc:21.07, lcf:45.867, degTrim:21977, kml:241.59, kmt:20.975, mct:21.85},
  {draft:2.700, disp:5317.27, lcb:46.889, vcb:1.392, tpc:21.11, lcf:45.832, degTrim:22100, kml:238.71, kmt:20.620, mct:22.06},
  {draft:2.750, disp:5422.93, lcb:46.868, vcb:1.418, tpc:21.16, lcf:45.815, degTrim:22260, kml:235.47, kmt:20.308, mct:22.27},
  {draft:2.800, disp:5528.84, lcb:46.846, vcb:1.444, tpc:21.21, lcf:45.780, degTrim:22425, kml:232.37, kmt:20.011, mct:22.48},
  {draft:2.850, disp:5634.98, lcb:46.827, vcb:1.470, tpc:21.25, lcf:45.727, degTrim:22563, kml:229.40, kmt:19.723, mct:22.69},
  {draft:2.900, disp:5741.32, lcb:46.806, vcb:1.497, tpc:21.29, lcf:45.674, degTrim:22704, kml:226.85, kmt:19.443, mct:22.90},
  {draft:2.950, disp:5847.89, lcb:46.785, vcb:1.523, tpc:21.34, lcf:45.621, degTrim:22846, kml:223.82, kmt:19.176, mct:23.11},
  {draft:3.000, disp:5954.66, lcb:46.763, vcb:1.549, tpc:21.38, lcf:45.568, degTrim:22991, kml:221.20, kmt:18.920, mct:23.32},
  {draft:3.050, disp:6061.65, lcb:46.741, vcb:1.575, tpc:21.42, lcf:45.514, degTrim:23139, kml:218.69, kmt:18.674, mct:23.53},
  {draft:3.100, disp:6168.86, lcb:46.719, vcb:1.601, tpc:21.47, lcf:45.454, degTrim:23279, kml:216.19, kmt:18.436, mct:23.74},
  {draft:3.150, disp:6276.27, lcb:46.697, vcb:1.627, tpc:21.51, lcf:45.393, degTrim:23422, kml:213.79, kmt:18.209, mct:23.95},
  {draft:3.200, disp:6383.89, lcb:46.675, vcb:1.653, tpc:21.55, lcf:45.332, degTrim:23566, kml:211.48, kmt:17.990, mct:24.16},
  {draft:3.250, disp:6491.73, lcb:46.652, vcb:1.679, tpc:21.59, lcf:45.269, degTrim:23713, kml:209.26, kmt:17.780, mct:24.37},
  {draft:3.300, disp:6599.78, lcb:46.606, vcb:1.705, tpc:21.64, lcf:45.209, degTrim:23856, kml:207.09, kmt:17.575, mct:24.58},
  {draft:3.350, disp:6707.02, lcb:46.583, vcb:1.732, tpc:21.66, lcf:45.175, degTrim:23958, kml:204.64, kmt:17.348, mct:24.79},
  {draft:3.400, disp:6815.44, lcb:46.560, vcb:1.758, tpc:21.70, lcf:45.120, degTrim:24095, kml:202.51, kmt:17.151, mct:25.00},
  {draft:3.450, disp:6925.07, lcb:46.537, vcb:1.784, tpc:21.74, lcf:45.054, degTrim:24234, kml:200.48, kmt:16.962, mct:25.21},
  {draft:3.500, disp:7033.90, lcb:46.514, vcb:1.810, tpc:21.78, lcf:45.008, degTrim:24373, kml:198.52, kmt:16.779, mct:25.42},
  {draft:3.550, disp:7142.93, lcb:46.491, vcb:1.836, tpc:21.82, lcf:44.951, degTrim:24515, kml:196.62, kmt:16.603, mct:25.63},
  {draft:3.600, disp:7252.17, lcb:46.468, vcb:1.863, tpc:21.86, lcf:44.883, degTrim:24657, kml:194.79, kmt:16.433, mct:25.84},
  {draft:3.650, disp:7361.62, lcb:46.445, vcb:1.889, tpc:21.91, lcf:44.835, degTrim:24802, kml:193.02, kmt:16.269, mct:26.05},
  {draft:3.700, disp:7471.28, lcb:46.422, vcb:1.915, tpc:21.95, lcf:44.777, degTrim:24948, kml:191.30, kmt:16.111, mct:26.26},
  {draft:3.750, disp:7581.14, lcb:46.399, vcb:1.941, tpc:21.99, lcf:44.718, degTrim:25097, kml:189.65, kmt:15.959, mct:26.47},
  {draft:3.800, disp:7691.22, lcb:46.376, vcb:1.968, tpc:22.03, lcf:44.657, degTrim:25247, kml:188.05, kmt:15.813, mct:26.68},
  {draft:3.850, disp:7801.51, lcb:46.353, vcb:1.994, tpc:22.07, lcf:44.596, degTrim:25399, kml:186.52, kmt:15.671, mct:26.89},
  {draft:3.900, disp:7912.02, lcb:46.330, vcb:2.020, tpc:22.12, lcf:44.535, degTrim:25554, kml:185.03, kmt:15.535, mct:27.10},
  {draft:3.950, disp:8022.73, lcb:46.307, vcb:2.047, tpc:22.16, lcf:44.473, degTrim:25709, kml:183.59, kmt:15.403, mct:27.31},
  {draft:4.000, disp:8133.66, lcb:46.284, vcb:2.073, tpc:22.20, lcf:44.416, degTrim:25856, kml:182.12, kmt:15.271, mct:27.52},
  {draft:4.050, disp:8244.68, lcb:46.261, vcb:2.099, tpc:22.19, lcf:44.449, degTrim:25951, kml:179.63, kmt:15.103, mct:27.73},
  {draft:4.100, disp:8355.75, lcb:46.244, vcb:2.125, tpc:22.20, lcf:44.460, degTrim:25883, kml:177.46, kmt:14.960, mct:27.94},
  {draft:4.150, disp:8466.85, lcb:46.221, vcb:2.152, tpc:22.21, lcf:44.470, degTrim:25916, kml:175.36, kmt:14.822, mct:28.15},
  {draft:4.200, disp:8577.95, lcb:46.199, vcb:2.178, tpc:22.21, lcf:44.481, degTrim:25949, kml:173.31, kmt:14.687, mct:28.36},
  {draft:4.250, disp:8689.17, lcb:46.177, vcb:2.204, tpc:22.22, lcf:44.491, degTrim:25982, kml:171.31, kmt:14.557, mct:28.57},
  {draft:4.300, disp:8800.40, lcb:46.157, vcb:2.231, tpc:22.23, lcf:44.502, degTrim:26015, kml:169.35, kmt:14.431, mct:28.78},
  {draft:4.350, disp:8911.67, lcb:46.137, vcb:2.257, tpc:22.24, lcf:44.512, degTrim:26050, kml:167.46, kmt:14.308, mct:28.99},
  {draft:4.400, disp:9022.97, lcb:46.117, vcb:2.283, tpc:22.24, lcf:44.523, degTrim:26083, kml:165.61, kmt:14.189, mct:29.20},
  {draft:4.450, disp:9134.32, lcb:46.098, vcb:2.309, tpc:22.25, lcf:44.534, degTrim:26118, kml:163.81, kmt:14.073, mct:29.41},
  {draft:4.500, disp:9245.71, lcb:46.080, vcb:2.335, tpc:22.25, lcf:44.545, degTrim:26152, kml:162.05, kmt:13.961, mct:29.62},
  {draft:4.550, disp:9357.15, lcb:46.063, vcb:2.361, tpc:22.26, lcf:44.555, degTrim:26186, kml:160.33, kmt:13.852, mct:29.83},
  {draft:4.600, disp:9463.63, lcb:46.046, vcb:2.387, tpc:22.20, lcf:44.420, degTrim:25957, kml:157.05, kmt:13.739, mct:30.04},
  {draft:4.650, disp:9579.75, lcb:46.027, vcb:2.413, tpc:22.22, lcf:44.466, degTrim:26051, kml:155.79, kmt:13.633, mct:30.25},
  {draft:4.700, disp:9690.86, lcb:46.009, vcb:2.439, tpc:22.22, lcf:44.466, degTrim:26060, kml:154.06, kmt:13.531, mct:30.46},
  {draft:4.750, disp:9801.99, lcb:45.992, vcb:2.465, tpc:22.22, lcf:44.466, degTrim:26069, kml:152.37, kmt:13.431, mct:30.67},
  {draft:4.800, disp:9913.10, lcb:45.975, vcb:2.491, tpc:22.22, lcf:44.466, degTrim:26079, kml:150.71, kmt:13.334, mct:30.88},
  {draft:4.850, disp:10024.22, lcb:45.958, vcb:2.517, tpc:22.22, lcf:44.466, degTrim:26088, kml:149.10, kmt:13.240, mct:31.09},
  {draft:4.900, disp:10135.34, lcb:45.942, vcb:2.543, tpc:22.22, lcf:44.466, degTrim:26097, kml:147.52, kmt:13.148, mct:31.30},
  {draft:4.950, disp:10246.45, lcb:45.926, vcb:2.569, tpc:22.22, lcf:44.466, degTrim:26107, kml:145.97, kmt:13.059, mct:31.51},
  {draft:5.000, disp:10357.59, lcb:45.910, vcb:2.595, tpc:22.22, lcf:44.466, degTrim:26117, kml:144.46, kmt:12.972, mct:31.72},
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
