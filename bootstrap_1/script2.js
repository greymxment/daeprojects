
    // List of games that can be added "",
    const games = [
      "Oneshot",

      "Resident Evil 2",
      "Resident Evil 3",
      "Resident Evil 4",
      "Resident Evil 5",
      "Resident Evil 6",

      "Resident Evil 8 Village",
      "Resident Evil 8",
      "Resident Evil Village",

      "Resident Evil 7 Biohazard",
      "Resident Evil 7",
      "Resident Evil Biohazard", 
      
      "Omori",
      "Roblox",
      "Silent Hill",
      "Beat Saber",
      "Phasmophobia",
      "Minecraft",
      "ULTRAKILL",

      "Red Dead Redemption",
      "Red Dead Redemption 2",

      "The Last of Us",
      "The Last of Us Part II",

      "Dead Space",

      "Dying Light",
      "Dying Light 2",

      "Super Mario",

      "Sonic Frontiers",
      "Sonic Mania",

      "Geometry Dash",
      "Mouthwashing",
      "Limbus Company",
      "Lethal Company",
      "Slime Rancher",

      "Call of Duty Modern Warfare 2",
      "Fortnite",
      "High on Life",
      
      

    ];

    // Game categories for similarity calculation "": ["","",""],
    const gameCategories = {
      "Oneshot": ["indie", "puzzle", "story"],
      "Resident Evil 2": ["horror", "survival", "action"],
      "Resident Evil 3": ["horror", "survival", "action"],
      "Resident Evil 4": ["horror", "survival", "action"],
      "Resident Evil 5": ["horror", "action", "co-op"],
      "Resident Evil 6": ["horror", "action", "co-op"],
      "Resident Evil 8 Village": ["horror", "survival", "first-person"],
      "Resident Evil 8": ["horror", "survival", "first-person"],
      "Resident Evil Village": ["horror", "survival", "first-person"],
      "Resident Evil 7 Biohazard": ["horror", "survival", "first-person"],
      "Resident Evil 7": ["horror", "survival", "first-person"],
      "Resident Evil Biohazard": ["horror", "survival", "first-person"],
      "Omori": ["indie", "rpg", "psychological"],
      "Roblox": ["sandbox", "multiplayer", "casual"],
      "Silent Hill": ["horror", "psychological", "survival"],
      "Beat Saber": ["vr", "rhythm", "action"],
      "Phasmophobia": ["horror", "co-op", "investigation"],
      "Minecraft": ["sandbox", "survival", "crafting"],
      "ULTRAKILL": ["fps", "action", "fast-paced"],
      "Red Dead Redemption": ["open-world", "western", "action"],
      "Red Dead Redemption 2": ["open-world", "western", "action"],
      "The Last of Us": ["survival", "story", "action"],
      "The Last of Us Part II": ["survival", "story", "action"],
      "Dead Space": ["horror", "sci-fi", "survival"],
      "Dying Light": ["survival", "zombie", "parkour"],
      "Dying Light 2": ["survival", "zombie", "parkour"],
      "Super Mario": ["platformer", "family", "adventure"],
      "Sonic Frontiers": ["platformer", "action", "open-world"],
      "Sonic Mania": ["platformer", "2d", "classic"],
      "Geometry Dash": ["rhythm", "platformer", "difficult"],
      "Mouthwashing": ["indie", "experimental", "horror"],
      "Limbus Company": ["rpg", "gacha", "story"],
      "Lethal Company": ["horror", "co-op", "multiplayer"],
      "Slime Rancher": ["adventure", "simulation", "cute"],
      "Fortnite":["shooter","co-op","cartoony"],
      "High on Life": ["rpg","comedy","sci-fi"],
    };

    // Function to calculate similarity score between two games
    function calculateSimilarity(game1, game2) {
      // If either game is not in our categories database, return 0
      if (!gameCategories[game1] || !gameCategories[game2]) {
        return 0;
      }
      
      const categories1 = gameCategories[game1];
      const categories2 = gameCategories[game2];
      
      // Count common categories
      let commonCategories = 0;
      for (const category of categories1) {
        if (categories2.includes(category)) {
          commonCategories++;
        }
      }
      
      // Calculate Jaccard similarity coefficient (intersection over union)
      const unionCategories = new Set([...categories1, ...categories2]).size;
      const similarityScore = commonCategories / unionCategories;
      
      // Convert to percentage and round to 1 decimal place
      return Math.round(similarityScore * 100 * 10) / 10;
    }

    // Function to update similarity scores for editor's picks
    function updateSimilarityScores() {
      const likedGames = Array.from(document.querySelectorAll('#liked-games-list .game-card h3'))
        .map(el => el.textContent.trim());
      
      if (likedGames.length === 0) {
        // Hide all similarity scores if no liked games
        document.querySelectorAll('.similarity-score').forEach(el => {
          el.textContent = '';
        });
        return;
      }
      
      // Update similarity score for each suggested game
      document.querySelectorAll('#suggested-games .game-card').forEach(card => {
        const gameTitle = card.querySelector('h3').textContent.split(' by ')[0].trim();
        const scoreElement = card.querySelector('.similarity-score');
        
        // Calculate average similarity to all liked games
        let totalSimilarity = 0;
        let validComparisons = 0;
        
        for (const likedGame of likedGames) {
          const similarity = calculateSimilarity(likedGame, gameTitle);
          if (similarity > 0) {
            totalSimilarity += similarity;
            validComparisons++;
          }
        }
        
        const avgSimilarity = validComparisons > 0 ? totalSimilarity / validComparisons : 0;
        
        // Display score with appropriate color
        let scoreColor = 'gray';
        if (avgSimilarity >= 70) {
          scoreColor = 'green';
        } else if (avgSimilarity >= 40) {
          scoreColor = 'orange';
        } else if (avgSimilarity > 0) {
          scoreColor = 'red';
        }
        
        scoreElement.textContent = avgSimilarity > 0 ? `Match: ${avgSimilarity.toFixed(1)}%` : '';
        scoreElement.style.color = scoreColor;
      });
    }

    // Function to search for and add games
    function searchGame() {
      const inputField = document.getElementById('game-search');
      const input = inputField.value.trim().toLowerCase();
      const errorMessage = document.getElementById('error-message');
      
      // Clear any previous error messages
      errorMessage.textContent = '';
      
      if (input === "") {
        errorMessage.textContent = "Please enter a game title";
        return;
      }
      
      // Check if the input matches a game in the list
      const matchedGame = games.find(game => game.toLowerCase() === input);
      
      if (!matchedGame) {
        // Show error message if no match found
        errorMessage.textContent = "Type correct name of a game";
        return;
      }
      
      // Prevent duplicate entries
      const existingGames = Array.from(document.querySelectorAll('.game-card h3'))
        .map(el => el.textContent.trim().toLowerCase());
        
      if (existingGames.includes(matchedGame.toLowerCase())) {
        errorMessage.textContent = "This game is already in your list";
        inputField.value = ''; // Clear input after entering duplicate
        return;
      }
      
      // Create and add game card
      const gameList = document.getElementById('liked-games-list');
      const gameCard = document.createElement('div');
      gameCard.className = 'game-card';
      
      // Use simple image naming without folder
      let gameImage = '';
      if (matchedGame.toLowerCase() === "resident evil 4") {
        gameImage = "re4.jpeg";
      } else {
        // For other games, remove spaces
        gameImage = matchedGame.replace(/\s+/g, '').toLowerCase() + ".jpg";
      }
      
      gameCard.innerHTML = `
        <img src="${gameImage}" alt="${matchedGame}" onerror="this.src='https://via.placeholder.com/200x150';">
        <h3>${matchedGame}</h3>
        <button onclick="removeGame(this)">Remove</button>
      `;
      
      gameList.appendChild(gameCard);
      
      // Clear input field after adding
      inputField.value = '';
      
      // Update game card count
      updateGameCardCount();
      
      // Update similarity scores
      updateSimilarityScores();
    }

    // Function to remove a game card
    function removeGame(button) {
      const gameCard = button.closest('.game-card');
      gameCard.remove();
      updateGameCardCount();
      updateSimilarityScores();
    }

    // Function to update the game card count
    function updateGameCardCount() {
      const gameList = document.getElementById('liked-games-list');
      const gameCardCount = gameList.children.length;
      const countDisplay = document.getElementById('game-card-count');
      countDisplay.textContent = `Total Game Cards: ${gameCardCount}`;
    }

    // Add event listener for Enter key
    document.addEventListener('DOMContentLoaded', function() {
      const inputField = document.getElementById('game-search');
      inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          searchGame();
        }
      });
    });

    // Function to show game details (placeholder for now)
    function showGameDetails(gameName) {
      alert(`Details for ${gameName} will be shown here.`);
    }
 