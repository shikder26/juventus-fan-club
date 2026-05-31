const params = new URLSearchParams(window.location.search);
const playerId = params.get('id');

fetch('data/players.json')
    .then(response => response.json())
    .then(data => {
        const player = data.find(p => p.id == playerId);

        const playerDetails = document.getElementById('playerDetails');

        playerDetails.innerHTML = `
            <div class="player-profile">

                <img src="${player.image}" 
                     alt="${player.player}" 
                     class="profile-image">

                <h1>${player.player}</h1>

                <p><strong>Position:</strong> ${player.position}</p>
                <p><strong>Age:</strong> ${player.age}</p>
                <p><strong>Nationality:</strong> ${player.nationality}</p>
                <p><strong>Height:</strong> ${player.height}</p>
                <p><strong>Weight:</strong> ${player.weight}</p>
                <p><strong>Birthplace:</strong> ${player.birthplace}</p>
                <p><strong>Appearances:</strong> ${player.appearances}</p>
                <p><strong>Goals:</strong> ${player.goals}</p>
                <p><strong>Assists:</strong> ${player.assists}</p>
                <p><strong>Clean Sheets:</strong> ${player.clean_sheets}</p>
                <p><strong>Saves:</strong> ${player.saves}</p>
                <p><strong>Club Since:</strong> ${player.club_since}</p>
                <p><strong>Previous Clubs:</strong> ${player.previous_clubs}</p>

                <a href="players.html" class="btn">BACK TO PLAYERS</a>

            </div>
        `;
    })
    .catch(error => {
        console.log(error);
    });