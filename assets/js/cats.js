/* Cat Family data. Edit nama, bio, dll di sini.
   Foto: upload ke assets/img/cats/ dengan nama file sesuai field "photo".
   Kalau file belum ada, kartu menampilkan placeholder. */
const CATS = [
  { name: "Mochi",   photo: "mochichi.jpeg",   age: "2 years", breed: "Gray British Short Hair", tags: ["Rage", "Silly"], bio: "Greets people but will bite the moment you stopped petting her...", spot: "Infront of the door" },
  { name: "Latte",   photo: "lalatte.jpeg",   age: "3 years", breed: "Calico cat", tags: ["Grumpy", "Chatty"], bio: "Loves talking with people and easy going", spot: "on the cashier counter" },
  { name: "Mocha",   photo: "mocha.jpeg",   age: "1 year",  breed: "Tabby cat", tags: ["Joyful", "Energic"], bio: "Often hides and surprise the guest, will play with your clothes", spot: "Under the table" },
  { name: "Oreo",    photo: "oreo.jpeg",    age: "4 years", breed: "Domestic Short Hair", tags: ["Smart", "Quiet"], bio: "Will walk around the cafe while picking up trash and throw them in the bin", spot: "On the sofa" },
  { name: "Biscuit", photo: "biscuit.jpeg", age: "2 years", breed: "Orange Domestic Cat", tags: ["Greedy", "Noisy"], bio: "Act cute to get the guest's food and will scream if he dont get the food", spot: "Food storage" },
  { name: "Boba",    photo: "bobaa.jpeg",    age: "5 years", breed: "Short hair orange cat", tags: ["Lazy", "Gentle"], bio: "Always sleeping, very few guests got to play with her.", spot: "Mini cat house" }
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
    </article>`).join("");
}
