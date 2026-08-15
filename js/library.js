/* ===================================================
   library.js — brand grid + country filter chips
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('brandGrid');
    const chipsWrap = document.getElementById('countryChips');

    grid.innerHTML = Array.from({ length: 8 }).map(() => `
        <div class="skeleton rounded-xl h-24 border border-[#1F1F1F]"></div>
    `).join('');

    let allCars = [], allBrands = [];
    let activeCountry = 'All';

    function countryForBrand(brand) {
        const car = allCars.find(c => c.brand === brand);
        return car ? car.country : null;
    }

    function render() {
        const visibleBrands = activeCountry === 'All'
            ? allBrands
            : allBrands.filter(b => countryForBrand(b) === activeCountry);

        if (visibleBrands.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-gray-400 py-10 text-center">${SD.t('comingSoonBody')}</div>`;
            return;
        }

        grid.innerHTML = visibleBrands.map((brand, i) => {
            const count = allCars.filter(c => c.brand === brand).length;
            return `
            <a href="brand.html?name=${encodeURIComponent(brand)}"
               class="sd-card reveal reveal-delay-${(i % 4)} cursor-pointer bg-c2 border border-[#1F1F1F] rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-center">
                <span class="font-heading font-bold text-lg text-white uppercase tracking-wide">${brand}</span>
                <span class="text-xs text-gray-500">${count} ${count === 1 ? 'model' : 'models'}</span>
            </a>`;
        }).join('');
        SD.initScrollReveal();
    }

    function renderChips() {
        const countries = Array.from(new Set(allCars.map(c => c.country))).filter(Boolean).sort();
        const all = ['All', ...countries];
        chipsWrap.innerHTML = all.map(c => `
            <button data-country="${c}"
                class="chip px-4 py-1.5 rounded-full border border-[#222222] text-sm font-heading uppercase tracking-wide text-gray-300 ${c === activeCountry ? 'active' : ''}">
                ${c === 'All' ? SD.t('libraryAllChip') : c}
            </button>`).join('');

        chipsWrap.querySelectorAll('[data-country]').forEach(btn => {
            btn.addEventListener('click', () => {
                activeCountry = btn.getAttribute('data-country');
                chipsWrap.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                render();
            });
        });
    }

    SD.loadData().then(({ cars, brands }) => {
        allCars = cars;
        allBrands = brands;
        renderChips();
        render();
    });

    document.addEventListener('sd:langchange', () => { renderChips(); render(); });
});
