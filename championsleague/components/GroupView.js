import React from 'react'
import MatchInfo from './MatchInfo'
import GroupInfo from './GroupInfo'
import GroupStage from './GroupStage'
import { groupBy, matchesInfo } from './helpers'

export default function GroupView ({ matches }) {   
    const results = matchesInfo(matches)
    const groupsTable = results
        .reduce((result, item) => {
            const i = result.findIndex(r => r.title === item.group)
            if (i >= 0) {
                result[i].commands.push(item)
            } else {
                result.push({ title: item.group, commands: [item] })
            }
            return result
        }, [])
        .map(g => {
            g.commands = g.commands.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))
            return g
        })
        .sort((a, b) => a.title.localeCompare(b.title))
    console.log(groupsTable)

    const matchesByDay = groupBy(matches, 'matchday', 'utcDate')
    //console.log(matchesByDay)


    return (
        <>
            <div className='grid'>
                {groupsTable.map(group => <GroupInfo group={group}/>)}
            </div>

            {/* {matches.map(m => (
                <div className='grid'>
                    <div className='match matchday'>{'Matchday ' + m.matchday}</div>
                    {m.matches.map(match => <MatchInfo match={match} />)}
                </div>
            ))} */}

            {matchesByDay.map(m => <GroupStage stage={m} />)}
        </>
    )
}