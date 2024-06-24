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
    loadDataFromLocalStorage();
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

function addDataToTable(e) {
    e.preventDefault();

    const table = document.querySelector('#actualMonthStats table tbody');
    const newRow = table.insertRow();
    const cells = [
        newRow.insertCell(0),
        newRow.insertCell(1),
        newRow.insertCell(2),
        newRow.insertCell(3),
        newRow.insertCell(4)
    ];

    cells[0].innerText = systolicPressure.value;
    cells[1].innerText = diastolicPressure.value;
    cells[2].innerText = pulse.value;
    cells[3].innerText = weight.value;
    cells[4].innerText = getFormattedDate();

    saveDataToLocalStorage(cells);

    resetInputFields();
}

function getFormattedDate() {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
}

function saveDataToLocalStorage(cells) {
    const data = {
        systolicPressure: cells[0].innerText,
        diastolicPressure: cells[1].innerText,
        pulse: cells[2].innerText,
        weight: cells[3].innerText,
        date: cells[4].innerText
    };

    const existingData = JSON.parse(localStorage.getItem('healthData')) || [];
    existingData.push(data);
    localStorage.setItem('healthData', JSON.stringify(existingData));
}

function loadDataFromLocalStorage() {
    const existingData = JSON.parse(localStorage.getItem('healthData')) || [];

    const table = document.querySelector('#actualMonthStats table tbody');
    table.innerHTML = '';

    existingData.forEach(data => {
        const newRow = table.insertRow();
        const cells = [
            newRow.insertCell(0),
            newRow.insertCell(1),
            newRow.insertCell(2),
            newRow.insertCell(3),
            newRow.insertCell(4)
        ];

        cells[0].innerText = data.systolicPressure;
        cells[1].innerText = data.diastolicPressure;
        cells[2].innerText = data.pulse;
        cells[3].innerText = data.weight;
        cells[4].innerText = data.date;
    });
}

function resetInputFields() {
    systolicPressure.value = '';
    diastolicPressure.value = '';
    pulse.value = '';
    weight.value = '';
}
