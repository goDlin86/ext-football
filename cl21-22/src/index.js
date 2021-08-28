import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import MatchInfo from './components/MatchInfo'
import { groups } from './components/Groups'
import GroupInfo from './components/GroupInfo'


const App = () => {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {       
            const resp = await fetch(
                'https://api.football-data.org/v2/competitions/CL/matches',
                { headers: { 'X-Auth-Token': football_api_token } }
            )
            const data = await resp.json()
            console.log(data)

            if (data.count > 0) {
                const currentMatchday = data.matches[0].season.currentMatchday
                //const matches = data.matches.filter(m => m.matchday >= currentMatchday)
                const matches = data.matches.slice(data.matches.findIndex(m => m.matchday === currentMatchday))

                const matchesByDay = groupBy(matches, 'matchday')
                //console.log(matchesByDay)

                setMatches(matchesByDay)
            }
        })
    }

    const groupBy = (items, key) => items.reduce(
        (result, item) => {
            const i = result.findIndex(r => r[key] === item[key])
            if (i >= 0) {
                result[i].matches.push(item)
            } else {
                result.push({ [key]: item[key], matches: [item] })
            }
            return result
        }, 
        []
    )

    const groupInfo = (items) => items.reduce(
        (result, item) => {
            const homeTeam = { 
                team: item.homeTeam.name,
                points: item.score.fullTime.homeTeam > item.score.fullTime.awayTeam ? 3 : item.score.fullTime.homeTeam < item.score.fullTime.awayTeam ? 0 : 1,
                plays: 1, 
                plusminus: item.score.fullTime.homeTeam - item.score.fullTime.awayTeam,
                goals: item.score.fullTime.homeTeam
            }
            const awayTeam = { 
                team: item.awayTeam.name,
                points: item.score.fullTime.awayTeam > item.score.fullTime.homeTeam ? 3 : item.score.fullTime.awayTeam < item.score.fullTime.homeTeam ? 0 : 1,
                plays: 1, 
                plusminus: item.score.fullTime.awayTeam - item.score.fullTime.homeTeam,
                goals: item.score.fullTime.awayTeam
            }

            let i = result.findIndex(r => r.team === homeTeam.team)
            if (i >= 0) {
                result[i].points += homeTeam.points
                result[i].plays += homeTeam.plays
                result[i].plusminus += homeTeam.plusminus
                result[i].goals += homeTeam.goals
            } else {
                result.push(homeTeam)
            }
            
            i = result.findIndex(r => r.team === awayTeam.team)
            if (i >= 0) {
                result[i].points += awayTeam.points
                result[i].plays += awayTeam.plays
                result[i].plusminus += awayTeam.plusminus
                result[i].goals += awayTeam.goals
            } else {
                result.push(awayTeam)
            }

            return result
        },
        []
    )

    return (
        <>
            {/* {matches.map(m => (
                <div className='grid'>
                    <div className='match matchday'>{'Matchday ' + m.matchday}</div>
                    {m.matches.map(match => <MatchInfo match={match} />)}
                </div>
            ))} */}
            <div className='grid'>
                {
                    groups.map(group => <GroupInfo group={group}/>)
                }
            </div>
        </>
    )
}

render(<App />, document.getElementById('table'))