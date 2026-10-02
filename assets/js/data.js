const CONFIG = {
  shopName: "Nekoffe ^_^",
  fees: { cash: 0, qris: 0, transfer: 0 },
  bank: { name: "BCA", number: "1234567890", holder: "Nekoffe Cafe" }
};

const MENU = [
  { id: "americano", name: "Americano",         price: 20000, img: "../assets/img/americanp.jpg", drink: true },
  { id: "latte",     name: "Cafe Latte",        price: 25000, img: "../assets/img/latte.jpg",     drink: true },
  { id: "mocha",     name: "Cafe Mocha",        price: 25000, img: "../assets/img/mocha.jpg",     drink: true },
  { id: "macchiato", name: "Caramel Macchiato", price: 32000, img: "../assets/img/machiato.jpg",  drink: true },
  { id: "melon",     name: "Melon Cream Soda",  price: 28000, img: "../assets/img/melon.jpg",     drink: true },
  { id: "rollcake",  name: "Roll Cake",         price: 25000, img: "../assets/img/rollcake.jpg",  drink: false }
];

const METHODS = [
  { key: "cash",     label: "Cash" },
  { key: "qris",     label: "QRIS" },
  { key: "transfer", label: "Bank Transfer" }
];

const rupiah = n => "Rp" + Number(n).toLocaleString("id-ID");

const store = {
  get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  remove(k) { try { sessionStorage.removeItem(k); } catch (e) {} }
};

const itemsHTML = items => items.map(i =>
  `<div class="row"><span>${i.qty} x ${i.name}</span><span>${rupiah(i.price * i.qty)}</span></div>`
).join("");