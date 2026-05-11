// ==========================
// SYSTEM ENGINE CORE
// ==========================

const $ = (id) => document.getElementById(id);

// --------------------------
// CALCULATION ENGINE
// --------------------------

function calculate() {

  const contract = Number($("const-value").value) || 0;
  const material = Number($("const-material").value) || 0;
  const labor = Number($("const-labor").value) || 0;
  const equipment = Number($("const-equipment").value) || 0;
  const fixed = Number($("const-fixed").value) || 0;
  const duration = Number($("const-duration").value) || 1;

  const totalCost = material + labor + equipment + fixed;
  const profit = contract - totalCost;

  const margin = contract > 0 ? (profit / contract) * 100 : 0;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  const monthlyProfit = profit / duration;
  const annualProfit = monthlyProfit * 12;

  return {
    contract,
    totalCost,
    profit,
    margin,
    roi,
    monthlyProfit,
    annualProfit
  };
}

// --------------------------
// UI UPDATE ENGINE
// --------------------------

function updateUI(data) {

  $("const-total-costs").innerText = `R ${data.totalCost.toFixed(2)}`;
  $("const-profit").innerText = `R ${data.profit.toFixed(2)}`;
  $("const-margin").innerText = `${data.margin.toFixed(2)}%`;
  $("const-roi").innerText = `${data.roi.toFixed(2)}%`;

  $("const-monthly-profit").innerText = `R ${data.monthlyProfit.toFixed(2)}`;
  $("const-annual-profit").innerText = `R ${data.annualProfit.toFixed(2)}`;

  // --------------------------
  // DECISION ENGINE
  // --------------------------

  const status = $("decision-status");
  const advice = $("decision-advice");

  status.className = "";

  if (data.margin >= 20) {
    status.innerText = "ACCEPT PROJECT";
    status.classList.add("positive");
    advice.innerText = "High margin project. Strong financial viability.";
  }

  else if (data.margin >= 10) {
    status.innerText = "CAUTION REQUIRED";
    status.classList.add("caution");
    advice.innerText = "Moderate margin. Review cost exposure.";
  }

  else {
    status.innerText = "REJECT PROJECT";
    status.classList.add("negative");
    advice.innerText = "Low profitability. High financial risk.";
  }

  // --------------------------
  // INSIGHTS ENGINE
  // --------------------------

  const insights = $("const-insights");

  insights.innerHTML = `
    <details open>
      <summary>System Intelligence</summary>
      <div class="step">
        Margin: ${data.margin.toFixed(2)}%<br>
        ROI: ${data.roi.toFixed(2)}%<br>
        Risk Level: ${
          data.margin >= 20 ? "LOW" :
          data.margin >= 10 ? "MEDIUM" : "HIGH"
        }
      </div>
    </details>
  `;
}

// --------------------------
// EVENT: RUN ENGINE
// --------------------------

$("calculateBtn").addEventListener("click", () => {
  const data = calculate();
  updateUI(data);
});

// --------------------------
// SAVE SYSTEM (LOCAL STORAGE)
// --------------------------

$("saveDealBtn").addEventListener("click", () => {
  const data = calculate();

  const saved = JSON.parse(localStorage.getItem("deals") || "[]");

  saved.push({
    ...data,
    name: $("client-name-input").value || "Unnamed Project",
    date: new Date().toISOString()
  });

  localStorage.setItem("deals", JSON.stringify(saved));

  alert("Deal saved successfully");
});

// --------------------------
// RESET SYSTEM
// --------------------------

$("nav-reset").addEventListener("click", () => {

  document.querySelectorAll("input").forEach(i => i.value = "");

  $("decision-status").innerText = "AWAITING_INPUT";
  $("decision-status").className = "";
  $("decision-advice").innerText = "Run engine to generate system verdict";

  $("const-total-costs").innerText = "R 0";
  $("const-profit").innerText = "R 0";
  $("const-margin").innerText = "0%";
  $("const-roi").innerText = "0%";
  $("const-monthly-profit").innerText = "R 0";
  $("const-annual-profit").innerText = "R 0";

  $("const-insights").innerHTML = `
    <details open>
      <summary>System Reset</summary>
      <div class="step">All variables cleared</div>
    </details>
  `;
});

// --------------------------
// EXPORT CSV
// --------------------------

$("exportCSV").addEventListener("click", () => {

  const data = calculate();

  const csv = `
Contract,Total Cost,Profit,Margin,ROI
${data.contract},${data.totalCost},${data.profit},${data.margin},${data.roi}
  `.trim();

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "deal-analysis.csv";
  a.click();
});

// --------------------------
// SHARE SYSTEM (COPY REPORT)
// --------------------------

$("shareDealBtn").addEventListener("click", async () => {

  const data = calculate();

  const report = `
PROJECT ANALYSIS

Contract: R ${data.contract}
Cost: R ${data.totalCost}
Profit: R ${data.profit}
Margin: ${data.margin.toFixed(2)}%
ROI: ${data.roi.toFixed(2)}%

Verdict: ${
    data.margin >= 20 ? "ACCEPT" :
    data.margin >= 10 ? "CAUTION" : "REJECT"
  }
  `.trim();

  await navigator.clipboard.writeText(report);

  alert("Report copied to clipboard");
});

// --------------------------
// QUICK EXPORT (SIDEBAR)
// --------------------------

$("nav-export").addEventListener("click", () => {
  $("exportCSV").click();
});

// --------------------------
// QUICK SAVE (SIDEBAR BUTTON)
// --------------------------

$("saveQuickBtn").addEventListener("click", () => {
  $("saveDealBtn").click();
});
