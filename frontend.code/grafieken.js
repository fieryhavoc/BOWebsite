/**
 * DuHu Dashboard - Grafieken Module
 * Beheert data-fetching en grafiek rendering
 */

// Google Charts configuratie
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(startDashboard);

// Dashboard initialisatie
function startDashboard() {
    laadEnTekendataEnGrafieken();
    startTijdPolling();
}

// Haal alle data parallel op en teken grafieken
async function laadEnTekendataEnGrafieken() {
    try {
        const [lokalResponse, weerData] = await Promise.all([
            fetch('grafieken.json').catch(e => {
                console.error('Fout bij ophalen grafieken.json:', e);
                return { ok: false };
            }),
            haalWeerData()
        ]);

        if (!lokalResponse.ok) {
            console.error('Kan grafieken.json niet laden');
            return;
        }

        const lokalData = await lokalResponse.json();

        // Teken alle grafieken
        tekenGasGrafiek(lokalData.gasverbruik);
        tekenElektriciteitGrafiek(lokalData.elektriciteit);
        tekenTemperatuurGrafiek(weerData.temperatuur);
        tekenWeersverwachtingGrafiek(weerData.weersverwachting);
        tekenWaterGrafiek(lokalData.waterverbruik);
        tekenZonnepanelenGrafiek(lokalData.zonnepanelen);
    } catch (fout) {
        console.error('Dashboard laad fout:', fout);
    }
}

// Utility functie voor grafiek tabel opzet
function maakGrafiektabel(kolommen, gegevens, mapper) {
    const tabel = new google.visualization.DataTable();
    
    kolommen.forEach(kolom => {
        tabel.addColumn(kolom.type, kolom.label);
    });
    
    gegevens.forEach(item => {
        tabel.addRow(mapper(item));
    });
    
    return tabel;
}

// Utility functie voor veilig element ophalen
function getElementVeilig(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element met ID '${id}' niet gevonden`);
    }
    return element;
}

// Gasverbruik grafiek
function tekenGasGrafiek(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    
    const tabel = maakGrafiektabel(
        [{ type: 'string', label: 'Dag' }, { type: 'number', label: 'm³' }],
        gegevens,
        r => [r.datum, Number(r.verbruik)]
    );

    const opties = {
        title: 'Gasverbruik (m³)',
        legend: 'none',
        hAxis: { textStyle: { fontSize: 12 } }
    };
    
    const element = getElementVeilig('gas_chart_div');
    if (element) {
        new google.visualization.ColumnChart(element).draw(tabel, opties);
    }
}

// Elektriciteit grafiek
function tekenElektriciteitGrafiek(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    
    const tabel = maakGrafiektabel(
        [{ type: 'string', label: 'Dag' }, { type: 'number', label: 'kWh' }],
        gegevens,
        r => [r.datum, Number(r.verbruik)]
    );

    const opties = {
        title: 'Elektriciteit (kWh)',
        legend: 'none',
        hAxis: { textStyle: { fontSize: 12 } }
    };
    
    const element = getElementVeilig('stroom_chart_div');
    if (element) {
        new google.visualization.ColumnChart(element).draw(tabel, opties);
    }
}

// Temperatuur grafiek met info
function tekenTemperatuurGrafiek(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    
    const tabel = maakGrafiektabel(
        [
            { type: 'string', label: 'Dag' },
            { type: 'number', label: 'Binnen (°C)' },
            { type: 'number', label: 'Buiten (°C)' }
        ],
        gegevens,
        r => [r.dag, Number(r.binnen), Number(r.buiten)]
    );

    const opties = {
        title: 'Binnen en buiten temperatuur (°C)',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { textStyle: { fontSize: 12 } }
    };
    
    const element = getElementVeilig('temperatuur_chart_div');
    if (element) {
        new google.visualization.LineChart(element).draw(tabel, opties);
    }
    
    // Toon info onder grafiek
    toonTemperatuurInfo(gegevens);
}

// Weersverwachting grafiek met info
function tekenWeersverwachtingGrafiek(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    
    const tabel = maakGrafiektabel(
        [
            { type: 'string', label: 'Dag' },
            { type: 'number', label: 'Binnen (°C)' },
            { type: 'number', label: 'Buiten (°C)' }
        ],
        gegevens,
        r => [r.dag, Number(r.binnen), Number(r.buiten)]
    );

    const opties = {
        title: 'Weersverwachting (°C)',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { textStyle: { fontSize: 12 } }
    };
    
    const element = getElementVeilig('weersverwachting_chart_div');
    if (element) {
        new google.visualization.LineChart(element).draw(tabel, opties);
    }
    
    // Toon info onder grafiek
    toonWeersverwachtingInfo(gegevens);
}

// Waterverbruik grafiek
function tekenWaterGrafiek(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    
    const tabel = maakGrafiektabel(
        [{ type: 'string', label: 'Dag' }, { type: 'number', label: 'Liter' }],
        gegevens,
        r => [r.datum, Number(r.verbruik)]
    );

    const opties = {
        title: 'Waterverbruik (L)',
        legend: 'none',
        hAxis: { textStyle: { fontSize: 12 } }
    };
    
    const element = getElementVeilig('water_chart_div');
    if (element) {
        new google.visualization.ColumnChart(element).draw(tabel, opties);
    }
}

// Zonnepanelen grafiek met info
function tekenZonnepanelenGrafiek(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    
    const tabel = maakGrafiektabel(
        [{ type: 'string', label: 'Dag' }, { type: 'number', label: 'Opbrengst (kWh)' }],
        gegevens,
        r => [r.datum, Number(r.opbrengst)]
    );

    const opties = {
        title: 'Zonnepanelen opbrengst (kWh)',
        legend: 'none',
        hAxis: { textStyle: { fontSize: 12 } }
    };
    
    const element = getElementVeilig('zonnepanelen_chart_div');
    if (element) {
        new google.visualization.ColumnChart(element).draw(tabel, opties);
    }
    
    // Toon info onder grafiek
    toonZonnepanelenInfo(gegevens);
}

// Info functies - tonen data onder grafieken
function toonTemperatuurInfo(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    const huidig = gegevens[0];
    const element = document.querySelector('.temperatuur-info');
    if (element) {
        element.textContent = `Vandaag: Binnen ${huidig.binnen}°C | Buiten ${huidig.buiten}°C`;
    }
}

function toonWeersverwachtingInfo(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    const huidig = gegevens[0];
    const element = document.querySelector('.weersverwachting-info');
    if (element) {
        element.textContent = `Verwachting morgen: Binnen ${huidig.binnen}°C | Buiten ${huidig.buiten}°C`;
    }
}

function toonZonnepanelenInfo(gegevens) {
    if (!gegevens || gegevens.length === 0) return;
    const totaal = gegevens.reduce((sum, r) => sum + Number(r.opbrengst), 0);
    const gemiddelde = (totaal / gegevens.length).toFixed(1);
    const element = document.querySelector('.zonnepanelen-info');
    if (element) {
        element.textContent = `Totaal deze week: ${totaal.toFixed(1)} kWh | Gemiddeld: ${gemiddelde} kWh/dag`;
    }
}

// Tijd updates
let tijdUpdateInterval = null;

function startTijdPolling() {
    updateTijdDisplay();
    if (tijdUpdateInterval) clearInterval(tijdUpdateInterval);
    tijdUpdateInterval = setInterval(updateTijdDisplay, 1000);
}

function updateTijdDisplay() {
    try {
        const nu = new Date();
        const opties = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Amsterdam'
        };
        
        const geformateerd = new Intl.DateTimeFormat('nl-NL', opties).format(nu);
        const container = document.querySelector('.tijd-info');
        if (container) {
            container.textContent = geformateerd;
        }
    } catch (e) {
        console.error('Fout bij update tijd display:', e);
    }
}
// ===================== ZONNEPANELEN =====================
function drawSolarChart(records) {
        const container = document.querySelector('.zonnepanelen-info');
        if (!container) { console.warn('zonnepanelen-info container not found'); return; }
        // create chart div if not present
        let chartEl = document.getElementById('zonnepanelen_chart_div');
        if (!chartEl) {
                chartEl = document.createElement('div');
                chartEl.id = 'zonnepanelen_chart_div';
                chartEl.style.width = '100%';
                chartEl.style.height = '320px';
                container.appendChild(chartEl);
        }

        const dt = new google.visualization.DataTable();
        dt.addColumn('string', 'Dag');
        dt.addColumn('number', 'kWh');

        records.forEach(r => {
                let label = '';
                let value = NaN;
                if (typeof r === 'string' || typeof r === 'number') {
                        label = String(r);
                        value = 0;
                } else if (Array.isArray(r)) {
                        label = String(r[0]);
                        value = Number(r[1]);
                } else if (typeof r === 'object' && r !== null) {
                        label = r.datum || r.dag || r.date || r.name || '';
                        if ('opbrengst' in r) value = Number(r.opbrengst);
                        else if ('kwh' in r) value = Number(r.kwh);
                        else if ('value' in r) value = Number(r.value);
                        else if ('verbruik' in r) value = Number(r.verbruik);
                        else {
                                for (const k in r) {
                                        if (['datum','dag','date','name'].includes(k)) continue;
                                        const n = Number(r[k]);
                                        if (!isNaN(n)) { value = n; break; }
                                }
                        }
                }
                dt.addRow([label || '', isNaN(value) ? 0 : value]);
        });

        const options = {
                title: 'Zonnepanelen opbrengst (kWh)'
        };

        const chart = new google.visualization.ColumnChart(document.getElementById('zonnepanelen_chart_div'));
        chart.draw(dt, options);
}