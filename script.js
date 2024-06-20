function init() {
    showDate();
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