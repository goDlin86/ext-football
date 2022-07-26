import React, { useEffect, useState } from 'react'

import GroupView from './GroupView'
import BackButton from '../home/BackButton'

import './style.css'

export default function WorldCup () {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {
            const resp = await fetch(
                'https://api.football-data.org/v4/competitions/WC/matches',
                { headers: { 'X-Auth-Token': football_api_token } }
            )
            const data = await resp.json()
            console.log(data)

            setMatches(data.matches)
        })
    }

    return (
        <div class="worldcup">
            <BackButton />

            <div class="header">
                <img src={new URL('./logo.webp', import.meta.url)} alt="logo" />
            </div>
            
            <GroupView matches={matches.filter(m => m.stage === 'GROUP_STAGE')} />
        </div>
    )
}