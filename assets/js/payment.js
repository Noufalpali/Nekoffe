const order = store.get("order");
if (!order) location.replace("order.html");

const amountOf = key => order.subtotal + (CONFIG.fees[key] || 0);
let method = null;

document.getElementById("payItems").innerHTML = itemsHTML(order.items);
document.getElementById("paySubtotal").textContent = rupiah(order.subtotal);

const box = document.getElementById("methods");
box.innerHTML = METHODS.map(m => `
  <label class="method-card">
    <input type="radio" name="method" value="${m.key}">
    <div><h3>${m.label}</h3>
      ${CONFIG.fees[m.key] ? `<small>Fee ${rupiah(CONFIG.fees[m.key])}</small>` : "<small>No extra fee</small>"}
    </div>
    <strong>${rupiah(amountOf(m.key))}</strong>
  </label>`).join("");

const detail = document.getElementById("methodDetail");
const payBtn = document.getElementById("payBtn");

box.addEventListener("change", e => {
  method = e.target.value;
  document.querySelectorAll(".method-card").forEach(c =>
    c.classList.toggle("selected", c.querySelector("input").checked));
  const total = amountOf(method);
  if (method === "cash") {
    detail.innerHTML = `
      <div class="form-group"><label for="received">Cash received</label>
      <input type="number" id="received" min="${total}" step="1000" placeholder="e.g. ${total}"></div>
      <div class="row"><span>Change</span><b id="change">Rp0</b></div>`;
    document.getElementById("received").addEventListener("input", e => {
      const c = Number(e.target.value) - total;
      document.getElementById("change").textContent = c >= 0 ? rupiah(c) : "Not enough";
    });
    payBtn.textContent = "Pay Cash";
  } else if (method === "qris") {
    detail.innerHTML = `<div class="qr-box">QRIS<br><small>Scan to pay ${rupiah(total)}<br>
      (put your QR image in assets/img/qris.png)</small></div>`;
    payBtn.textContent = "I Have Paid";
  } else {
    const b = CONFIG.bank;
    detail.innerHTML = `
      <div class="row"><span>Bank</span><b>${b.name}</b></div>
      <div class="row"><span>Account No.</span><b>${b.number}</b></div>
      <div class="row"><span>Account Name</span><b>${b.holder}</b></div>
      <div class="row"><span>Transfer exactly</span><b>${rupiah(total)}</b></div>`;
    payBtn.textContent = "I Have Transferred";
  }
  payBtn.disabled = false;
});

payBtn.addEventListener("click", () => {
  if (!method) return;
  const total = amountOf(method);
  let paid = total, change = 0;
  if (method === "cash") {
    paid = Number(document.getElementById("received").value);
    if (!(paid >= total)) { alert("Cash received is less than the total."); return; }
    change = paid - total;
  }
  const now = new Date();
  store.set("receipt", {
    ...order, method, fee: CONFIG.fees[method] || 0, total, paid, change,
    id: "NK" + now.getTime().toString().slice(-8),
    date: now.toISOString()
  });
  store.remove("order");
  location.href = "receipt.html";
});