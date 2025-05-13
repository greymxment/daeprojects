// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS0Rh8ZiVOOhq-NotwqGP7LGtelGhgjZw",
  authDomain: "nice-game-c43a8.firebaseapp.com",
  projectId: "nice-game-c43a8",
  storageBucket: "nice-game-c43a8.firebasestorage.app",
  messagingSenderId: "723709421965",
  appId: "1:723709421965:web:4aea2144ef8d1c9a2075c4",
  measurementId: "G-CJKJYVR1KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




function searchGame() {
    const input = document.getElementById('game-search').value;
    if (input.trim() === '') return;

    const gameList = document.getElementById('liked-games-list');
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';

    gameCard.innerHTML = `
        <img src="https://via.placeholder.com/200x150" alt="${input}">
        <h3>${input}</h3>
        <button>Details</button>
    `;

    gameList.appendChild(gameCard);
    document.getElementById('game-search').value = '';
}

console.log("gameList")
