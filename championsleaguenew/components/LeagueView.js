import React from 'react'
import LeagueInfo from './LeagueInfo'
import MatchesByDay from './MatchesByDay'
import { matchesInfoNew } from '../../championsleague/components/helpers'
import dayjs from 'dayjs'

export default function LeagueView ({ matches }) {   
    const results = matchesInfoNew(matches)
    const leagueTable = results.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))

    const matchesByDay = matches.reduce((acc, item, index) => {
        const chunkIndex = Math.floor(index / 18)
        
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = []
        }
        
        acc[chunkIndex].push(item)
        return acc
        }, []
    )
    for (const r in matchesByDay) {
        matchesByDay[r] = Object.groupBy(matchesByDay[r], m => m.date)
    }

    return (
        <>
            <LeagueInfo league={leagueTable} />
            <MatchesByDay matchesByDay={matchesByDay} />
        </>
    )
}