document.getElementById('inputForm').addEventListener('input', enableButton);

function enableButton() {
    const inputs = document.querySelectorAll('input[type="number"]');
    const button = document.getElementById('submitButton');
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    button.disabled = !allFilled;
}

function addRow() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const input3 = document.getElementById('input3').value;

    const table = document.getElementById('resultTable');
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = input1;
    newRow.insertCell(1).innerText = input2;
    newRow.insertCell(2).innerText = input3;

    const currentDate = new Date();
    newRow.insertCell(3).innerText = currentDate.toLocaleString();

    // Reset input fields and disable button
    document.getElementById('inputForm').reset();
    document.getElementById('submitButton').disabled = true;
}
