import React from 'react'
import GroupStage from './GroupStage'
import { groupBy } from './helpers'

export default function PlayoffView ({ matches }) {            
    const matchesByDay = groupBy(matches, 'matchday', 'utcDate')

    return (
        <>
            {matchesByDay.map(m => <GroupStage stage={m} />)}
        </>
    )
}