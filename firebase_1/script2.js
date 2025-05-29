// script2.js

function searchGame() {
  const input = document.getElementById("game-search");
  const errorMessage = document.getElementById("error-message");
  const likedGamesList = document.getElementById("liked-games-list");
  const gameCardCount = document.getElementById("game-card-count");

  const gameTitle = input.value.trim();
  if (gameTitle === "") {
    errorMessage.textContent = "Please enter a game title.";
    return;
  }

  // Clear previous error
  errorMessage.textContent = "";

  // Create game card
  const card = document.createElement("div");
  card.classList.add("game-card");

  const titleElement = document.createElement("h3");
  titleElement.textContent = gameTitle;

  const detailsButton = document.createElement("button");
  detailsButton.textContent = "Details";
  detailsButton.addEventListener("click", () => showGameDetails(gameTitle));

  card.appendChild(titleElement);
  card.appendChild(detailsButton);

  likedGamesList.appendChild(card);

  // Clear input after adding
  input.value = "";

  // Update count
  gameCardCount.textContent = `Total Game Cards: ${likedGamesList.childElementCount}`;
}

function showGameDetails(title) {
  alert(`Details about ${title} coming soon!`);
}
