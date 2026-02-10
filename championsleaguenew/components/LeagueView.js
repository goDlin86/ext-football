import React from 'react'
import LeagueInfo from './LeagueInfo'
import GroupStage from '../../championsleague/components/GroupStage'
import { groupBy, matchesInfo } from '../../championsleague/components/helpers'

export default function LeagueView ({ matches }) {   
    const results = matchesInfo(matches)
    const leagueTable = results.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))
    console.log(leagueTable)

    const matchesByDay = groupBy(matches, 'league.round', 'fixture.date')
    console.log(matchesByDay)


    return (
        <>
            <div>
                {<LeagueInfo league={leagueTable}/>}
            </div>

            {matchesByDay.map(m => <GroupStage stage={m} />)}
        </>
    )
}