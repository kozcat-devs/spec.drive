/* ===================================================
   car.js — renders a single car's full spec sheet
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const carId = params.get('id') || '';
    const container = document.getElementById('carPageContent');
    const backBtn = document.getElementById('carBackBtn');

    let currentCar = null;

    function render() {
        SD.loadData().then(({ cars }) => {
            const car = cars.find(c => c.id === carId);
            currentCar = car;

            if (!car) {
                container.innerHTML = `<p class="text-gray-400">${SD.t('carNotFound')}</p>`;
                backBtn.onclick = () => window.location.href = 'library.html';
                return;
            }

            document.title = `${car.brand} ${car.name} | specdrive`;
            backBtn.onclick = () => window.location.href = `brand.html?name=${encodeURIComponent(car.brand)}`;
            backBtn.innerHTML = `${SD.t('backToBrand')} ${car.brand}`;

            container.innerHTML = `
                <div class="bg-c2 border border-[#1F1F1F] rounded-2xl overflow-hidden shadow-2xl reveal">
                    <div class="h-56 md:h-80 overflow-hidden bg-c1">
                        <img src="${car.image || 'assets/img/placeholder.jpg'}" alt="${car.brand} ${car.name}" class="w-full h-full object-cover" onerror="this.style.opacity=0">
                    </div>

                    <div class="p-6 md:p-10 space-y-8">
                        <div>
                            <div class="text-r2 font-heading uppercase tracking-widest text-sm">${car.brand}</div>
                            <h2 class="font-heading font-bold text-3xl md:text-5xl text-white uppercase">${car.name} <span class="text-gray-500 text-2xl md:text-3xl">'${car.year}</span></h2>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 reveal reveal-delay-1">
                            <div class="bg-c1 border border-[#222222] rounded-xl p-4 text-center">
                                <img src="https://flagcdn.com/w80/${car.countryFlag}.png" alt="${car.country}" class="w-10 h-7 object-cover rounded mx-auto mb-2 border border-[#2a2a2a]">
                                <div class="text-[11px] text-gray-500 uppercase tracking-wide">${SD.t('statCountry')}</div>
                                <div class="font-heading font-bold text-white text-sm md:text-base">${car.country}</div>
                            </div>
                            <div class="bg-c1 border border-[#222222] rounded-xl p-4 text-center flex flex-col justify-center">
                                <div class="text-[11px] text-gray-500 uppercase tracking-wide">${SD.t('statPrice')}</div>
                                <div class="font-heading font-bold text-r3 text-lg md:text-xl">${car.price}</div>
                            </div>
                            <div class="bg-c1 border border-[#222222] rounded-xl p-4 text-center flex flex-col justify-center">
                                <div class="text-[11px] text-gray-500 uppercase tracking-wide">${SD.t('statTopSpeed')}</div>
                                <div class="font-heading font-bold text-white text-base md:text-lg">${car.topSpeed}</div>
                            </div>
                            <div class="bg-c1 border border-[#222222] rounded-xl p-4 text-center flex flex-col justify-center">
                                <div class="text-[11px] text-gray-500 uppercase tracking-wide">${SD.t('statZeroHundred')}</div>
                                <div class="font-heading font-bold text-white text-base md:text-lg">${car.zeroToHundred}</div>
                            </div>
                        </div>

                        <div class="space-y-4 reveal reveal-delay-2">
                            <p class="text-gray-200 font-body text-base md:text-lg leading-relaxed">${car.summary}</p>

                            ${car.instagram ? `
                            <a href="${car.instagram}" target="_blank" rel="noopener noreferrer"
                               class="flex items-center gap-3 bg-c1 border border-r1/50 hover:border-r1 rounded-xl p-4 transition-all">
                                <i class="fa-brands fa-instagram text-r3 text-xl"></i>
                                <span class="font-heading font-bold text-white uppercase tracking-wide text-sm md:text-base">${SD.t('watchOnInstagram')}</span>
                                <i class="fa-solid fa-arrow-up-right-from-square text-gray-500 text-xs ml-auto"></i>
                            </a>` : ''}

                            <div class="divide-y divide-[#1F1F1F] border-t border-b border-[#1F1F1F]">
                                ${car.specs.map(spec => `
                                    <div class="spec-row py-3 px-2 -mx-2 rounded flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                        <span class="font-heading font-bold text-r2 uppercase text-sm shrink-0 sm:w-56">${spec.label}</span>
                                        <span class="text-gray-300 font-body text-sm md:text-base">${spec.value}</span>
                                    </div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>`;
            SD.initScrollReveal();
        });
    }

    render();
    document.addEventListener('sd:langchange', render);
});
