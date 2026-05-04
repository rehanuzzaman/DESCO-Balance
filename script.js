const balance = 1734.39;
const monthly = 1938.36;

const today = new Date().getDate();

const dailyAvg = monthly / today;
const daysLeft = balance / dailyAvg;

document.getElementById("dailyAvg").innerText =
  "৳ " + dailyAvg.toFixed(1);

document.getElementById("daysLeft").innerText =
  daysLeft.toFixed(1) + " days";