function init() {
    showDate();
    showActualmonth();
}

function showDate() {
    let date = document.getElementById('actualDate');
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const dayOfWeek = daysOfWeek[today.getDay()];
    const fullDate = dayOfWeek + ', ' + day + '-' + month + '-' + year;
    date.innerText = fullDate;
}

function showActualMonth() {
    let monthElement = document.getElementById('actualMonth');
    const today = new Date();
    const months = [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];
    const monthName = months[today.getMonth()];
    monthElement.innerText = monthName;
}