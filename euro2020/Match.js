import React from 'react'

export default function Match ({ m, i, match, minI, final}) {
    let teams = m.homeTeam + ' - ' + m.awayTeam
    if (match) {
        teams = match.homeTeam.name + ' - ' + match.awayTeam.name

        if (match.score.fullTime.homeTeam !== null)
            teams += ' ' + match.score.fullTime.homeTeam + ' - ' + match.score.fullTime.awayTeam

        if (match.score.extraTime.homeTeam !== null)
            teams += ' (' + match.score.extraTime.homeTeam + ' - ' + match.score.extraTime.awayTeam + ')'
    }

    return (
        <div class={ i<=minI ? "game" : final ? "game final" : "game right"}>
            <div class="date">{m.time}</div>
            <div class="teams">{teams}</div>
            <div class="town">{m.stadium}</div>
        </div>
    )
}