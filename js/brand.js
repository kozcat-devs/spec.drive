/* ===================================================
   brand.js — renders the model grid for one brand
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const brandName = params.get('name') || '';
    const container = document.getElementById('brandPageContent');

    function render() {
        SD.loadData().then(({ cars }) => {
            document.title = `${brandName} | specdrive`;
            const brandCars = cars.filter(c => c.brand === brandName);

            let cardsHtml;
            if (!brandName) {
                cardsHtml = `<div class="text-gray-400">${SD.t('brandNotFound')}</div>`;
            } else if (brandCars.length === 0) {
                cardsHtml = `
                <div class="bg-c2 border border-[#1F1F1F] rounded-2xl p-10 text-center reveal">
                    <p class="font-heading font-bold text-xl text-white uppercase mb-2">${SD.t('comingSoonTitle')}</p>
                    <p class="text-gray-400">${SD.t('comingSoonBody')}</p>
                </div>`;
            } else {
                cardsHtml = `<div class="grid sm:grid-cols-2 gap-4">` + brandCars.map((car, i) => `
                    <a href="car.html?id=${encodeURIComponent(car.id)}"
                       class="sd-card reveal reveal-delay-${i % 4} block bg-c2 border border-[#1F1F1F] rounded-xl overflow-hidden">
                        <div class="h-40 overflow-hidden bg-c1">
                            <img src="${car.image || 'assets/img/placeholder.jpg'}" alt="${car.brand} ${car.name}" class="w-full h-full object-cover" onerror="this.style.opacity=0">
                        </div>
                        <div class="p-4">
                            <div class="font-heading font-bold text-lg text-white">${car.brand} ${car.name}</div>
                            <div class="text-gray-400 text-xs mt-1">${car.year} • ${car.price}</div>
                        </div>
                    </a>`).join('') + `</div>`;
            }

            container.innerHTML = `
                <h2 class="font-heading font-bold text-3xl md:text-5xl text-white uppercase tracking-wide mb-6 reveal">${brandName}</h2>
                ${cardsHtml}`;
            SD.initScrollReveal();
        });
    }

    render();
    document.addEventListener('sd:langchange', render);
});
