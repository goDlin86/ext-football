import React from 'react'
import MatchInfo from './MatchInfo'
import { groups } from './Groups'
import GroupInfo from './GroupInfo'
import GroupStage from './GroupStage'
import { groupBy, matchesInfo } from './helpers'

export default function GroupView ({ matches, season }) {
    //const currentMatchday = matches[0].season.currentMatchday
    //const matches = matches.filter(m => m.matchday >= currentMatchday)
    
    const groupsResult = matchesInfo(matches.slice(93, 93+16*6))
    const groupsTable = []
    const groupsYear = groups.find(g => g.year === season)
    if (groupsYear) {
        groupsYear.groups.forEach(g => {
            const commands = []
            for (let index = 0; index < 4; index++) {
                const i = groupsResult.findIndex(r => r.team === g.commands[index])
                if (i >= 0) {
                    commands.push(groupsResult[i])
                } else {
                    commands.push({
                        team: g.commands[index],
                        points: 0,
                        plays: 0, 
                        plusminus: 0,
                        goals: 0
                    })
                }
            }

            groupsTable.push({title: g.title, commands})
        })
    }
    groupsTable.map(g => {
        g.commands = g.commands.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))
        return g
    })
    console.log(groupsTable)

    const matchesByDay = groupBy(matches.slice(93, 93+16*6), 'matchday', 'utcDate')
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