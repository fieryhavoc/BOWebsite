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
