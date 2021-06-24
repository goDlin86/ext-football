chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {
    const matchesEl = document.querySelectorAll('.game')

    const resp = await fetch(
        'https://api.football-data.org/v2/competitions/EC/matches', 
        { headers: { 'X-Auth-Token': football_api_token } }
    )
    const data = await resp.json()
    const matches = data.matches.filter(m => m.matchday > 3)

    matches.map((match, i) => {
        const teamsEl = matchesEl[i].querySelector('.teams')
        const teams = teamsEl.innerText.split(' - ')

        teamsEl.innerText = (match.homeTeam.name || teams[0]) + ' - ' + (match.awayTeam.name || teams[1])

        if (match.score.fullTime.homeTeam) {
            teamsEl.innerText += match.score.fullTime.homeTeam + ' - ' + match.score.fullTime.awayTeam
        }
        if (match.score.extraTime.homeTeam) {
            teamsEl.innerText += '(' + match.score.extraTime.homeTeam + ' - ' + match.score.extraTime.awayTeam + ')'
        }
    })
})
