let monthElement = document.getElementById('actualMonth');
let date = document.getElementById('actualDate');
let systolicPressure = document.getElementById('systolicPressure');
let diastolicPressure = document.getElementById('diastolicPressure');
let pulse = document.getElementById('pulse');
let weight = document.getElementById('weight');

const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

function init() {
    showDate();
    showActualMonth();
    loadDataFromLocalStorage().then(() => {
        console.log('Data loaded from Local Storage.');
        calculateAverages(); // Calculate averages once data is loaded
    }).catch(err => {
        console.error('Error loading data from Local Storage:', err);
    });
    
    setInterval(checkFirstDayOfMonth, 86400000);
}

// Funktion zum Überprüfen, ob der erste Tag des Monats erreicht ist
function checkFirstDayOfMonth() {
    const today = new Date();
    if (today.getDate() === 1) {
        const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1; // Vormonat berechnen
        const lastMonthName = months[lastMonth];
        const lastMonthYear = today.getFullYear();
        
        // Berechne Durchschnittswerte für den letzten Monat
        const averages = calculateAveragesForLastMonth();
        
        // Erstelle Tabelle in savedData.html
        createTableInSavedData(lastMonthName, lastMonthYear, averages);
    }
}

// Funktion zur Berechnung der Durchschnittswerte für den letzten Monat
function calculateAveragesForLastMonth() {
    const today = new Date();
    const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1; // Vormonat berechnen
    const lastMonthYear = today.getFullYear();
    
    let totalSystolic = 0;
    let totalDiastolic = 0;
    let totalPulse = 0;
    let totalWeight = 0;
    let count = 0;
    
    // Iteriere über vorhandene Daten und berechne Durchschnittswerte für den letzten Monat
    const existingData = JSON.parse(localStorage.getItem('healthData')) || [];
    existingData.forEach(data => {
        const dateParts = data.date.split('-');
        const dataMonth = parseInt(dateParts[1], 10) - 1; // Monat von 0 bis 11
        const dataYear = parseInt(dateParts[2], 10);
        
        if (dataMonth === lastMonth && dataYear === lastMonthYear) {
            totalSystolic += parseInt(data.systolicPressure);
            totalDiastolic += parseInt(data.diastolicPressure);
            totalPulse += parseInt(data.pulse);
            totalWeight += parseInt(data.weight);
            count++;
        }
    });
    
    if (count > 0) {
        const averageSystolic = totalSystolic / count;
        const averageDiastolic = totalDiastolic / count;
        const averagePulse = totalPulse / count;
        const averageWeight = totalWeight / count;
        return {
            averageSystolic,
            averageDiastolic,
            averagePulse,
            averageWeight
        };
    } else {
        return null; // Rückgabe null, wenn keine Daten für den letzten Monat vorhanden sind
    }
}

function createTableInSavedData(monthName, year, averages) {
    const savedData = document.createElement('table');
    savedData.innerHTML = `
        <thead>
            <tr>
                <th colspan="2">${monthName} ${year}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Ø skurczowe ciś.:</td>
                <td>${averages.averageSystolic.toFixed(1)} mmHg</td>
            </tr>
            <tr>
                <td>Ø rozkurczowe ciś.:</td>
                <td>${averages.averageDiastolic.toFixed(1)} mmHg</td>
            </tr>
            <tr>
                <td>Ø puls:</td>
                <td>${averages.averagePulse.toFixed(1)} bpm</td>
            </tr>
            <tr>
                <td>Ø waga:</td>
                <td>${averages.averageWeight.toFixed(1)} kg</td>
            </tr>
        </tbody>
    `;
    
    document.body.appendChild(savedData); // Füge die Tabelle in den Body der Seite ein
}


function showDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const fullDate = `${dayOfWeek}, ${day}-${month}-${year}`;
    date.innerText = fullDate;
}

function showActualMonth() {
    const today = new Date();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();
    monthElement.innerHTML = `${monthName} ${year}`;
}

async function addDataToTable(e) {
    e.preventDefault();

    const table = document.querySelector('#healthTable tbody');
    const newRow = table.insertRow();
    const cells = [
        newRow.insertCell(0),
        newRow.insertCell(1),
        newRow.insertCell(2),
        newRow.insertCell(3),
        newRow.insertCell(4),
        newRow.insertCell(5) // New cell for delete button
    ];

    cells[0].innerText = systolicPressure.value;
    cells[1].innerText = diastolicPressure.value;
    cells[2].innerText = pulse.value;
    cells[3].innerText = weight.value;
    cells[4].innerText = getFormattedDate();

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', function() {
        deleteRow(newRow);
    });
    cells[5].appendChild(deleteButton);

    try {
        await saveDataToLocalStorage(cells);
        resetInputFields();
        calculateAverages(); // Recalculate averages after new data is added
    } catch (error) {
        console.error('Error saving data to Local Storage:', error);
    }

    loadDataFromLocalStorage();
}

function getFormattedDate() {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
}

async function saveDataToLocalStorage(cells) {
    const data = {
        systolicPressure: cells[0].innerText,
        diastolicPressure: cells[1].innerText,
        pulse: cells[2].innerText,
        weight: cells[3].innerText,
        date: cells[4].innerText
    };

    let existingData = await loadDataFromLocalStorage(); // Load existing data

    // Add new data to existing data array
    existingData.push(data);

    // Save updated data back to Local Storage
    localStorage.setItem('healthData', JSON.stringify(existingData));
}

async function loadDataFromLocalStorage() {
    return new Promise((resolve, reject) => {
        try {
            const existingData = JSON.parse(localStorage.getItem('healthData')) || [];
            const table = document.querySelector('#healthTable tbody');
            table.innerHTML = '';

            existingData.forEach((data, index) => {
                const newRow = table.insertRow();
                const cells = [
                    newRow.insertCell(0),
                    newRow.insertCell(1),
                    newRow.insertCell(2),
                    newRow.insertCell(3),
                    newRow.insertCell(4),
                    newRow.insertCell(5) // New cell for delete button
                ];

                cells[0].innerText = data.systolicPressure;
                cells[1].innerText = data.diastolicPressure;
                cells[2].innerText = data.pulse;
                cells[3].innerText = data.weight;
                cells[4].innerText = data.date;

                // Create delete button for each row
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.addEventListener('click', function() {
                    deleteRow(newRow);
                });
                cells[5].appendChild(deleteButton);
            });

            resolve(existingData);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteRow(row) {
    const table = document.querySelector('#healthTable tbody');
    const rowIndex = row.rowIndex
    ;
    table.deleteRow(rowIndex - 1); // Adjusting for header row

    // After deleting, update localStorage
    updateLocalStorageAfterDelete(rowIndex - 1);
    // Recalculate averages after deletion
    calculateAverages();
}

function updateLocalStorageAfterDelete(index) {
    let existingData = JSON.parse(localStorage.getItem('healthData')) || [];

    if (index >= 0 && index < existingData.length) {
        existingData.splice(index, 1); // Remove the item from array
        localStorage.setItem('healthData', JSON.stringify(existingData)); // Update localStorage
    }
}

function calculateAverages() {
    const table = document.querySelector('#healthTable');
    const rows = table.rows;
    const rowCount = rows.length;

    if (rowCount > 1) { // Exclude header row
        let totalSystolic = 0;
        let totalDiastolic = 0;
        let totalPulse = 0;
        let totalWeight = 0;

        for (let i = 1; i < rowCount; i++) {
            const cells = rows[i].cells;
            totalSystolic += parseInt(cells[0].textContent);
            totalDiastolic += parseInt(cells[1].textContent);
            totalPulse += parseInt(cells[2].textContent);
            totalWeight += parseInt(cells[3].textContent);
        }

        const averageSystolic = totalSystolic / (rowCount - 1);
        const averageDiastolic = totalDiastolic / (rowCount - 1);
        const averagePulse = totalPulse / (rowCount - 1);
        const averageWeight = totalWeight / (rowCount - 1);

        document.getElementById('averageSystolic').innerText = averageSystolic.toFixed(1);
        document.getElementById('averageDiastolic').innerText = averageDiastolic.toFixed(1);
        document.getElementById('averagePulse').innerText = averagePulse.toFixed(1);
        document.getElementById('averageWeight').innerText = averageWeight.toFixed(1);

        // Update goals based on averages
        updateGoals(averageSystolic, averageDiastolic, averagePulse, averageWeight);
    } else {
        // If no rows in table, clear averages
        document.getElementById('averageSystolic').innerText = '';
        document.getElementById('averageDiastolic').innerText = '';
        document.getElementById('averagePulse').innerText = '';
        document.getElementById('averageWeight').innerText = '';

        // Clear goals
        document.getElementById('goalSystolic').innerText = '';
        document.getElementById('goalDiastolic').innerText = '';
        document.getElementById('goalPulse').innerText = '';
        document.getElementById('goalWeight').innerText = '';
    }
}

function updateGoals(averageSystolic, averageDiastolic, averagePulse, averageWeight) {
    // Set goals based on averages
    document.getElementById('goalSystolic').innerText = averageSystolic.toFixed(1);
    document.getElementById('goalDiastolic').innerText = averageDiastolic.toFixed(1);
    document.getElementById('goalPulse').innerText = averagePulse.toFixed(1);
    document.getElementById('goalWeight').innerText = averageWeight.toFixed(1);
}

function resetInputFields() {
    systolicPressure.value = '';
    diastolicPressure.value = '';
    pulse.value = '';
    weight.value = '';
}
