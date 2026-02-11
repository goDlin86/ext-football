import React from 'react'
import MatchesByDay from './MatchesByDay'

export default function PlayoffView ({ matches }) {     
    const matchesByDay = Object.groupBy(matches, m => m.league.round) 
    for (const r in matchesByDay) {
        matchesByDay[r] = Object.groupBy(matchesByDay[r], m => m.fixture.date)
    }

    return <MatchesByDay matchesByDay={matchesByDay} />
}