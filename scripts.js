document.addEventListener('DOMContentLoaded', () => {
    const csvPath = 'Dados_Bovinos.csv';
    const totalBovinos = document.getElementById('totalBovinos');
    const totalLeite = document.getElementById('totalLeite');
    const totalDoencas = document.getElementById('totalDoencas');
    const taxaMortalidade = document.getElementById('taxaMortalidade');
    const regionFilter = document.getElementById('regionFilter');
    let chart1, chart2, chart3;

    // Função para carregar e processar o CSV
    async function fetchData() {
        const response = await fetch(csvPath);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Remove o cabeçalho
        const parsedData = rows
            .filter(row => row.trim().length > 0) // Ignora linhas vazias
            .map(row => {
                const cols = row.split(',');
                return {
                    Veterinario: cols[0].trim(),
                    Região: cols[1].trim(),
                    Data_Visita: cols[2].trim(),
                    Quantidade_Bovinos: parseInt(cols[3].trim()) || 0,
                    Peso_Médio_kg: parseFloat(cols[4].trim()) || 0,
                    Vacinas_Administradas: parseInt(cols[5].trim()) || 0,
                    Casos_Doencas: parseInt(cols[6].trim()) || 0,
                    Produção_Leite_Litros: parseInt(cols[7].trim()) || 0,
                    Mortalidade: parseFloat(cols[8].trim()) || 0,
                    Natalidade: parseFloat(cols[9].trim()) || 0,
                    Indice_Reproducao: parseFloat(cols[10].trim()) || 0,
                    Idade: cols[11].trim(),
                    Tipo_Alimentacao: cols[12].trim(),
                    Custo_Tratamento: parseFloat(cols[13].trim()) || 0,
                    Raca: cols[14].trim(),
                    Satisfacao_Produtor: parseInt(cols[15].trim()) || 0,
                };
            });
        return parsedData;
    }

    // Atualiza os valores dos cards e gráficos
    function updateDashboard(data) {
        const region = regionFilter.value;
        const filteredData = region === 'All' ? data : data.filter(d => d.Região === region);

        // Cálculos principais
        const totalBovinosCount = filteredData.reduce((acc, cur) => acc + cur.Quantidade_Bovinos, 0);
        const totalLeiteCount = filteredData.reduce((acc, cur) => acc + cur.Produção_Leite_Litros, 0);
        const totalDoencasCount = filteredData.reduce((acc, cur) => acc + cur.Casos_Doencas, 0);
        const avgMortalidade = filteredData.length > 0
            ? (filteredData.reduce((acc, cur) => acc + cur.Mortalidade, 0) / filteredData.length).toFixed(2)
            : 0;

        // Atualiza os valores dos cards
        totalBovinos.textContent = totalBovinosCount.toLocaleString('pt-BR');
        totalLeite.textContent = totalLeiteCount.toLocaleString('pt-BR');
        totalDoencas.textContent = totalDoencasCount.toLocaleString('pt-BR');
        taxaMortalidade.textContent = `${avgMortalidade}%`;

        // Atualiza os gráficos
        updateCharts(filteredData);
    }

    // Atualiza os gráficos
    function updateCharts(data) {
        const labels = data.map(d => d.Veterinario);
        const bovinosData = data.map(d => d.Quantidade_Bovinos);
        const leiteData = data.map(d => d.Produção_Leite_Litros);
        const mortalidadeData = data.map(d => d.Mortalidade);

        if (chart1) chart1.destroy();
        if (chart2) chart2.destroy();
        if (chart3) chart3.destroy();

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

        const ctx3 = document.getElementById('chart3').getContext('2d');
        chart3 = new Chart(ctx3, {
            type: 'radar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Mortalidade (%)',
                        data: mortalidadeData,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
            },
        });
    }

    // Atualiza os dados quando o filtro é alterado
    regionFilter.addEventListener('change', async () => {
        const data = await fetchData();
        updateDashboard(data);
    });

    // Carrega os dados ao iniciar
    (async () => {
        const data = await fetchData();
        updateDashboard(data);
    })();
});
