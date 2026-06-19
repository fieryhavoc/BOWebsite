// Heldere, goed gedocumenteerde Google Charts implementatie
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(initCharts);

function initCharts() {
    // Grafieken opbouwen nadat Google Charts geladen is
    loadDataAndDraw();
}

async function loadDataAndDraw() {
    try {
        const [localResponse, weatherData] = await Promise.all([
            fetch('grafieken.json'),
            fetchWeatherData()
        ]);

        if (!localResponse.ok) throw new Error('Netwerk fout: ' + localResponse.status);
        const localData = await localResponse.json();

        drawGasChart(localData.gasverbruik);
        drawElectricityChart(localData.elektriciteit);
        if (weatherData.temperatuur) drawTemperatureChart(weatherData.temperatuur);
        if (weatherData.weersverwachting) drawForecastChart(weatherData.weersverwachting);
        if (localData.waterverbruik) drawWaterChart(localData.waterverbruik);
        if (localData.zonnepanelen) drawSolarChart(localData.zonnepanelen);
    } catch (err) {
        console.error('Fout bij laden van lokale of API-data:', err);
    }
}

// ===================== GRAFIEKEN FUNCTIES =====================

function drawGasChart(records) {
    const dt = new google.visualization.DataTable();
    dt.addColumn('string', 'Dag');
    dt.addColumn('number', 'm3');

    records.forEach(r => dt.addRow([r.datum, Number(r.verbruik)]));

    const options = { title: 'Gasverbruik (m3)' };
    const el = document.getElementById('gas_chart_div');
    if (!el) { console.warn('gas_chart_div niet gevonden'); return; }

    const chart = new google.visualization.ColumnChart(el);
    chart.draw(dt, options);
}

function drawElectricityChart(records) {
    const dt = new google.visualization.DataTable();
    dt.addColumn('string', 'Dag');
    dt.addColumn('number', 'kWh');

    records.forEach(r => dt.addRow([r.datum, Number(r.verbruik)]));

    const options = { title: 'Elektriciteit (kWh)' };
    const el = document.getElementById('stroom_chart_div');
    if (!el) { console.warn('stroom_chart_div niet gevonden'); return; }

    const chart = new google.visualization.ColumnChart(el);
    chart.draw(dt, options);
}

function drawTemperatureChart(records) {
    const dt = new google.visualization.DataTable();
    dt.addColumn('string', 'Dag');
    dt.addColumn('number', 'Binnen (°C)');
    dt.addColumn('number', 'Buiten (°C)');

    records.forEach(r => dt.addRow([r.dag, Number(r.binnen), Number(r.buiten)]));

    const options = {
        title: 'Binnen en buiten temperatuur (°C)',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    const el = document.getElementById('temperatuur_chart_div');
    if (!el) { console.warn('temperatuur_chart_div niet gevonden'); return; }

    const chart = new google.visualization.LineChart(el);
    chart.draw(dt, options);
}

function drawForecastChart(records) {
    const dt = new google.visualization.DataTable();
    dt.addColumn('string', 'Dag');
    dt.addColumn('number', 'Binnen (°C)');
    dt.addColumn('number', 'Buiten (°C)');

    records.forEach(r => dt.addRow([r.dag, Number(r.binnen), Number(r.buiten)]));

    const options = {
        title: 'Weersverwachting - binnen en buiten (°C)',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    const el = document.getElementById('weersverwachting_chart_div');
    if (!el) { console.warn('weersverwachting_chart_div niet gevonden'); return; }

    const chart = new google.visualization.LineChart(el);
    chart.draw(dt, options);
}

function drawWaterChart(records) {
    const dt = new google.visualization.DataTable();
    dt.addColumn('string', 'Dag');
    dt.addColumn('number', 'Liter');

    records.forEach(r => dt.addRow([r.datum, Number(r.verbruik)]));

    const options = { title: 'Waterverbruik (L)' };
    const el = document.getElementById('water_chart_div');
    if (!el) { console.warn('water_chart_div niet gevonden'); return; }

    const chart = new google.visualization.ColumnChart(el);
    chart.draw(dt, options);
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