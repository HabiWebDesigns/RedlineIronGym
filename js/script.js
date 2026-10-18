/* REDLINE IRON — shared script. Vanilla JS only. */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const IMG = id => `https://images.unsplash.com/photo-${id}?w=900&q=70`;
const IDS = ['1534438327276-14e5300c3a48', '1571019613454-1cb2f99b2d8b', '1517836357463-d25dfeac3438', '1581009146145-b5ef050c2e1e', '1599058917212-d750089bc07e', '1540497077202-7c8a3999166f', '1558611848-73f7eb4001a1', '1526506118085-60ce8714f8c5', '1583454110551-21f2fa2afe61', '1593079831268-3381b0db4a77', '1605296867304-46d5465a13f1', '1574680096145-d05b474e2155'];
const EQ = [['Power Racks', 'Strength', 'Commercial half and full racks with safeties.'], ['Cable Machines', 'Chest', 'Dual-stack crossovers for flys and presses.'], ['Olympic Platforms', 'Strength', 'Chalk-friendly lifting platforms with bumper plates.'], ['Dumbbells', 'Arms', 'Rubber hex 2–50 kg on tiered racks.'], ['Leg Press', 'Legs', '45° plate-loaded press, smooth sled.'], ['Cardio Zone', 'Cardio', 'Treadmills, bikes, rowers and ski-ergs.'], ['Lat Pulldown', 'Back', 'Selectorized pulldown with multi-grip bars.'], ['Seated Row', 'Back', 'Chest-supported plate-loaded row.'], ['Bench Press', 'Chest', 'Flat, incline and decline stations.'], ['Shoulder Press', 'Shoulders', 'Hammer-strength-style plate-loaded press.'], ['Hack Squat', 'Legs', 'Deep-range squat with angled sled.'], ['Preacher Curl', 'Arms', 'Cambered pad for strict curls.'], ['Sled & Turf', 'Functional', 'Push sled, battle ropes and kettlebells.'], ['Rower', 'Cardio', 'Air-resistance rowers with live metrics.'], ['Plyo Boxes', 'Functional', 'Stackable boxes for jumps and step-ups.'], ['Lateral Raise', 'Shoulders', 'Pin-loaded raise for isolated delts.']];
const PLANS = [['Day Pass', '150', '/day', ['Full gym access', 'Locker access', 'Shower facilities']], ['Monthly', '1,500', '/mo', ['Full gym access', 'Locker & shower', 'Cardio area', 'Free orientation']], ['3 Months', '4,000', '', ['Everything in Monthly', '1 free coach session', 'Save ₱500']], ['6 Months', '7,000', '', ['Everything in 3 Months', 'Guest pass 1/mo', 'Save ₱2,000'], 'Best value'], ['Annual', '12,000', '/yr', ['24/7 key-fob access', 'Guest pass 2/mo', 'Save ₱6,000']]];
const FACTS = ['Muscle growth is driven by progressive overload and adequate recovery.', 'Your muscles don\'t grow while you\'re lifting. Recovery is where adaptation happens.', 'The quadriceps contain four major muscles.', 'Compound exercises train multiple muscle groups at once.', 'Sleep plays an important role in muscle recovery.', 'Protein intake spread across the day supports muscle repair.', 'Warming up raises muscle temperature and prepares joints for load.', 'The gluteus maximus is the largest muscle in the human body.', 'Strength gains early on come largely from nervous system adaptation.', 'Hydration affects strength and endurance output.', 'Resistance training helps maintain bone density.', 'Time under tension is one lever for stimulating muscle growth.', 'Full range of motion often builds more muscle than partial reps.', 'Rest days are part of the program, not a break from it.', 'Heart rate recovery is a common marker of cardio fitness.', 'The deadlift trains the hamstrings, glutes, back and grip together.', 'Consistency beats intensity: a good plan done for months wins.', 'Muscle tissue burns more energy at rest than fat tissue.', 'Breathing out on the effort phase helps keep lifts controlled.', 'Training both pushing and pulling muscles supports healthy shoulders.'];
const page = document.body.dataset.page || 'index.html';
/* ---- shared layout ---- */
const links = [['index.html', 'Home'], ['rates.html', 'Rates'], ['equipment.html', 'Equipment'], ['gallery.html', 'Gallery'], ['inquiry.html', 'Inquiry']];
document.body.insertAdjacentHTML('afterbegin', `<a class="skip" href="#main">Skip to content</a><div id="loader" aria-hidden="true"><span>REDLINE</span></div><div id="prog"></div>
<header class="nav"><div class="wrap"><a class="logo" href="index.html" aria-label="Redline Iron home">REDLINE<b>/</b>IRON</a>
<nav aria-label="Main"><ul id="menu">${links.map(l => `<li><a href="${l[0]}" ${l[0] === page ? 'class="on" aria-current="page"' : ''}>${l[1].toUpperCase()}</a></li>`).join('')}</ul></nav>
<a class="btn cta" href="rates.html">Join the grind</a><button class="burger" aria-label="Toggle menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button></div></header>`);
document.body.insertAdjacentHTML('beforeend', `<footer><div class="wrap"><span class="logo">REDLINE<b>/</b>IRON</span><span>© 2026 Redline Iron Gym. Placeholder brand.</span><span>Mon–Fri 5AM–11PM · Sat–Sun 6AM–10PM</span></div></footer>
<button id="top" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>
<div id="fact"><div class="pop-card" hidden role="dialog" aria-label="Gym fact"><button class="x" aria-label="Close">×</button><h4>Did you know?</h4><p></p><button class="more">Another fact</button></div><button aria-label="Show a gym fact" aria-expanded="false"><i class="fa-solid fa-dumbbell"></i></button></div>
<div class="lb" role="dialog" aria-modal="true" aria-label="Image viewer"><button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><button class="n" aria-label="Next">›</button></div>`);
window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), 400));
/* img fallback so broken links still look intentional */
const img = (id, alt) => `<img src="${IMG(id)}" alt="${alt}" loading="lazy" onerror="this.style.opacity=0">`;
/* ---- nav, scroll ---- */
const nav = $('.nav'), burger = $('.burger'), menu = $('#menu');
burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o) };
$$('#menu a').forEach(a => a.onclick = () => menu.classList.remove('open'));
const hb = $('[data-parallax]');
addEventListener('scroll', () => {
    const y = scrollY, h = document.body.scrollHeight - innerHeight;
    nav.classList.toggle('stuck', y > 40); $('#prog').style.width = (y / h * 100) + '%'; $('#top').classList.toggle('show', y > 600);
    if (hb && y < innerHeight) hb.style.transform = `translateY(${y * .25}px)`
}, { passive: true });
$('#top').onclick = () => scrollTo({ top: 0 });
/* ---- cards ---- */
const eqCard = (e, i) => `<article class="card" data-cat="${e[1]}"><div class="imgbox">${img(IDS[i % IDS.length], e[0] + ' at Redline Iron')}</div><div class="t"><span class="tag">${e[1]}</span><h3>${e[0]}</h3><p>${e[2]}</p></div></article>`;
const planCard = (p, small) => `<article class="plan reveal ${p[4] ? 'pop' : ''}">${p[4] ? `<span class="badge">${p[4] === 'Best value' ? 'POPULAR' : p[4]}</span>` : ''}<h3>${p[0]}</h3><div class="price">₱${p[1]}<small>${p[2]}</small></div><ul>${p[3].map(f => `<li>${f}</li>`).join('')}</ul><a class="btn ${p[4] ? '' : 'ghost'}" href="inquiry.html">Get started</a></article>`;
if ($('#featured')) $('#featured').innerHTML = EQ.slice(0, 6).map(eqCard).join('');
if ($('#preview-plans')) { const p = $('#preview-plans'); p.classList.add('sm'); p.innerHTML = [PLANS[0], PLANS[1], [...PLANS[4], 'Popular']].map(planCard).join('') }
if ($('#all-plans')) $('#all-plans').innerHTML = PLANS.map(planCard).join('');
/* equipment filter */
if ($('#eq-all')) {
    const grid = $('#eq-all'); grid.innerHTML = EQ.map(eqCard).join('');
    const cats = ['All', ...new Set(EQ.map(e => e[1]))]; const f = $('.filters');
    f.innerHTML = cats.map((c, i) => `<button class="${i ? '' : 'on'}" data-c="${c}">${c.toUpperCase()}</button>`).join('');
    f.onclick = e => {
        const b = e.target.closest('button'); if (!b) return; $$('button', f).forEach(x => x.classList.remove('on')); b.classList.add('on');
        $$('.card', grid).forEach(c => {
            const show = b.dataset.c === 'All' || c.dataset.cat === b.dataset.c;
            if (show) { c.classList.remove('hide'); requestAnimationFrame(() => c.classList.remove('fade')) } else { c.classList.add('fade'); setTimeout(() => c.classList.contains('fade') && c.classList.add('hide'), 300) }
        })
    }
}
/* gallery + lightbox */
const lb = $('.lb'), lbi = $('img', lb); let gi = 0, gset = [];
if ($('#gal')) {
    const alts = ['Free weight area', 'Dumbbell rack', 'Squat rack in use', 'Cardio floor', 'Athlete mid-lift', 'Gym interior', 'Barbell close-up', 'Member training', 'Cable station', 'Plates and chalk', 'Functional zone', 'Evening session'];
    gset = IDS.map((id, i) => [IMG(id), alts[i]]);
    $('#gal').innerHTML = gset.map((g, i) => `<figure data-i="${i}" tabindex="0" role="button" aria-label="Enlarge: ${g[1]}"><img src="${g[0]}" alt="${g[1]}" loading="lazy" style="aspect-ratio:${[4 / 5, 1, 3 / 4, 4 / 3, 1, 4 / 5, 3 / 4, 1, 4 / 3, 4 / 5, 1, 3 / 4][i].toFixed(2)};object-fit:cover" onerror="this.style.opacity=0"></figure>`).join('');
    const open = i => { gi = (i + gset.length) % gset.length; lbi.src = gset[gi][0]; lbi.alt = gset[gi][1]; lb.classList.add('open') };
    $('#gal').onclick = e => { const f = e.target.closest('figure'); if (f) open(+f.dataset.i) };
    $('#gal').onkeydown = e => { if (e.key === 'Enter' && e.target.dataset.i) open(+e.target.dataset.i) };
    $('.p', lb).onclick = e => { e.stopPropagation(); open(gi - 1) }; $('.n', lb).onclick = e => { e.stopPropagation(); open(gi + 1) };
    $('.x', lb).onclick = () => lb.classList.remove('open'); lb.onclick = e => { if (e.target === lb) lb.classList.remove('open') };
    addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') lb.classList.remove('open'); if (e.key === 'ArrowRight') open(gi + 1); if (e.key === 'ArrowLeft') open(gi - 1) })
}
/* FAQ */
$$('.faq button').forEach(b => b.onclick = () => { const o = b.getAttribute('aria-expanded') === 'true'; $$('.faq button').forEach(x => x.setAttribute('aria-expanded', 'false')); b.setAttribute('aria-expanded', !o) });
/* fact widget */
{
    const w = $('#fact'), card = $('.pop-card', w), btn = $(':scope>button', w); let last = -1;
    const show = () => { let n; do n = Math.floor(Math.random() * FACTS.length); while (n === last); last = n; $('p', card).textContent = FACTS[n] };
    btn.onclick = () => { if (card.hidden) { show(); card.hidden = false; btn.setAttribute('aria-expanded', true) } else show() };
    $('.x', card).onclick = () => { card.hidden = true; btn.setAttribute('aria-expanded', false) }; $('.more', card).onclick = show;
    addEventListener('keydown', e => { if (e.key === 'Escape' && !card.hidden) $('.x', card).click() })
}
/* reveal + count-up */
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target) }), { threshold: .15 });
$$('.reveal,.card,.plan').forEach(el => { el.classList.add('reveal'); io.observe(el) });
const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const el = e.target, t = +el.dataset.count, s = el.dataset.suf || ''; let st;
    const step = ts => { st = st || ts; const p = Math.min((ts - st) / 1500, 1); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))) + s; if (p < 1) requestAnimationFrame(step) }; requestAnimationFrame(step); cio.unobserve(el)
}), { threshold: .6 });
$$('[data-count]').forEach(el => cio.observe(el));
/* button ripple */
document.addEventListener('click', e => {
    const b = e.target.closest('.btn'); if (!b) return; const r = b.getBoundingClientRect(), s = document.createElement('span');
    s.className = 'rip'; s.style.cssText = `width:60px;height:60px;left:${e.clientX - r.left - 30}px;top:${e.clientY - r.top - 30}px`; b.appendChild(s); setTimeout(() => s.remove(), 600)
});
/* inquiry form validation */
const form = $('#inq');
if (form) {
    const msgs = { name: 'Please enter your name.', email: 'Enter a valid email address.', phone: 'Enter a phone number.', type: 'Choose an inquiry type.', message: 'Please write a short message.' };
    const check = f => { const l = f.closest('label'), ok = f.checkValidity() && f.value.trim() !== ''; l.classList.toggle('bad', !ok); $('.err', l).textContent = ok ? '' : msgs[f.name]; return ok };
    $$('[required]', form).forEach(f => { f.addEventListener('blur', () => check(f)); f.addEventListener('input', () => f.closest('label').classList.contains('bad') && check(f)) });
    form.addEventListener('submit', e => {
        e.preventDefault();
        const bad = $$('[required]', form).filter(f => !check(f));
        if (bad.length) { bad[0].focus(); return }
        $('#ok').hidden = false
    })
}
