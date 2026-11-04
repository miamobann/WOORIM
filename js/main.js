/* WOORIM — 인터랙션 (index.html · recipes.html 공용) */
(function () {
  "use strict";

  const D = window.WOORIM;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const byNo = (no) => D.lineup.find((t) => t.no === no);
  const tagStyle = (t) => `--tag:${t.tagColor};--tag-text:${t.tagText}`;

  /* ---------- 공통: 토스트 ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- 공통: 모달 ---------- */
  let lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.hidden = false;
    requestAnimationFrame(() => m.classList.add("open"));
    const f = m.querySelector("[data-close]");
    if (f) f.focus();
    document.body.style.overflow = "hidden";
  }
  function closeModal(m) {
    m.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => { m.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus();
  }
  $$(".modal").forEach((m) => {
    m.addEventListener("click", (e) => {
      if (e.target === m || e.target.closest("[data-close]")) closeModal(m);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".modal.open").forEach(closeModal);
  });

  /* ---------- 헤더 · 메뉴 ---------- */
  const header = $("#header");
  const hero = $(".hero, .page-hero");
  function onScroll() {
    const limit = hero ? hero.offsetTop + hero.offsetHeight - 80 : 10;
    header.classList.toggle("is-solid", window.scrollY > limit);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = $("#menuBtn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });
    $$("#nav a").forEach((a) => a.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- 스크롤 등장 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- 숫자 카운트 ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count;
      const t0 = performance.now();
      (function tick(now) {
        const p = Math.min((now - t0) / 1200, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- 잔 SVG ---------- */
  let glassId = 0;
  function glassSVG(kind) {
    const id = "g" + (++glassId);
    return `
<svg class="glass" viewBox="0 0 200 230" role="img" aria-label="티백이 우러나는 온더락 잔">
  <defs>
    <clipPath id="${id}-clip"><path d="M34 26 L166 26 L156 204 Q155 214 145 214 L55 214 Q45 214 44 204 Z"/></clipPath>
    <linearGradient id="${id}-shine" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".25" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/>
    </linearGradient>
    <linearGradient id="${id}-depth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".28"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#${id}-clip)">
    <rect class="liquid" data-liquid x="0" y="92" width="200" height="140" fill="#DCA859"/>
    <rect x="0" y="92" width="200" height="140" fill="url(#${id}-depth)"/>
    <rect x="0" y="90" width="200" height="4" fill="#fff" opacity=".25"/>
    <rect x="62" y="66" width="52" height="50" rx="9" fill="#fff" opacity=".2" transform="rotate(-12 88 91)"/>
    <rect x="102" y="104" width="40" height="38" rx="8" fill="#fff" opacity=".14" transform="rotate(10 122 123)"/>
    ${kind === "lab" ? "" : `<g class="tea"><path d="M118 112 L148 168 L90 168 Z" fill="#E8DCC6" opacity=".55"/><path d="M106 150 l8 -4 7 5 9 -3 8 4" stroke="#5A3A17" stroke-width="3" fill="none" opacity=".55"/></g>`}
  </g>
  ${kind === "lab" ? "" : `<path d="M118 112 Q124 60 150 30 Q156 24 166 30" stroke="#F3EBDD" stroke-width="1.2" fill="none" opacity=".75"/><rect x="160" y="30" width="22" height="26" rx="2" fill="#C8812A" data-tag/>`}
  <path d="M34 26 L166 26 L156 204 Q155 214 145 214 L55 214 Q45 214 44 204 Z" fill="url(#${id}-shine)" stroke="#F3EBDD" stroke-opacity=".7" stroke-width="2"/>
  <path d="M46 196 L154 196" stroke="#F3EBDD" stroke-opacity=".25" stroke-width="1"/>
  <ellipse cx="100" cy="222" rx="62" ry="5" fill="#000" opacity=".35"/>
</svg>`;
  }
  $$("[data-glass]").forEach((el) => { el.outerHTML = glassSVG(el.dataset.glass); });

  /* 30년산(#7A4A12)은 어두운 배경 위 글자로 쓰기엔 대비가 낮아 글자색만 밝게 */
  const textOnDark = (c) => (c === "#7A4A12" ? "#C08A4E" : c);

  /* ---------- 라인업 탭 ---------- */
  const tabsEl = $("#lineupTabs");
  if (tabsEl) {
    const cardsEl = $("#lineupCards");
    const img = $("#lineupImg");
    tabsEl.innerHTML = Object.entries(D.parts).map(([k, p]) => `
      <button class="tab" role="tab" id="tab-${k}" data-part="${k}" aria-selected="false" aria-controls="lineupCards">
        <small>Part ${k} · ${p.en}</small>${p.ko}
      </button>`).join("");

    function showPart(k) {
      const p = D.parts[k];
      $$(".tab", tabsEl).forEach((t) => t.setAttribute("aria-selected", t.dataset.part === k));
      cardsEl.setAttribute("aria-labelledby", "tab-" + k);
      img.classList.add("fading");
      const next = new Image();
      next.src = `assets/img/${p.img}.webp`;
      next.onload = () => { img.src = next.src; img.alt = p.alt; img.classList.remove("fading"); };
      cardsEl.innerHTML = D.lineup.filter((t) => String(t.part) === k).map((t, i) => `
        <article class="card" style="${tagStyle(t)};animation-delay:${i * 70}ms">
          ${t.signature ? '<span class="sig">SIGNATURE</span>' : ""}
          <span class="card-tag">CASK No.${t.no}</span>
          <h4>${t.nameKo}</h4>
          <p class="en">${t.nameEn}</p>
          <p class="flavor">${t.flavor}</p>
          <p class="desc">${t.desc}</p>
        </article>`).join("");
    }
    tabsEl.addEventListener("click", (e) => {
      const t = e.target.closest(".tab");
      if (t) showPart(t.dataset.part);
    });
    tabsEl.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const tabs = $$(".tab", tabsEl);
      const cur = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      const n = tabs[(cur + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      n.focus(); showPart(n.dataset.part);
    });
    showPart("1");
  }

  /* ---------- 블렌딩 체험 ---------- */
  const labChips = $("#labChips");
  if (labChips) {
    const picked = [];
    const liquid = $(".lab-result [data-liquid]");
    labChips.innerHTML = D.lineup.map((t) => `
      <button type="button" class="chip" data-no="${t.no}" style="${tagStyle(t)}" aria-pressed="false">
        <i></i><span>${t.nameKo}<small>No.${t.no} ${t.nameEn}</small></span>
      </button>`).join("");

    const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    function mix(colors) {
      const rgb = colors.map(hexToRgb);
      const avg = [0, 1, 2].map((c) => Math.round(rgb.reduce((s, v) => s + v[c], 0) / rgb.length));
      return `rgb(${avg.join(",")})`;
    }
    function render() {
      $$(".chip", labChips).forEach((c) => {
        const on = picked.includes(c.dataset.no);
        c.setAttribute("aria-pressed", on);
        c.disabled = !on && picked.length >= 3;
      });
      const ts = picked.map(byNo);
      const names = ["", "싱글 캐스크", "더블 캐스크", "트리플 캐스크 피니시"];
      if (!ts.length) {
        $("#labName").textContent = "티백을 골라주세요";
        $("#labSub").textContent = "한 장은 싱글 캐스크, 세 장은 트리플 캐스크 피니시.";
        liquid.setAttribute("fill", "rgba(243,235,221,.12)");
        return;
      }
      $("#labName").textContent = names[ts.length];
      $("#labSub").textContent = ts.map((t) => `${t.nameEn}`).join(" × ");
      liquid.setAttribute("fill", mix(ts.map((t) => t.tagColor)));
    }
    labChips.addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (!c || c.disabled) return;
      const i = picked.indexOf(c.dataset.no);
      i > -1 ? picked.splice(i, 1) : picked.push(c.dataset.no);
      render();
    });
    $("#labReset").addEventListener("click", () => { picked.length = 0; render(); });
    render();
  }

  /* ---------- 상황별 사진: 페어링 태그 · 라이트박스 ---------- */
  $$("[data-pair]").forEach((el) => {
    el.innerHTML = el.dataset.pair.split(",").map((no) => {
      const t = byNo(no);
      return `<span class="mini-tag" style="${tagStyle(t)}">No.${t.no} ${t.nameEn}</span>`;
    }).join("");
  });
  const lightbox = $("#lightbox");
  if (lightbox) {
    $$(".scene").forEach((s) => s.addEventListener("click", () => {
      const img = $("img", s);
      $("#lightboxImg").src = s.dataset.full;
      $("#lightboxImg").alt = img.alt;
      openModal(lightbox);
    }));
  }

  /* ---------- 해시태그 복사 ---------- */
  const tagWrap = $("#hashtags");
  if (tagWrap) {
    tagWrap.innerHTML = D.hashtags.map((h) => `<button type="button" class="hashtag">${h}</button>`).join("");
    tagWrap.addEventListener("click", async (e) => {
      const b = e.target.closest(".hashtag");
      if (!b) return;
      try {
        await navigator.clipboard.writeText(b.textContent);
        toast(`${b.textContent} 복사했어요`);
      } catch {
        toast("복사에 실패했어요. 길게 눌러 복사해 주세요");
      }
    });
  }

  /* ---------- 홍보 영상 ---------- */
  const video = $("#promo");
  if (video) {
    const box = $("#videoBox");
    $("#videoPlay").addEventListener("click", () => { video.play(); });
    video.addEventListener("play", () => box.classList.add("is-playing"));
    video.addEventListener("ended", () => box.classList.remove("is-playing"));
    // 화면 밖으로 나가면 일시정지
    new IntersectionObserver(([en]) => { if (!en.isIntersecting && !video.paused) video.pause(); }, { threshold: 0.2 }).observe(box);
  }

  /* ---------- 구매 ---------- */
  const optWrap = $("#buyOptions");
  if (optWrap) {
    const PRICE = 30000, PER_PACK = 5;
    const won = (n) => n.toLocaleString("ko-KR") + "원";
    let sel = "03", qty = 1;
    optWrap.innerHTML = D.lineup.map((t) => `
      <button type="button" class="option" role="radio" aria-checked="false" data-id="${t.no}" style="${tagStyle(t)}">
        <span class="swatch"><i></i></span>
        <span><b>No.${t.no} ${t.nameKo}</b><small>${t.nameEn}${t.signature ? ' <em class="opt-sig">SIGNATURE</em>' : ""}</small></span>
      </button>`).join("");

    function renderOpt() {
      const t = byNo(sel);
      $$(".option", optWrap).forEach((b) => {
        const on = b.dataset.id === sel;
        b.setAttribute("aria-checked", on);
        b.tabIndex = on ? 0 : -1;
      });
      $("#buyImg").src = `assets/img/${D.parts[t.part].img}-sm.webp`;
      $("#optSel").textContent = `· ${t.nameKo}`;
      $("#qty").textContent = qty;
      $("#totalPrice").textContent = won(PRICE * qty);
      $("#totalNote").textContent = `(${qty}팩 · 티백 ${PER_PACK * qty}개)`;
    }
    optWrap.addEventListener("click", (e) => {
      const b = e.target.closest(".option");
      if (b) { sel = b.dataset.id; renderOpt(); }
    });
    optWrap.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
      e.preventDefault();
      const i = D.lineup.findIndex((t) => t.no === sel);
      const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : D.lineup.length - 1;
      sel = D.lineup[(i + d) % D.lineup.length].no;
      renderOpt();
      $(`.option[data-id="${sel}"]`, optWrap).focus();
    });
    $("#qtyMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); renderOpt(); });
    $("#qtyPlus").addEventListener("click", () => { qty = Math.min(20, qty + 1); renderOpt(); });
    $$("[data-buy]").forEach((b) => b.addEventListener("click", () => {
      const t = byNo(sel);
      $("#buySummary").textContent = `No.${t.no} ${t.nameKo} × ${qty}팩 (티백 ${PER_PACK * qty}개) · ${won(PRICE * qty)}`;
      $("#buyModalTitle").textContent = b.dataset.buy === "cart" ? "장바구니에 담을 수 없어요" : "구매할 수 없는 제품입니다";
      openModal($("#buyModal"));
    }));
    renderOpt();
  }

  /* ---------- 모바일 하단 구매바 ---------- */
  const mBuy = $("#mobileBuy");
  if (mBuy) {
    const buySec = $("#buy");
    const footer = $(".footer");
    function toggleBar() {
      const pastHero = hero ? window.scrollY > hero.offsetHeight * 0.8 : true;
      const target = buySec || footer;
      const nearEnd = target.getBoundingClientRect().top < window.innerHeight * 0.8;
      mBuy.classList.toggle("show", pastHero && !nearEnd);
    }
    window.addEventListener("scroll", toggleBar, { passive: true });
    toggleBar();
  }

  /* ---------- 레시피 페이지: 서브 내비 ---------- */
  const subLinks = $$(".sub-nav a");
  if (subLinks.length) {
    const map = new Map(subLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        subLinks.forEach((a) => a.classList.remove("active"));
        const a = map.get(en.target.id);
        if (a) { a.classList.add("active"); a.scrollIntoView({ block: "nearest", inline: "nearest" }); }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) sio.observe(s); });
  }

  /* ---------- 레시피 페이지: 숙성 카드 ---------- */
  const ageTable = $("#ageTable");
  if (ageTable) {
    ageTable.innerHTML = D.aging.map((a, i) => `
      <article class="age-card reveal" data-delay="${i}" style="--c:${a.color};--t:${textOnDark(a.color)}">
        <div class="t">${a.time}</div>
        <div class="m">≈ ${a.metaphor}</div>
        <div class="g">${a.grade}</div>
        <div class="ge">${a.gradeEn}</div>
        <p>${a.note}</p>
      </article>`).join("");
    $$(".reveal", ageTable).forEach((el) => io.observe(el));
  }

  /* ---------- 레시피 페이지: 티백 태그 · 타이머 ---------- */
  $$("[data-bags]").forEach((el) => {
    el.innerHTML = el.dataset.bags.split(",").map((no) => {
      const t = byNo(no);
      return `<span class="mini-tag" style="${tagStyle(t)}">No.${t.no} ${t.nameKo} · ${t.nameEn}</span>`;
    }).join("");
  });

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  $$(".timer[data-seconds]").forEach((tm) => {
    const total = +tm.dataset.seconds;
    const clock = $(".clock", tm), bar = $(".bar i", tm), btn = $("button", tm), status = $(".status", tm);
    let left = total, iv = null;
    clock.textContent = fmt(total);
    function stop(reset) {
      clearInterval(iv); iv = null;
      btn.textContent = reset ? "타이머 시작" : "계속";
      if (reset) { left = total; clock.textContent = fmt(total); bar.style.width = "0"; tm.classList.remove("done"); status.textContent = tm.dataset.label; }
    }
    btn.addEventListener("click", () => {
      if (tm.classList.contains("done")) return stop(true);
      if (iv) return stop(false);
      btn.textContent = "일시정지";
      status.textContent = "우리는 중… 잔 속에서 숙성이 진행되고 있어요";
      iv = setInterval(() => {
        left--;
        clock.textContent = fmt(left);
        bar.style.width = `${((total - left) / total) * 100}%`;
        if (left <= 0) {
          clearInterval(iv); iv = null;
          tm.classList.add("done");
          status.innerHTML = `<b>${tm.dataset.grade} 완성!</b> 지금 티백을 건져내세요.`;
          btn.textContent = "다시 시작";
          toast(`${tm.dataset.grade} 완성! 티백을 건져내세요`);
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        }
      }, 1000);
    });
  });
})();
