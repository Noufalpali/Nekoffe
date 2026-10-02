const r = store.get("receipt");
if (!r) location.replace("order.html");

const label = METHODS.find(m => m.key === r.method).label;
const dt = new Date(r.date).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
const row = (a, b) => `<div class="row"><span>${a}</span><span>${b}</span></div>`;

document.getElementById("receipt").innerHTML = `
  <h2>${CONFIG.shopName}</h2>
  <p class="center">Payment Receipt</p><hr>
  ${row("No.", r.id)}${row("Date", dt)}${row("Customer", r.customer)}
  ${row("Type", r.orderType === "delivery" ? "Delivery" : "Pick Up")}
  ${r.items.some(i => i.drink) ? row("Sugar", r.sugar) : ""}
  <hr>${itemsHTML(r.items)}<hr>
  ${row("Subtotal", rupiah(r.subtotal))}
  ${r.fee ? row("Fee", rupiah(r.fee)) : ""}
  <div class="row total"><span>TOTAL</span><span>${rupiah(r.total)}</span></div>
  ${row("Method", label)}
  ${r.method === "cash" ? row("Cash", rupiah(r.paid)) + row("Change", rupiah(r.change)) : ""}
  ${r.address ? `<hr><p><small>Note/Address: ${r.address.replace(/</g, "&lt;")}</small></p>` : ""}
  <hr><p class="center">PAID - Thank you, Nya! =^.^=</p>`;

document.getElementById("newOrder").addEventListener("click", () => {
  store.remove("receipt");
  location.href = "order.html";
});