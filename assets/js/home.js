/* ===================================================
   home.js — hero search, country flag filters, featured grid
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const flags = [
        { name: 'Italy', code: 'it' },
        { name: 'Germany', code: 'de' },
        { name: 'USA', code: 'us' },
        { name: 'Britain', code: 'gb' },
        { name: 'Japan', code: 'jp' },
        { name: 'France', code: 'fr' },
        { name: 'Sweden', code: 'se' },
        { name: 'Australia', code: 'au' }
    ];

    const flagRow = document.getElementById('flagRow');
    flagRow.innerHTML = flags.map(f => `
        <div class="group cursor-pointer" data-country="${f.name}" title="${f.name}">
            <div class="w-[60px] h-[40px] rounded overflow-hidden border border-[#222222] group-hover:border-r2 transition-all">
                <img src="https://flagcdn.com/w80/${f.code}.png" alt="${f.name}" class="w-full h-full object-cover">
            </div>
        </div>`).join('');

    flagRow.querySelectorAll('[data-country]').forEach(el => {
        el.addEventListener('click', () => {
            const country = el.getAttribute('data-country');
            document.getElementById('heroSearchInput').value = country;
            handleSearch(country);
        });
    });

    const input = document.getElementById('heroSearchInput');
    const btn = document.getElementById('heroSearchBtn');
    input.addEventListener('input', (e) => handleSearch(e.target.value));
    btn.addEventListener('click', () => handleSearch(input.value));

    let cachedData = null;

    function handleSearch(query) {
        const resultsCard = document.getElementById('searchResultsCard');
        const q = query.toLowerCase().trim();
        if (!q) { resultsCard.classList.add('hidden'); return; }

        SD.loadData().then(({ cars, brands }) => {
            cachedData = { cars, brands };
            const carMatches = cars.filter(car =>
                car.brand.toLowerCase().includes(q) ||
                car.name.toLowerCase().includes(q) ||
                car.country.toLowerCase().includes(q) ||
                (car.specs || []).some(s => s.value.toLowerCase().includes(q))
            );
            const brandMatches = brands.filter(b =>
                b.toLowerCase().includes(q) && !carMatches.some(c => c.brand === b)
            );

            resultsCard.classList.remove('hidden');

            if (carMatches.length === 0 && brandMatches.length === 0) {
                resultsCard.innerHTML = `<div class="text-gray-400 p-2">${SD.t('noResults').replace('{q}', query)}</div>`;
                return;
            }

            const carHtml = carMatches.map(car => `
                <a href="car.html?id=${encodeURIComponent(car.id)}" class="p-3 bg-c1 rounded-lg border border-[#1f1f1f] flex justify-between items-center hover:border-r1 transition-colors cursor-pointer">
                    <div>
                        <div class="font-heading font-bold text-white text-base">${car.brand} ${car.name}</div>
                        <div class="text-gray-400 text-xs">${car.year} • ${car.country}</div>
                    </div>
                    <span class="text-r2 font-heading text-xs uppercase">${SD.t('viewSpec')}</span>
                </a>`).join('');

            const brandHtml = brandMatches.map(brand => `
                <a href="brand.html?name=${encodeURIComponent(brand)}" class="p-3 bg-c1 rounded-lg border border-[#1f1f1f] flex justify-between items-center hover:border-r1 transition-colors cursor-pointer">
                    <div class="font-heading font-bold text-white text-base">${brand}</div>
                    <span class="text-r2 font-heading text-xs uppercase">${SD.t('viewBrand')}</span>
                </a>`).join('');

            resultsCard.innerHTML = carHtml + brandHtml;
        });
    }

    // Featured grid — skeleton while loading, then real cards
    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = Array.from({ length: 3 }).map(() => `
        <div class="skeleton rounded-xl h-64 border border-[#1F1F1F]"></div>
    `).join('');

    SD.loadData().then(({ cars }) => {
        const featured = cars.slice(-6).reverse();
        if (featured.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-gray-400">${SD.t('comingSoonBody')}</div>`;
            return;
        }
        grid.innerHTML = featured.map(car => `
            <a href="car.html?id=${encodeURIComponent(car.id)}" class="sd-card block bg-c2 border border-[#1F1F1F] rounded-xl overflow-hidden reveal">
                <div class="h-40 overflow-hidden bg-c1">
                    <img src="${car.image || 'assets/img/placeholder.jpg'}" alt="${car.brand} ${car.name}" class="w-full h-full object-cover" onerror="this.style.opacity=0">
                </div>
                <div class="p-4">
                    <div class="text-r2 font-heading uppercase tracking-widest text-xs">${car.brand}</div>
                    <div class="font-heading font-bold text-lg text-white">${car.name}</div>
                    <div class="text-gray-400 text-xs mt-1">${car.year} • ${car.zeroToHundred} 0-100</div>
                </div>
            </a>`).join('');
        SD.initScrollReveal();
    });
});
