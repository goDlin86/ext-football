import React from 'react'
import LeagueInfo from './LeagueInfo'
import MatchesByDay from './MatchesByDay'
import { matchesInfoNew } from '../../championsleague/components/helpers'

export default function LeagueView ({ matches }) {
    const results = matchesInfoNew(matches)
    const leagueTable = results.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))

    return (
        <>
            <LeagueInfo league={leagueTable} />
            <MatchesByDay matches={matches} />
        </>
    )
}