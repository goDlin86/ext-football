import React, { useEffect, useState } from 'react'
import Match from './Match'
import BackButton from '../home/BackButton'
import './style.css'

export default function EURO2020 () {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {
            const resp = await fetch(
                'https://api.football-data.org/v4/competitions/EC/matches',//?season=2020
                { headers: { 'X-Auth-Token': football_api_token } }
            )
            const data = await resp.json()
            const matches = data.matches.filter(m => m.matchday > 3)

            setMatches(matches)
        })
    }

    return (
        <div class="grid-container8">
            <BackButton />
            {matchesInfo.quatro.map((m, i) => (
                <Match m={m} i={i} match={matches[i]} minI={3}/>
            ))}

            <div class="grid-container4">
                {matchesInfo.semi.map((m, i) => (
                    <Match m={m} i={i} match={matches[i+8]} minI={1}/>
                ))}

                <div class="grid-container2">
                    <div class="logo">
                        EURO2020 <span>play-off</span>
                    </div>
                    {matchesInfo.finals.map((m, i) => (
                        <Match m={m} i={i} match={matches[i+12]} minI={1} final={true}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

const matchesInfo = {
    quatro: [
        {
            time: '26 июня, сб 19:00',
            homeTeam: 'A2',
            awayTeam: 'B2',
            stadium: 'Amsterdam'
        },
        {
            time: '26 июня, сб 22:00',
            homeTeam: 'A1',
            awayTeam: 'C2',
            stadium: 'London'
        },
        {
            time: '27 июня, вс 19:00',
            homeTeam: 'C1',
            awayTeam: 'D/E/F3',
            stadium: 'Budapest'
        },
        {
            time: '27 июня, вс 22:00',
            homeTeam: 'B1',
            awayTeam: 'A/D/E/F3',
            stadium: 'Seville'
        },
        {
            time: '28 июня, пн 19:00',
            homeTeam: 'D2',
            awayTeam: 'E2',
            stadium: 'Copenhagen'
        },
        {
            time: '28 июня, пн 22:00',
            homeTeam: 'F1',
            awayTeam: 'A/B/C3',
            stadium: 'Bucharest'
        },
        {
            time: '29 июня, вт 19:00',
            homeTeam: 'D1',
            awayTeam: 'F2',
            stadium: 'London'
        },
        {
            time: '29 июня, вт 22:00',
            homeTeam: 'E1',
            awayTeam: 'A/B/C/D3',
            stadium: 'Glasgow'
        }
    ],

    semi: [
        {
            time: '2 июля, пт 19:00',
            homeTeam: 'Winner',
            awayTeam: 'Winner',
            stadium: 'St Petersburg'
        },
        {
            time: '2 июля, пт 22:00',
            homeTeam: 'Winner',
            awayTeam: 'Winner',
            stadium: 'Munich'
        },
        {
            time: '3 июля, сб 19:00',
            homeTeam: 'Winner',
            awayTeam: 'Winner',
            stadium: 'Baku'
        },
        {
            time: '3 июля, сб 22:00',
            homeTeam: 'Winner',
            awayTeam: 'Winner',
            stadium: 'Rome'
        },
    ],

    finals: [
        {
            time: '6 июля, вт 22:00',
            homeTeam: 'Winner',
            awayTeam: 'Winner',
            stadium: 'London'
        },
        {
            time: '7 июля, ср 22:00',
            homeTeam: 'Winner',
            awayTeam: 'Winner',
            stadium: 'London'
        },
        {
            time: '11 июля, вс 22:00',
            homeTeam: 'Winner',
            awayTeam: 'Winner',
            stadium: 'London'
        }
    ]
}