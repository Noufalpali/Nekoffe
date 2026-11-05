(() => {
  const d = document, h = d.documentElement;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const face = '<svg viewBox="0 0 48 48"><path d="M7 20 8 4l13 8zM41 20 40 4 27 12z" fill="#f4a3b0" stroke="#7a3b3b" stroke-width="3" stroke-linejoin="round"/><ellipse cx="24" cy="28" rx="19" ry="16" fill="#fff3df" stroke="#7a3b3b" stroke-width="3"/><circle cx="17" cy="26" r="2.6" fill="#4b2828"/><circle cx="31" cy="26" r="2.6" fill="#4b2828"/><path d="M22 32h4l-2 2.5z" fill="#e8788c"/><path d="M19 36q2.5 2 5 0 2.500 2 5 0" fill="none" stroke="#7a3b3b" stroke-width="2" stroke-linecap="round"/></svg>';
  const paw = '<svg viewBox="0 0 32 32" fill="#975555"><ellipse cx="16" cy="21" rx="8" ry="6.5"/><ellipse cx="5.5" cy="13" rx="3.2" ry="4.2"/><ellipse cx="12" cy="7.5" rx="3.2" ry="4.4"/><ellipse cx="20" cy="7.5" rx="3.2" ry="4.4"/><ellipse cx="26.5" cy="13" rx="3.2" ry="4.2"/></svg>';
  const add = (tag, cls, html, ms) => { const e = d.createElement(tag); e.className = cls; if (html) e.innerHTML = html; d.body.append(e); if (ms) setTimeout(() => e.remove(), ms); return e; };

  // ── responsive navbar ──────────────────────────────────────────────────────
  const nav = d.querySelector(".navbar");
  if (nav) {
    const b = d.createElement("button");
    b.className = "burger"; b.type = "button";
    b.setAttribute("aria-label", "Toggle menu"); b.setAttribute("aria-expanded", "false");
    b.innerHTML = "<i></i><i></i><i></i>";
    nav.insertBefore(b, nav.querySelector("nav"));
    b.onclick = () => b.setAttribute("aria-expanded", nav.classList.toggle("open"));
    const here = location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("nav a").forEach(a => {
      a.addEventListener("click", () => { nav.classList.remove("open"); b.setAttribute("aria-expanded", "false"); });
      if (!a.hash && a.getAttribute("href").endsWith(here)) a.classList.add("active");
    });
  }

  // ── page transition ────────────────────────────────────────────────────────
  const pt = add("div", "pt", face + "<span>Nya~</span>");
  addEventListener("pageshow", e => { if (e.persisted) pt.classList.remove("go"); });
  d.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target || a.hasAttribute("download")) return;
    const u = new URL(a.href);
    if (!/^(https?|file):$/.test(u.protocol) || (u.protocol !== "file:" && u.origin !== location.origin)) return;
    if (u.pathname === location.pathname && u.hash) return;
    e.preventDefault();
    pt.classList.add("go");
    setTimeout(() => { location.href = a.href; }, rm ? 0 : 450);
  });

  // ── cat cursor ─────────────────────────────────────────────────────────────
  // Hanya aktif pada perangkat dengan pointer presisi (mouse/trackpad) tanpa
  // preferensi reduced-motion.
  if (fine && !rm) {
    h.classList.add("cat-on");
    const c = add("div", "cc", face);

    // Paw-trail state
    let lx = -999, ly = -999, side = 1;

    // Posisi kursor langsung di-snap ke pointer — TANPA lerp.
    // Ini memastikan visual kursor SELALU sejajar dengan pointer asli
    // sehingga hover & klik tombol bekerja tepat.
    const moveCursor = (x, y) => {
      // Pusat kucing (21px = setengah 42px) diarahkan ke hotspot pointer
      c.style.transform = `translate(${x - 21}px,${y - 21}px)`;
    };

    addEventListener("pointermove", e => {
      const x = e.clientX, y = e.clientY;

      // Update posisi kursor — langsung, tanpa lag
      moveCursor(x, y);

      // Hover state: besar saat di atas elemen interaktif
      c.classList.toggle("hov", !!e.target.closest("a,button,label,select,.cat,[role=button]"));

      // Paw trail setiap 80px pergerakan
      if (Math.hypot(x - lx, y - ly) > 80) {
        lx = x; ly = y; side *= -1;
        const p = add("div", "paw", paw, 1100);
        p.style.cssText = `left:${x - 10}px;top:${y - 10}px;transform:rotate(${side * 18 + 20}deg)`;
      }
    });

    // Sembunyikan kursor saat keluar jendela
    addEventListener("pointerleave", () => { c.style.transform = "translate(-200px,-200px)"; });

    // Efek tekan
    addEventListener("pointerdown", () => c.classList.add("dn"));
    addEventListener("pointerup",   () => c.classList.remove("dn"));
  }

  // ── heart / paw burst (mouse & touch) ─────────────────────────────────────
  if (!rm) addEventListener("pointerdown", e => {
    for (let i = 0; i < 6; i++) {
      const s = add("span", "heart", i % 2 ? paw : "♥", 900);
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;color:#e8788c;--dx:${(Math.random() - .5) * 120}px;--dy:${-40 - Math.random() * 70}px`;
    }
    // Efek tap di perangkat touch
    if (e.pointerType !== "mouse") {
      const t = add("div", "cc tap", face, 800);
      t.style.cssText = `transform:translate(${e.clientX - 21}px,${e.clientY - 21}px)`;
    }
  });
})();
