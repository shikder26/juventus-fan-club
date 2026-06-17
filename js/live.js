const API_KEY = "9349f2f8764fe71ae3b2d94606bb29b6";
const TEAM_ID = 496;

const FOOTBALL_DATA_KEY = "13656df1f1fd4fed9190ce63e66e40f1";
const FOOTBALL_DATA_TEAM_ID = 109;

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
            showNoLiveMatch();
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
                <p>${match.fixture.status.elapsed || 0}' - ${match.fixture.status.long}</p>
            </div>

            <div class="live-team">
                <img src="${match.teams.away.logo}" alt="${match.teams.away.name}">
                <h3>${match.teams.away.name}</h3>
            </div>
        `;

        loadMatchEvents(match.fixture.id);

    } catch (error) {
        showNoLiveMatch();
        console.error("API-Football live error:", error);
    }
}

function showNoLiveMatch() {
    liveScoreBox.innerHTML = `
        <div class="score-box">
            <span class="live-badge">NO LIVE MATCH</span>
            <h1>0 - 0</h1>
            <p>Juventus is not playing live right now.</p>
        </div>
    `;

    updatesBox.innerHTML = `<p>No live match updates available right now.</p>`;
}

async function loadNextMatch() {
    try {
        await loadNextMatchFromFootballData();
    } catch (error) {
        console.log("Football-Data failed. Trying API-Football...");
        try {
            await loadNextMatchFromApiFootball();
        } catch (secondError) {
            console.log("API-Football failed. Loading local JSON...");
            await loadNextMatchFromJson();
        }
    }
}

async function loadNextMatchFromFootballData() {
    const response = await fetch(
        `https://api.football-data.org/v4/teams/${FOOTBALL_DATA_TEAM_ID}/matches?status=SCHEDULED&limit=5`,
        {
            method: "GET",
            headers: {
                "X-Auth-Token": FOOTBALL_DATA_KEY
            }
        }
    );

    const data = await response.json();

    if (!data.matches || data.matches.length === 0) {
        throw new Error("No Football-Data fixtures found");
    }

    const match = data.matches[0];
    const matchDate = new Date(match.utcDate);

    nextMatchBox.innerHTML = `
        <p><strong>Fixture:</strong> ${match.homeTeam.name} vs ${match.awayTeam.name}</p>
        <p><strong>Date:</strong> ${matchDate.toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        <p><strong>Competition:</strong> ${match.competition.name}</p>
        <p><strong>Status:</strong> Upcoming</p>
        <a href="matches.html" class="btn">VIEW MATCHES</a>
    `;
}

async function loadNextMatchFromApiFootball() {
    const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&next=1`,
        {
            method: "GET",
            headers: {
                "x-apisports-key": API_KEY
            }
        }
    );

    const data = await response.json();

    if (!data.response || data.response.length === 0) {
        throw new Error("No API-Football fixture found");
    }

    const match = data.response[0];
    const matchDate = new Date(match.fixture.date);

    nextMatchBox.innerHTML = `
        <p><strong>Fixture:</strong> ${match.teams.home.name} vs ${match.teams.away.name}</p>
        <p><strong>Date:</strong> ${matchDate.toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        <p><strong>Venue:</strong> ${match.fixture.venue.name || "Not confirmed"}</p>
        <p><strong>Status:</strong> Upcoming</p>
        <a href="matches.html" class="btn">VIEW MATCHES</a>
    `;
}

async function loadNextMatchFromJson() {
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
        console.error("Match events error:", error);
    }
}

loadLiveScore();
loadNextMatch();

/* Keep this off to avoid 429 Too Many Requests */
// setInterval(loadLiveScore, 60000);