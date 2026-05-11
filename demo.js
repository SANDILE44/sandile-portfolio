document.getElementById("calculateBtn").addEventListener("click", () => {

  // INPUTS
  const contract = Number(document.getElementById("const-value").value) || 0;
  const material = Number(document.getElementById("const-material").value) || 0;
  const labor = Number(document.getElementById("const-labor").value) || 0;
  const equipment = Number(document.getElementById("const-equipment").value) || 0;
  const fixed = Number(document.getElementById("const-fixed").value) || 0;
  const duration = Number(document.getElementById("const-duration").value) || 1;

  // COSTS
  const totalCost = material + labor + equipment + fixed;

  // PROFIT
  const profit = contract - totalCost;

  // METRICS
  const margin = contract > 0 ? (profit / contract) * 100 : 0;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  const monthlyProfit = profit / duration;
  const annualProfit = monthlyProfit * 12;

  const breakeven = totalCost;

  // OUTPUT DOM
  document.getElementById("const-total-costs").innerText = `R ${totalCost.toFixed(2)}`;
  document.getElementById("const-profit").innerText = `R ${profit.toFixed(2)}`;
  document.getElementById("const-margin").innerText = `${margin.toFixed(2)}%`;
  document.getElementById("const-roi").innerText = `${roi.toFixed(2)}%`;
  document.getElementById("const-breakeven").innerText = `R ${breakeven.toFixed(2)}`;
  document.getElementById("const-monthly-profit").innerText = `R ${monthlyProfit.toFixed(2)}`;
  document.getElementById("const-annual-profit").innerText = `R ${annualProfit.toFixed(2)}`;

  // DECISION ENGINE
  const status = document.getElementById("decision-status");
  const advice = document.getElementById("decision-advice");

  status.className = "";

  if (margin >= 20) {
    status.innerText = "ACCEPT PROJECT";
    status.classList.add("positive");
    advice.innerText = "Strong margin. Low risk. High profitability.";
  }

  else if (margin >= 10) {
    status.innerText = "CAUTION REQUIRED";
    status.classList.add("caution");
    advice.innerText = "Moderate margin. Review costs and risk exposure.";
  }

  else {
    status.innerText = "REJECT PROJECT";
    status.classList.add("negative");
    advice.innerText = "Low margin. High financial risk detected.";
  }

});
