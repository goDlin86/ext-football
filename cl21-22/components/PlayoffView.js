import React, { useEffect, useState } from 'react'
import GroupStage from './GroupStage'
import { groupBy } from './helpers'

export default function PlayoffView () {
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
            //console.log(data)

            if (data.count > 0) {
                const currentMatchday = data.matches[0].season.currentMatchday
                //const matches = data.matches.filter(m => m.matchday >= currentMatchday)
                const matches = data.matches.slice(93+16*6)
                
                const matchesByDay = groupBy(matches, 'matchday', 'utcDate')
                //console.log(matchesByDay)

                setMatches(matchesByDay)
            }
        })
    }

    return (
        <>
            {matches.map(m => <GroupStage stage={m} />)}
        </>
    )
}