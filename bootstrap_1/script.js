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
