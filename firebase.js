// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbqCXqOEZsn6yRMM2_nPQsJUoLOXXXuPo",
    authDomain: "fitnessapp-4de8e.firebaseapp.com",
    databaseURL: "https://fitnessapp-4de8e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fitnessapp-4de8e",
    storageBucket: "fitnessapp-4de8e.appspot.com",
    messagingSenderId: "108154605765",
    appId: "1:108154605765:web:999c3a25d0fc64309460ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database, ref, push };
