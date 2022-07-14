import React, { useEffect, useState } from 'react'
import GroupView from './components/GroupView'
import PlayoffView from './components/PlayoffView'
import BackButton from '../home/BackButton'
import './style.css'

export default function ChampLeague ({ season }) {
    const [stage, setStage] = useState(1)
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {       
            const resp = await fetch(
                'https://api.football-data.org/v4/competitions/CL/matches?season=' + season,
                { headers: { 'X-Auth-Token': football_api_token } }
            )
            const data = await resp.json()
            console.log(data)

            if (data.resultSet.count > 0) {              
                setMatches(data.matches)
            }
        })
    }

    return (
        <div class="league">
            <BackButton />
            <div class="cl-logo"></div>
            <div class="stage-container">
                <div class={stage === 0 ? "stage active" : "stage"} onClick={() => setStage(0)}>
                    Group Stage
                </div>
                <div class={stage === 1 ? "stage active" : "stage"} onClick={() => setStage(1)}>
                    Playoff Stage
                </div>
            </div>
            <div class="cl-container">
                {stage === 0 ? <GroupView matches={matches} season={season} /> : <PlayoffView matches={matches} />}
            </div>
        </div>
    )
}