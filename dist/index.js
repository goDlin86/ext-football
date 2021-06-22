(async () => {
    const resp = await fetch(
        'https://api.football-data.org/v2/competitions/EC/matches', 
        {
            headers: 
            {
                'X-Auth-Token': '994947add6bc4de2a5d132959acc7563'
            }
        }
    )
    const data = await resp.json()

    const matches = data.matches.filter(m => m.matchday > 3)

    const matchesEl = document.querySelectorAll('.game')

    matches.map((match, i) => {
        if (match.homeTeam.name) {
            matchesEl[i].querySelector('.teams').innerText = match.homeTeam.name + ' - ' + match.awayTeam.name

            if (match.score.fullTime.homeTeam) {
                matchesEl[i].querySelector('.teams').innerText += match.score.fullTime.homeTeam + ' - ' + match.score.fullTime.awayTeam
            }
        }
    })

})()
