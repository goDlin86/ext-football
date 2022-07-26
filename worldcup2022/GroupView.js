import React from 'react'
import { matchesInfo } from '../championsleague/components/helpers'

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

    //const matchesByDay = groupBy(matches, 'matchday', 'utcDate')
    //console.log(matchesByDay)


    return (
        <>
            <div className="grid">
                {groupsTable.map(group => (
                    <div className="worldgroup">
                        <div>{group.title}</div>
                        <div className="gridgroup">
                            {group.commands.map(c => (
                                <>
                                    <div><img src={c.crest} width="30" height="30" />{c.team}</div>
                                    <div>{c.plays}</div>
                                    <div>{c.points}</div>
                                </>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}