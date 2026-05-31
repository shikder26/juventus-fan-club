window.onload = () => {

    fetch('data/matches.json')
        .then(response => response.json())
        .then(data => {

            const matchesDiv = document.getElementById('matches');

            matchesDiv.innerHTML = '';

            data.forEach(match => {

                matchesDiv.innerHTML += `
                    <div class="match-card">

                        <img src="${match.homeLogo}"
                             alt="${match.homeTeam}"
                             class="team-logo">

                        <div class="match-info">

                            <h3>${match.homeTeam} VS ${match.awayTeam}</h3>

                            <p><strong>Date:</strong> ${match.date}</p>

                            <p><strong>Time:</strong> ${match.time}</p>

                            <p><strong>Venue:</strong> ${match.stadium}</p>

                            <span class="match-status">
                                ${match.status}
                            </span>

                        </div>

                        <img src="${match.awayLogo}"
                             alt="${match.awayTeam}"
                             class="team-logo">

                    </div>
                `;
            });

        })
        .catch(error => {
            console.log(error);
        });

};