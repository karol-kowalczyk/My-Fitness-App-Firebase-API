function init() {

}

function submitHealthData() {
    let systolic = document.getElementById('systolic').value;
    let diastolic = document.getElementById('diastolic').value;
    let pulse = document.getElementById('pulse').value;
    let weight = document.getElementById('weight').value;

    if (!systolic || !diastolic || !pulse || !weight) {
        alert('All input fields are required!');
    } else {
        console.log('Form submitted with values:', { systolic, diastolic, pulse, weight });
    }

    resetInputFields();
}

function resetInputFields() {
    document.getElementById('systolic').value = '';
    document.getElementById('diastolic').value = '';
    document.getElementById('pulse').value = '';
    document.getElementById('weight').value = '';
}
