const API_KEY = "9349f2f8764fe71ae3b2d94606bb29b6";
const TEAM_ID = 496;

const liveScoreBox = document.getElementById("live-score-box");
const nextMatchBox = document.getElementById("next-match-box");
const updatesBox = document.getElementById("updates-box");

async function loadLiveScore() {
    try {
        const response = await fetch(
            `https://v3.football.api-sports.io/fixtures?live=all&team=${TEAM_ID}`,
            {
                method: "GET",
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        const data = await response.json();

        if (!data.response || data.response.length === 0) {
            liveScoreBox.innerHTML = `
                <div class="score-box">
                    <span class="live-badge">NO LIVE MATCH</span>
                    <h1>0 - 0</h1>
                    <p>Juventus is not playing live right now.</p>
                </div>
            `;

            updatesBox.innerHTML = `<p>No live match updates available right now.</p>`;
            return;
        }

        const match = data.response[0];

        liveScoreBox.innerHTML = `
            <div class="live-team">
                <img src="${match.teams.home.logo}" alt="${match.teams.home.name}">
                <h3>${match.teams.home.name}</h3>
            </div>

            <div class="score-box">
                <span class="live-badge">LIVE</span>
                <h1>${match.goals.home} - ${match.goals.away}</h1>
                <p>${match.fixture.status.elapsed}' - ${match.fixture.status.long}</p>
            </div>

            <div class="live-team">
                <img src="${match.teams.away.logo}" alt="${match.teams.away.name}">
                <h3>${match.teams.away.name}</h3>
            </div>
        `;

        loadMatchEvents(match.fixture.id);

    } catch (error) {
        liveScoreBox.innerHTML = `<p>Unable to load live score.</p>`;
        updatesBox.innerHTML = `<p>Unable to load match updates.</p>`;
        console.error(error);
    }
}

async function loadNextMatch() {
    try {
        const response = await fetch("data/matches.json");
        const data = await response.json();

        if (!data || data.length === 0) {
            nextMatchBox.innerHTML = `<p>No fixture found.</p>`;
            return;
        }

        const match = data[0];

        nextMatchBox.innerHTML = `
            <p><strong>Fixture:</strong> ${match.homeTeam} vs ${match.awayTeam}</p>
            <p><strong>Date:</strong> ${match.date}</p>
            <p><strong>Time:</strong> ${match.time}</p>
            <p><strong>Venue:</strong> ${match.stadium}</p>
            <p><strong>Status:</strong> ${match.status}</p>
            <a href="matches.html" class="btn">VIEW MATCHES</a>
        `;

    } catch (error) {
        nextMatchBox.innerHTML = `<p>Unable to load next match.</p>`;
        console.error(error);
    }
}

async function loadMatchEvents(fixtureId) {
    try {
        const response = await fetch(
            `https://v3.football.api-sports.io/fixtures/events?fixture=${fixtureId}`,
            {
                method: "GET",
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        const data = await response.json();

        if (!data.response || data.response.length === 0) {
            updatesBox.innerHTML = `<p>No match events yet.</p>`;
            return;
        }

        updatesBox.innerHTML = "";

        data.response.forEach(event => {
            updatesBox.innerHTML += `
                <p>
                    <strong>${event.time.elapsed}'</strong>
                    ${event.team.name} - ${event.player.name || "Unknown player"}
                    (${event.type})
                </p>
            `;
        });

    } catch (error) {
        updatesBox.innerHTML = `<p>Unable to load match updates.</p>`;
        console.error(error);
    }
}

loadLiveScore();
loadNextMatch();

setInterval(loadLiveScore, 60000);