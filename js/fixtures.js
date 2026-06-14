const API_KEY = "9349f2f8764fe71ae3b2d94606bb29b6";
const TEAM_ID = 496;
const SEASON = 2025;

fetch(`https://v3.football.api-sports.io/fixtures?team=${TEAM_ID}&season=${SEASON}`, {
    method: "GET",
    headers: {
        "x-apisports-key": API_KEY
    }
})
.then(response => response.json())
.then(data => {
    console.log("Matches found:", data.response.length);
    const fixtureContainer = document.querySelector(".fixture-container");
    fixtureContainer.innerHTML = "";

    const today = new Date();

    const upcomingMatches = data.response
        .filter(match => new Date(match.fixture.date) > today)
        .slice(0, 3);

    if (upcomingMatches.length === 0) {
        fixtureContainer.innerHTML = "<p>No upcoming Juventus fixtures found.</p>";
        return;
    }

    upcomingMatches.forEach(match => {
        const home = match.teams.home;
        const away = match.teams.away;
        const matchDate = new Date(match.fixture.date);

        fixtureContainer.innerHTML += `
            <div class="fixture-card">
                <img src="${home.logo}" class="team-logo" alt="${home.name}">

                <div class="fixture-text">
                    <h3>${matchDate.toLocaleDateString()}</h3>
                    <p>${matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>${home.name} vs ${away.name}</p>
                </div>

                <img src="${away.logo}" class="team-logo" alt="${away.name}">
            </div>
        `;
    });
})
.catch(error => {
    console.log("Fixture API Error:", error);
});