chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {
    const el = document.querySelector('.table')

    const resp = await fetch(
        'https://api.football-data.org/v2/competitions/CL/matches',
        { headers: { 'X-Auth-Token': football_api_token } }
    )
    const data = await resp.json()

    for (let index = 0; index < 16; index++) {
        el.innerHTML += '<div class="group">' + data.matches[index].homeTeam.name + ' - ' + data.matches[index].awayTeam.name + '</div>'
    }
})