import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { app } from "./firebase.js";

const database = getDatabase(app);

document.getElementById('inputForm').addEventListener('input', enableButton);
document.getElementById('submitButton').addEventListener('click', addRow);
window.addEventListener('load', loadEntries);

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
    const input4 = document.getElementById('input4').value;

    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    const newEntry = {
        input1: input1,
        input2: input2,
        input3: input3,
        input4: input4,
        timestamp: timestamp
    };

    // Push to Firebase and add to table only after successful push
    const entriesRef = ref(database, 'entries');
    push(entriesRef, newEntry).then(() => {
        addEntryToTable(newEntry);

        // Reset input fields and disable button
        document.getElementById('inputForm').reset();
        document.getElementById('submitButton').disabled = true;
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

function addEntryToTable(entry) {
    const table = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = entry.input1;
    newRow.insertCell(1).innerText = entry.input2;
    newRow.insertCell(2).innerText = entry.input3;
    newRow.insertCell(3).innerText = entry.input4;
    newRow.insertCell(4).innerText = entry.timestamp;
}

function loadEntries() {
    const entriesRef = ref(database, 'entries');
    onValue(entriesRef, (snapshot) => {
        const entries = snapshot.val();
        if (entries) {
            const tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing table rows

            for (let key in entries) {
                addEntryToTable(entries[key]);
            }
        }
    });
}

export { enableButton, addRow, loadEntries };
