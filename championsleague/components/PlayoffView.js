import React from 'react'
import GroupStage from './GroupStage'
import { groupBy } from './helpers'

export default function PlayoffView ({ matches }) {            
    const matchesByDay = groupBy(matches.slice(93+16*6), 'matchday', 'utcDate')

    return (
        <>
            {matchesByDay.map(m => <GroupStage stage={m} />)}
        </>
    )
}