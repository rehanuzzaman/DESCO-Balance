const accountNo = "34418310";
const meterNo = "066120001295";

async function loadData() {
  try {
    // Balance
    const balanceRes = await fetch(
      `https://prepaid.desco.org.bd/api/tkdes/customer/getBalance?accountNo=${accountNo}&meterNo=${meterNo}`
    );
    const balanceData = await balanceRes.json();

    // Customer
    const customerRes = await fetch(
      `https://prepaid.desco.org.bd/api/tkdes/customer/getCustomerInfo?accountNo=${accountNo}&meterNo=${meterNo}`
    );
    const customerData = await customerRes.json();

    const data = balanceData.data;
    const customer = customerData.data;

    // Update UI
    document.getElementById("balance").innerText = `৳ ${data.balance}`;

    // Status
    let statusText = "Healthy";
    let statusClass = "healthy";

    if (data.balance < 1000) {
      statusText = "Critical";
      statusClass = "critical";
    } else if (data.balance < 3000) {
      statusText = "Low";
      statusClass = "low";
    }

    const statusEl = document.getElementById("status");
    statusEl.innerText = statusText;
    statusEl.className = `status ${statusClass}`;

    // Calculations
    const today = new Date().getDate();
    const dailyAvg = data.currentMonthConsumption / today;
    const daysLeft = data.balance / dailyAvg;

    document.getElementById("dailyAvg").innerText =
      "৳ " + dailyAvg.toFixed(1);

    document.getElementById("daysLeft").innerText =
      daysLeft.toFixed(1) + " days";

    // Customer info
    document.getElementById("name").innerText =
      "Name: " + customer.customerName;

    document.getElementById("meter").innerText =
      "Meter: " + customer.meterNo;

    document.getElementById("address").innerText =
      "Address: " + customer.installationAddress;

  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<h2 style='color:red;text-align:center;'>Failed to load data</h2>";
  }
}

loadData();