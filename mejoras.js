// Mejoras: contadores, aparecer al hacer scroll, botón de subir, buscador y newsletter
(() => {
    // Contadores animados
    const contadores = document.querySelectorAll('[data-contar]');
    const io = new IntersectionObserver(entradas => {
        entradas.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, meta = +el.dataset.contar, t0 = performance.now();
            const paso = t => {
                const p = Math.min((t - t0) / 1500, 1);
                el.textContent = Math.round(meta * p).toLocaleString('es-ES');
                if (p < 1) requestAnimationFrame(paso);
            };
            requestAnimationFrame(paso);
            io.unobserve(el);
        });
    });
    contadores.forEach(c => io.observe(c));

    // Aparecer al hacer scroll
    const ro = new IntersectionObserver(entradas => entradas.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
    }), { threshold: .15 });
    document.querySelectorAll('.reveal, .product-card, .feature-card').forEach(el => { el.classList.add('reveal'); ro.observe(el); });

    // Botón volver arriba
    const subir = document.getElementById('btn-subir');
    if (subir) {
        addEventListener('scroll', () => { subir.hidden = scrollY < 400; });
        subir.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Buscador del catálogo
    const buscador = document.querySelector('.search-input');
    if (buscador) {
        buscador.addEventListener('input', () => {
            const q = buscador.value.trim().toLowerCase();
            document.querySelectorAll('.products-grid .product-card').forEach(c => {
                c.style.display = c.textContent.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    // Newsletter
    const news = document.getElementById('form-news');
    if (news) news.addEventListener('submit', e => {
        e.preventDefault();
        news.hidden = true;
        document.getElementById('news-ok').hidden = false;
    });
})();