// script2.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// ===== Paste the same firebaseConfig you used in index.html =====
const firebaseConfig = {
  apiKey: "AIzaSyDQUREqsDC1fQXyoZi4tB9YEr2c0HjS93s",
  authDomain: "game-catalog---nice-game-tm.firebaseapp.com",
  databaseURL: "https://game-catalog---nice-game-tm-default-rtdb.firebaseio.com",
  projectId: "game-catalog---nice-game-tm",
  storageBucket: "game-catalog---nice-game-tm.firebasestorage.app",
  messagingSenderId: "236266946428",
  appId: "1:236266946428:web:3dc62d8c1d1d805643aef9",
  measurementId: "G-85Y87EW5RW"
};
// ================================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM references
const gameNameInput = document.getElementById("game-name");
const gameDescriptionInput = document.getElementById("game-description");
const gameImageUrlInput = document.getElementById("game-image-url");
const gameTagsInput = document.getElementById("game-tags");
const addGameButton = document.getElementById("add-game-button");
const gameListDiv = document.getElementById("liked-games-list");
const gameCountP = document.getElementById("game-card-count");
const errorMessageP = document.getElementById("error-message");

// Wait until Auth state is known
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Start listening to changes in "games" collection
    startListeningForGames();
  } else {
    // If not logged in, redirect to login.html
    window.location.href = "login.html";
  }
});

// ========== CREATE: Add a new game to Firestore ==========
addGameButton.addEventListener("click", async () => {
  // Clear any previous error
  errorMessageP.textContent = "";

  // Read input values
  const name = gameNameInput.value.trim();
  const description = gameDescriptionInput.value.trim();
  const imageUrl = gameImageUrlInput.value.trim();
  const tagsArray = gameTagsInput
    .value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  // Simple client-side validation
  if (!name || !description || !imageUrl) {
    errorMessageP.textContent = "Please fill in Name, Description, and Image URL.";
    return;
  }

  try {
    // Add new document under "games" collection
    await addDoc(collection(db, "games"), {
      name,
      description,
      imageUrl,
      tags: tagsArray,
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      timestamp: Date.now()
    });

    // Clear inputs on success
    gameNameInput.value = "";
    gameDescriptionInput.value = "";
    gameImageUrlInput.value = "";
    gameTagsInput.value = "";

  } catch (e) {
    console.error("Error adding document: ", e);
    errorMessageP.textContent = "Error adding game: " + e.message;
  }
});

// ========== READ (and live-update) all games ==========
function startListeningForGames() {
  // Query: all docs in "games", ordered by descending timestamp
  const q = query(
    collection(db, "games"),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snapshot) => {
    // Clear current list
    gameListDiv.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const docId = docSnap.id;

      // Create a card for each game
      const card = document.createElement("div");
      card.classList.add("game-card");

      // Image
      const img = document.createElement("img");
      img.src = data.imageUrl;
      img.alt = data.name;
      card.appendChild(img);

      // Title
      const titleEl = document.createElement("h3");
      titleEl.textContent = data.name;
      card.appendChild(titleEl);

      // Description
      const descEl = document.createElement("p");
      descEl.textContent = data.description;
      card.appendChild(descEl);

      // Tags line
      if (Array.isArray(data.tags) && data.tags.length > 0) {
        const tagsEl = document.createElement("p");
        tagsEl.classList.add("tags");
        tagsEl.textContent = "Tags: " + data.tags.join(", ");
        card.appendChild(tagsEl);
      }

      // Posted by
      const postedByEl = document.createElement("p");
      postedByEl.style.fontSize = "0.85rem";
      postedByEl.style.color = "#555";
      postedByEl.textContent = `Posted by: ${data.userEmail}`;
      card.appendChild(postedByEl);

      // If the currently logged-in user is the creator, show Edit/Delete
      if (data.userId === auth.currentUser.uid) {
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actions");

        // EDIT button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
          promptEditGame(docId, data);
        });
        actionsDiv.appendChild(editBtn);

        // DELETE button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          promptDeleteGame(docId);
        });
        actionsDiv.appendChild(deleteBtn);

        card.appendChild(actionsDiv);
      }

      gameListDiv.appendChild(card);
    });

    // Update total count
    gameCountP.textContent = `Total Game Cards: ${snapshot.size}`;
  });
}

// ========== UPDATE: Prompt user to edit and then updateDoc ==========
async function promptEditGame(docId, oldData) {
  const newName = prompt("Update Game Name:", oldData.name);
  if (newName === null) return; // user clicked “Cancel”

  const newDescription = prompt("Update Description:", oldData.description);
  if (newDescription === null) return;

  const newImageUrl = prompt("Update Image URL:", oldData.imageUrl);
  if (newImageUrl === null) return;

  const newTagsStr = prompt("Update Tags (comma separated):", oldData.tags.join(", "));
  if (newTagsStr === null) return;

  // Build array from comma-separated tags
  const newTagsArray = newTagsStr
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // Call Firestore to update
  try {
    await updateDoc(doc(db, "games", docId), {
      name: newName,
      description: newDescription,
      imageUrl: newImageUrl,
      tags: newTagsArray
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

// ========== DELETE: Confirm then deleteDoc ==========
async function promptDeleteGame(docId) {
  const ans = confirm("Are you sure you want to delete this game?");
  if (!ans) return;
  try {
    await deleteDoc(doc(db, "games", docId));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}
