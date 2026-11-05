/* Cat Family data. Edit nama, bio, dll di sini.
   Foto: upload ke assets/img/cats/ dengan nama file sesuai field "photo".
   Kalau file belum ada, kartu menampilkan placeholder. */
const CATS = [
  { name: "Mochi",   photo: "mochi.jpg",   age: "2 years", breed: "Kucing abu-abu putih berbulu panjang", tags: ["Tenang", "Manja"], bio: "Suka menyambut pengunjung di pintu masuk, kemudian tidur santai di dekat jendela.", spot: "Bantal dekat jendela" },
  { name: "Latte",   photo: "latte.jpg",   age: "3 years", breed: "Kucing calico (oranye, hitam, dan putih)", tags: ["Manis", "Cerewet"], bio: "Suka mengeong dan selalu membalas setiap sapaan dengan suara khasnya.", spot: "Di belakang meja kasir" },
  { name: "Mocha",   photo: "mocha.jpg",   age: "1 year",  breed: "Kucing tabby cokelat keabu-abuan berbulu sedang", tags: ["Aktif", "Usil"], bio: "Suka bersembunyi di bawah meja dan bermain dengan tali sepatu pengunjung.", spot: "Di bawah meja nomor 3" },
  { name: "Oreo",    photo: "oreo.jpg",    age: "4 years", breed: "Kucing abu-abu putih berbulu panjang", tags: ["Pintar", "Elegan"], bio: "Suka mengawasi mesin espresso seolah-olah dirinya adalah barista kecil di kafe.", spot: "Kursi dekat meja bar" },
  { name: "Biscuit", photo: "biscuit.jpg", age: "2 years", breed: "Kucing tabby abu-abu dengan pola garis gelap", tags: ["Suka Makan", "Berisik"], bio: "Memiliki pendengaran tajam dan selalu tahu ketika pintu kulkas dibuka.", spot: "Di samping dapur" },
  { name: "Boba",    photo: "boba.jpg",    age: "5 years", breed: "Kucing tabby cokelat dengan belang hitam", tags: ["Pemalas", "Lembut"], bio: "Sangat suka tidur dan menghabiskan sebagian besar waktunya untuk beristirahat.", spot: "Rak paling atas" }
];

function renderCats(el, limit) {
  const base = el.dataset.base || "";
  const dir = base + "assets/img/cats/";
  el.innerHTML = CATS.slice(0, limit || CATS.length).map(c => `
    <article class="cat">
      <img src="${dir}${c.photo}" alt="Foto ${c.name}" loading="lazy" onerror="this.onerror=null;this.src='${dir}placeholder.svg'">
      <h3>${c.name}</h3>
      <p class="meta">${c.age}, ${c.breed}</p>
      <div>${c.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <p>${c.bio}</p>
      <p class="meta">Favorite spot: ${c.spot}</p>
      <button class="button pet" type="button">Pet ${c.name}</button>
    </article>`).join("");
  el.onclick = e => {
    const b = e.target.closest(".pet");
    if (b) { b.n = (b.n || 0) + 1; b.textContent = `Purr x${b.n}`; }
  };
}
