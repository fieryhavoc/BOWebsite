/**
 * DuHu Dashboard - API Module
 * Beheert externe API calls (weerdata, zontijden)
 */

// Open-Meteo weerdata API
const WEER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const WEER_API_PARAMS = '?latitude=52.37&longitude=4.90&timezone=Europe%2FAmsterdam&daily=temperature_2m_max,temperature_2m_min&forecast_days=7';

/**
 * Haal weerdata op van Open-Meteo API
 */
async function haalWeerData() {
    try {
        const url = WEER_API_URL + WEER_API_PARAMS;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weer API fout: ${response.status}`);
        }
        
        const data = await response.json();
        return verwerkWeerData(data);
    } catch (fout) {
        console.error('Fout bij ophalen weerdata:', fout);
        return { temperatuur: [], weersverwachting: [] };
    }
}

/**
 * Verwerk weerdata in het juiste format
 */
function verwerkWeerData(apiData) {
    const datums = apiData.daily?.time || [];
    const maxTemp = apiData.daily?.temperature_2m_max || [];
    const minTemp = apiData.daily?.temperature_2m_min || [];

    if (datums.length === 0) {
        console.warn('Geen weerdata ontvangen');
        return { temperatuur: [], weersverwachting: [] };
    }

    const records = datums.map((datum, index) => {
        const max = Number(maxTemp[index] ?? 0);
        const min = Number(minTemp[index] ?? 0);
        const gemiddelde = (max + min) / 2;
        
        return {
            dag: formatDagNaam(datum),
            buiten: Number(gemiddelde.toFixed(1)),
            binnen: Number((gemiddelde + 2.5).toFixed(1))
        };
    });

    return {
        temperatuur: records,
        weersverwachting: records
    };
}

/**
 * Format datum als Nederlandse dagnaam
 */
function formatDagNaam(datumString) {
    try {
        const datum = new Date(datumString + 'T00:00:00');
        return datum.toLocaleDateString('nl-NL', { weekday: 'long' });
    } catch (e) {
        console.error('Fout bij formatteren datum:', e);
        return datumString;
    }
}

<<<<<<< HEAD
// ========== ZONTIJDEN API ==========

let zontijdenUpdateInterval = null;

/**
 * Haal zontijden data op van API endpoint
 */
function haalZontijden() {
    fetch('?api=zontijden')
        .then(response => {
            // Controleer response status
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Controleer API status
            if (data.status === 'success') {
                toonZontijden(data);
            } else {
                console.warn('Zontijden API: ', data.message);
            }
        })
        .catch(error => {
            console.error('Fout bij ophalen zontijden:', error);
        });
}

/**
 * Update zontijden elementen in HTML
 */
function toonZontijden(data) {
    const elementMap = {
        'zontijden-nu': data.current_time,
        'zontijden-opgang': data.sunrise,
        'zontijden-ondergang': data.sunset,
        'zontijden-lengte': data.daylight
    };

    // Update elk element
    Object.entries(elementMap).forEach(([elementId, waarde]) => {
        const element = document.getElementById(elementId);
        if (element && waarde) {
            element.textContent = waarde;
        }
    });
}

/**
 * Start live zontijden updates (elke seconde)
 */
function startZontijdenUpdates() {
    // Controleer of zontijden container op pagina staat
    if (!document.querySelector('.zontijden-info')) {
        return;
    }
    
    // Haal direct op bij start
    haalZontijden();
    
    // Update elke seconde
    if (zontijdenUpdateInterval) {
        clearInterval(zontijdenUpdateInterval);
    }
    zontijdenUpdateInterval = setInterval(haalZontijden, 1000);
}

/**
 * Stop zontijden updates
 */
function stopZontijdenUpdates() {
    if (zontijdenUpdateInterval) {
        clearInterval(zontijdenUpdateInterval);
        zontijdenUpdateInterval = null;
    }
}

// Start zontijden wanneer DOM geladen is
document.addEventListener('DOMContentLoaded', startZontijdenUpdates);

=======
>>>>>>> 37ee189708b8e8858da3c10638007e335f38e814
