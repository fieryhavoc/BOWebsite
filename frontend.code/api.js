const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';
const WEATHER_API_PARAMS = '?latitude=52.37&longitude=4.90&timezone=Europe%2FAmsterdam&daily=temperature_2m_max,temperature_2m_min&forecast_days=7';

async function fetchWeatherData() {
    const url = WEATHER_API_BASE + WEATHER_API_PARAMS;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Weer-API fout: ' + response.status);
    }
    const apiJson = await response.json();
    return mapWeatherApiToData(apiJson);
}

function mapWeatherApiToData(apiJson) {
    const dates = apiJson.daily?.time || [];
    const highs = apiJson.daily?.temperature_2m_max || [];
    const lows = apiJson.daily?.temperature_2m_min || [];

    const records = dates.map((date, index) => {
        const high = Number(highs[index] ?? 0);
        const low = Number(lows[index] ?? 0);
        const buiten = Number(((high + low) / 2).toFixed(1));
        const binnen = Number((buiten + 2.5).toFixed(1));

        return {
            dag: formatDutchDay(date),
            buiten,
            binnen
        };
    });

    return {
        temperatuur: records,
        weersverwachting: records
    };
}

function formatDutchDay(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('nl-NL', { weekday: 'long' });
}

