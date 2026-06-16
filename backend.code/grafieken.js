// Heldere, goed gedocumenteerde Google Charts implementatie
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(initCharts);

function initCharts() {
    // Grafieken opbouwen nadat Google Charts geladen is
    loadDataAndDraw();
}

function loadDataAndDraw() {
    // grafieken.json ligt in dezelfde map als deze pagina (backend.code/index.php)
    // dus we gebruiken een relative fetch naar grafieken.json
    fetch('grafieken.json')
        .then(response => {
            if (!response.ok) throw new Error('Netwerk fout: ' + response.status);
            return response.json();
        })
        .then(data => {
            // data is nu het geparste JSON-object uit grafieken.json
            drawGasChart(data.gasverbruik);
            drawElectricityChart(data.elektriciteit);
            if (data.waterverbruik) drawWaterChart(data.waterverbruik);
        })
        .catch(err => {
            // Foutafhandeling: log naar console zodat je debugging kunt doen
            console.error('Fout bij laden of parsen van grafieken.json:', err);
        });
}

// ===================== GRAFIEKEN FUNCTIES =====================

function drawGasChart(records) {
    // Maak DataTable aan en definieer kolommen
    const dt = new google.visualization.DataTable();
    dt.addColumn('string', 'Dag');
    dt.addColumn('number', 'm3');

    // Voeg rijen toe uit JSON
    records.forEach(r => dt.addRow([r.datum, Number(r.verbruik)]));

    // Opties: eenvoudig en leesbaar. Styling doe je via CSS op de container.
    const options = { title: 'Gasverbruik (m3)' };

    // Element waar de grafiek in moet worden getekend
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

// Styling hint:
// Als je de grootte of marges van de grafieken wilt aanpassen, bewerk dan je CSS-bestand
// en target de container-IDs: #gas_chart_div, #stroom_chart_div, #water_chart_div.
// Voor voorbeeld: zet in style.css of css/style-main.css iets als:
//
// #gas_chart_div, #stroom_chart_div, #water_chart_div {
//     width: 100%;
//     height: 300px; /* pas aan naar wens */
// }
//
// (Ik maak geen styling hier - alleen aanwijzing waar je het moet doen.)