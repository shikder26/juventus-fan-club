window.onload = () => {
    fetch('data/players.json')
        .then(response => response.json())
        .then(data => {
            const playersDiv = document.getElementById('players');
            playersDiv.innerHTML = '';

            let playersToShow = data;

            // Home page shows only 4 players
            if (document.title === "Juventus Fan Club Website") {
                playersToShow = data.slice(0, 4);
            }

            // Players page shows all players
            playersToShow.forEach(player => {
                const div = document.createElement('div');
                div.className = 'player';

                div.innerHTML = `
                    ${player.image ? `<img class="player-photo" src="${player.image}" alt="${player.player}" loading="lazy">` : ''}

                    <h3>${player.player}</h3>

                    <p>${player.position}</p>

                    <p>
                        ${player.flag ? `<img class="flag" src="${player.flag}" alt="${player.nationality}">` : ''}
                        ${player.nationality}
                    </p>
                `;

                div.onclick = () => {
                    window.location = 'player.html?id=' + player.id;
                };

                playersDiv.appendChild(div);
            });
        })
        .catch(error => {
            console.log(error);
        });
};