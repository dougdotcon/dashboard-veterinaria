document.addEventListener('DOMContentLoaded', () => {
    const csvPath = 'Dados_Bovinos.csv';
    const totalBovinos = document.getElementById('totalBovinos');
    const totalLeite = document.getElementById('totalLeite');
    const totalDoencas = document.getElementById('totalDoencas');
    const regionFilter = document.getElementById('regionFilter');
    let chart1, chart2;

    async function fetchData() {
        const response = await fetch(csvPath);
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const parsedData = rows.map(row => {
            const cols = row.split(',');
            return {
                Veterinario: cols[0],
                Região: cols[1],
                Data_Visita: cols[2],
                Quantidade_Bovinos: parseInt(cols[3]),
                Peso_Médio_kg: parseFloat(cols[4]),
                Vacinas_Administradas: parseInt(cols[5]),
                Casos_Doencas: parseInt(cols[6]),
                Produção_Leite_Litros: parseInt(cols[7]),
            };
        });
        return parsedData;
    }

    function updateDashboard(data) {
        const region = regionFilter.value;
        const filteredData = region === 'All' ? data : data.filter(d => d.Região === region);

        const totalBovinosCount = filteredData.reduce((acc, cur) => acc + cur.Quantidade_Bovinos, 0);
        const totalLeiteCount = filteredData.reduce((acc, cur) => acc + cur.Produção_Leite_Litros, 0);
        const totalDoencasCount = filteredData.reduce((acc, cur) => acc + cur.Casos_Doencas, 0);

        totalBovinos.textContent = totalBovinosCount;
        totalLeite.textContent = totalLeiteCount;
        totalDoencas.textContent = totalDoencasCount;

        updateCharts(filteredData);
    }

    function updateCharts(data) {
        const labels = data.map(d => d.Veterinario);
        const bovinosData = data.map(d => d.Quantidade_Bovinos);
        const leiteData = data.map(d => d.Produção_Leite_Litros);

        if (chart1) chart1.destroy();
        if (chart2) chart2.destroy();

        const ctx1 = document.getElementById('chart1').getContext('2d');
        chart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Quantidade de Bovinos',
                        data: bovinosData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            },
        });

        const ctx2 = document.getElementById('chart2').getContext('2d');
        chart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Produção de Leite (L)',
                        data: leiteData,
                        borderColor: 'rgba(153, 102, 255, 0.6)',
                        borderWidth: 2,
                        fill: false,
                    },
                ],
            },
        });
    }

    regionFilter.addEventListener('change', async () => {
        const data = await fetchData();
        updateDashboard(data);
    });

    (async () => {
        const data = await fetchData();
        updateDashboard(data);
    })();
});
