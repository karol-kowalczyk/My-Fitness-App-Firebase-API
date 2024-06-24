function init() {
    displaySavedData();
}

async function displaySavedData() {
    try {
        const savedData = await getSavedDataFromLocalStorage();
        const savedDataContainer = document.getElementById('savedDataContainer');

        savedData.forEach(monthData => {
            const { monthName, year, averages } = monthData;
            const table = createTable(monthName, year, averages);
            savedDataContainer.appendChild(table);
        });
    } catch (error) {
        console.error('Error displaying saved data:', error);
    }
}

function createTable(monthName, year, averages) {
    const table = document.createElement('table');
    table.classList.add('saved-data-table');

    const headers = ['Skurczowe ciś.', 'Rozkurczowe ciś.', 'Puls', 'Waga'];
    const data = [
        averages.averageSystolic.toFixed(1),
        averages.averageDiastolic.toFixed(1),
        averages.averagePulse.toFixed(1),
        averages.averageWeight.toFixed(1)
    ];

    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const dataRow = document.createElement('tr');
    data.forEach(cellText => {
        const td = document.createElement('td');
        td.textContent = cellText;
        dataRow.appendChild(td);
    });
    table.appendChild(dataRow);

    return table;
}

async function getSavedDataFromLocalStorage() {
    return new Promise((resolve, reject) => {
        try {
            const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
            resolve(savedData);
        } catch (error) {
            reject(error);
        }
    });
}