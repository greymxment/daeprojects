// login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your Firebase config (replace with your actual config)
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

// Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const authMessage = document.getElementById("auth-message");
const loggedInContainer = document.getElementById("logged-in-container");
const userEmailDisplay = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-button");
const authContainer = document.getElementById("auth-container");
const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
const confirmPasswordGroup = document.getElementById("confirm-password-group");
const pageTitle = document.getElementById("page-title");

let isLoginMode = true;

// Toggle between login and signup forms
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLoginMode = !isLoginMode;
  if (isLoginMode) {
    pageTitle.textContent = "Login to your account";
    loginButton.style.display = "block";
    signupButton.style.display = "none";
    confirmPasswordGroup.style.display = "none";
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggle-link">Sign up here</a>`;
  } else {
    pageTitle.textContent = "Create a new account";
    loginButton.style.display = "none";
    signupButton.style.display = "block";
    confirmPasswordGroup.style.display = "block";
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggle-link">Login here</a>`;
  }
});

// Login
loginButton.addEventListener("click", async () => {
  clearMessage();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage("Please enter email and password.", "error");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showMessage("Successfully logged in!", "success");
  } catch (error) {
    showMessage(error.message, "error");
  }
});

// Signup
signupButton.addEventListener("click", async () => {
  clearMessage();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!email || !password || !confirmPassword) {
    showMessage("Please fill all fields.", "error");
    return;
  }
  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showMessage("Account created successfully! You are now logged in.", "success");
  } catch (error) {
    showMessage(error.message, "error");
  }
});

// Logout
logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    showMessage("Logged out successfully.", "success");
  } catch (error) {
    showMessage(error.message, "error");
  }
});

// Auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    authContainer.style.display = "none";
    loggedInContainer.style.display = "block";
    userEmailDisplay.textContent = user.email;
  } else {
    // No user signed in
    authContainer.style.display = "block";
    loggedInContainer.style.display = "none";
    clearInputs();
  }
});

function showMessage(message, type) {
  authMessage.textContent = message;
  authMessage.className = "";
  if (type === "success") authMessage.classList.add("success");
  if (type === "error") authMessage.classList.add("error");
}

function clearMessage() {
  authMessage.textContent = "";
  authMessage.className = "";
}

function clearInputs() {
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
}
