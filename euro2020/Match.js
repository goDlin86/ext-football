import React from 'react'

export default function Match ({ m, i, match, minI, final}) {
    let teams = m.homeTeam + ' - ' + m.awayTeam
    if (match) {
        teams = match.homeTeam.name + ' - ' + match.awayTeam.name

        if ('fullTime' in match.score)
            teams += ' ' + match.score.fullTime.home + ' - ' + match.score.fullTime.away

        if ('extraTime' in match.score)
            teams += ' (' + match.score.extraTime.home + ' - ' + match.score.extraTime.away + ')'
    }

    return (
        <div class={ i<=minI ? "game" : final ? "game final" : "game right"}>
            <div class="date">{m.time}</div>
            <div class="teams">{teams}</div>
            <div class="town">{m.stadium}</div>
        </div>
    )
}