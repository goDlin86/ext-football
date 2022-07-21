import React, { useEffect, useState } from 'react'
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
                'https://api.football-data.org/v4/competitions/WC/matches',//?season=2022
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

            <img src={new URL('./logo.webp', import.meta.url)} alt="logo" />
            <h1>World Cup 2022</h1>
        </div>
    )
}