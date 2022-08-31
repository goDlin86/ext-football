import React, { useEffect, useState } from 'react'

import BackButton from '../home/BackButton'

import './style.css'

export default function RuCup22 () {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        chrome.storage.local.get(['api_sports'], async ({ api_sports }) => {
            const resp = await fetch(
                'https://v3.football.api-sports.io/fixtures?league=237&season=2022',
                {
                    'method': 'GET',
                    'headers': {
                        'x-rapidapi-host': 'v3.football.api-sports.io',
                        'x-rapidapi-key': api_sports
                    }
                }
            )
            const data = await resp.json()
            
            console.log(data)

            setMatches(data.response)
        })
    }

    return (
        <div class="rucup">
            <BackButton />
            <div class="rucup-logo" />
            <div class="rucup-container">
                <div class="rucup-table">
                    {matches.map(m => (
                        <>
                            <div class="ru-leftteam">{m.teams.home.name}</div>
                            <div><img src={m.teams.home.logo} width="30" height="30" /></div>
                            <div>{m.score.fulltime.home}</div>
                            <div>-</div>
                            <div>{m.score.fulltime.away}</div>
                            <div><img src={m.teams.away.logo } width="30" height="30" /></div>
                            <div class="ru-rightteam">{m.teams.away.name}</div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}