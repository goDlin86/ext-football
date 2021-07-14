chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {
    const el = document.querySelector('.table')

    const resp = await fetch(
        'https://api.football-data.org/v2/competitions/CL/matches',
        { headers: { 'X-Auth-Token': football_api_token } }
    )
    const data = await resp.json()
    console.log(data)
    let matchesByDate = data.matches.map(m => m.utcDate)
    matchesByDate = [...new Set(matchesByDate)]
    matchesByDate = matchesByDate.map(date => ({ date, matches: data.matches.filter(m => m.utcDate === date) }))

    matchesByDate.map(date => {
        el.innerHTML += '<div class="date">' + date.date + '</div>'
        date.matches.map(match => {
            el.innerHTML += '<div class="group">' + match.homeTeam.name + ' - ' + match.awayTeam.name + '</div>'
        })
    })
})