document.getElementById('playerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    // Fetch player ID
    const playerResponse = await fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName} ${lastName}`);
    const playerData = await playerResponse.json();

    if (playerData.data.length === 0) {
        document.getElementById('stats').innerHTML = `<p>Player not found.</p>`;
        return;
    }

    const playerId = playerData.data[0].id;

    // Fetch player stats
    const statsResponse = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`);
    const statsData = await statsResponse.json();

    if (statsData.data.length === 0) {
        document.getElementById('stats').innerHTML = `<p>No stats available for this player.</p>`;
        return;
    }

    const stats = statsData.data[0];

    // Display stats
    document.getElementById('stats').innerHTML = `
        <h2>${firstName} ${lastName}'s Stats</h2>
        <p>Points Per Game: ${stats.pts}</p>
        <p>Rebounds Per Game: ${stats.reb}</p>
        <p>Assists Per Game: ${stats.ast}</p>
        <p>Steals Per Game: ${stats.stl}</p>
        <p>Blocks Per Game: ${stats.blk}</p>
        <p>Field Goal Percentage: ${stats.fg_pct}%</p>
        <p>Three-Point Percentage: ${stats.fg3_pct}%</p>
        <p>Free Throw Percentage: ${stats.ft_pct}%</p>
    `;
});