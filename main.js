function createGraph() {
    const jsonData = document.getElementById('jsonData').value.trim();

    if (!jsonData) {
        alert('Please enter valid JSON data.');
        return;
    }

    let data;
    try {
        data = JSON.parse(jsonData);
    } catch (error) {
        alert('Invalid JSON format. Please enter valid JSON data.');
        return;
    }

    const labels = Object.keys(data);
    const values = Object.values(data);
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Data',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function downloadChart() {
    const canvas = document.getElementById('myChart');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}