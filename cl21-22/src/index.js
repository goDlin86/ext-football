import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import MatchInfo from './components/MatchInfo'
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

            if (data.count > 0) {
                const currentMatchday = data.matches[0].season.currentMatchday
                const matches = data.matches.filter(m => m.matchday >= currentMatchday)

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

    return (
        <>
            {matches.map(m => (
                <div className='grid'>
                    <div className='match matchday'>{'Matchday ' + m.matchday}</div>
                    {m.matches.map(match => <MatchInfo match={match} />)}
                </div>
            ))}
            <div className='grid'>
                <GroupInfo />
            </div>
        </>
    )
}

render(<App />, document.getElementById('table'))