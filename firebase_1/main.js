// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQUREqsDC1fQXyoZi4tB9YEr2c0HjS93s",
  authDomain: "game-catalog---nice-game-tm.firebaseapp.com",
  databaseURL: "https://game-catalog---nice-game-tm-default-rtdb.firebaseio.com",
  projectId: "game-catalog---nice-game-tm",
  storageBucket: "game-catalog---nice-game-tm.firebasestorage.app",
  messagingSenderId: "236266946428",
  appId: "1:236266946428:web:3dc62d8c1d1d805643aef9",
  measurementId: "G-85Y87EW5RW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// You can add any other initialization or functions here as needed
