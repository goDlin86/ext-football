import React, { useEffect, useState } from 'react'
import MatchInfo from './MatchInfo'
import { groups } from './Groups'
import GroupInfo from './GroupInfo'
import GroupStage from './GroupStage'
import { groupBy, groupInfo } from './helpers'

export default function GroupView () {
    const [groupsInfo, setGroups] = useState([])
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {       
            const resp = await fetch(
                'https://api.football-data.org/v4/competitions/CL/matches',
                { headers: { 'X-Auth-Token': football_api_token } }
            )
            const data = await resp.json()
            //console.log(data)

            if (data.resultSet.count > 0) {
                //const currentMatchday = data.matches[0].season.currentMatchday
                //const matches = data.matches.filter(m => m.matchday >= currentMatchday)
                const matches = data.matches.slice(93, 93+16*6)
                
                const groupsResult = groupInfo(matches)
                const groupsTable = []
                groups.forEach(g => {
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
                groupsTable.map(g => {
                    g.commands = g.commands.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))
                    return g
                })
                console.log(groupsTable)

                const matchesByDay = groupBy(matches, 'matchday', 'utcDate')
                //console.log(matchesByDay)

                setGroups(groupsTable)
                setMatches(matchesByDay)
            }
        })
    }

    return (
        <>
            <div className='grid'>
                {groupsInfo.map(group => <GroupInfo group={group}/>)}
            </div>

            {/* {matches.map(m => (
                <div className='grid'>
                    <div className='match matchday'>{'Matchday ' + m.matchday}</div>
                    {m.matches.map(match => <MatchInfo match={match} />)}
                </div>
            ))} */}

            {matches.map(m => <GroupStage stage={m} />)}
        </>
    )
}