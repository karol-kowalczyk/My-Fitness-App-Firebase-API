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

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
const dayOfWeek = daysOfWeek[today.getDay()];
const fullDate = dayOfWeek + ', ' + day + '-' + month + '-' + year;
const monthName = months[today.getMonth()];

function init() {
    showDate();
    showActualMonth();
}

function showDate() {
    date.innerText = fullDate;
}

function showActualMonth() {
    monthElement.innerHTML = monthName + ' ' + year;
}

function addDataToTable(e) {
    e.preventDefault(); // Prevent form submission
    let today = new Date();
    let formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    let table = document.querySelector('#actualMonthStats table tbody');
    let newRow = table.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    insertCell(cell1, cell2, cell3, cell4, cell5, formattedDate);
    resetInputFields();
}

function insertCell(cell1, cell2, cell3, cell4, cell5, formattedDate) {
    cell1.innerHTML = systolicPressure.value;
    cell2.innerHTML = diastolicPressure.value;
    cell3.innerHTML = pulse.value;
    cell4.innerHTML = weight.value;
    cell5.innerHTML = formattedDate;
}

function resetInputFields() {
    weight.value = '';
    diastolicPressure.value = '';
    pulse.value = '';
    systolicPressure.value = '';
}