import React from 'react'
import LeagueInfo from './LeagueInfo'
import MatchesByDay from './MatchesByDay'
import { matchesInfo } from '../../championsleague/components/helpers'

export default function LeagueView ({ matches }) {   
    const results = matchesInfo(matches)
    const leagueTable = results.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))

    const matchesByDay = Object.groupBy(matches, m => m.league.round)
    for (const r in matchesByDay) {
        matchesByDay[r] = Object.groupBy(matchesByDay[r], m => m.fixture.date)
    }

    return (
        <>
            <LeagueInfo league={leagueTable} />
            <MatchesByDay matchesByDay={matchesByDay} />
        </>
    )
}