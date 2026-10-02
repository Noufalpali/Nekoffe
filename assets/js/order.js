const qty = {};
const listEl = document.getElementById("menuList");

listEl.innerHTML = MENU.map(m => `
  <div class="menu-option" data-id="${m.id}">
    <img src="${m.img}" alt="${m.name}">
    <div class="menu-info"><h3>${m.name}</h3><span>${rupiah(m.price)}</span></div>
    <div class="qty">
      <button type="button" data-d="-1">&minus;</button><b>0</b><button type="button" data-d="1">+</button>
    </div>
  </div>`).join("");

listEl.addEventListener("click", e => {
  const btn = e.target.closest("button[data-d]");
  if (!btn) return;
  const card = btn.closest(".menu-option");
  const id = card.dataset.id;
  qty[id] = Math.max(0, (qty[id] || 0) + Number(btn.dataset.d));
  card.querySelector("b").textContent = qty[id];
  card.classList.toggle("selected", qty[id] > 0);
  refresh();
});

const chosen = () => MENU.filter(m => qty[m.id] > 0)
  .map(m => ({ id: m.id, name: m.name, price: m.price, qty: qty[m.id], drink: m.drink }));

function refresh() {
  const items = chosen();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("summaryItems").innerHTML =
    items.length ? itemsHTML(items) : "<p class='form-description'>No items selected yet.</p>";
  document.getElementById("summaryTotal").textContent = rupiah(total);
}

document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const items = chosen();
  if (!items.length) { alert("Please choose at least one menu."); return; }
  const f = e.target;
  store.set("order", {
    customer: f.name.value.trim(),
    items,
    sugar: f.sugar.value,
    orderType: f.order_type.value,
    address: f.address.value.trim(),
    subtotal: items.reduce((s, i) => s + i.price * i.qty, 0)
  });
  location.href = "payment.html";
});

refresh();