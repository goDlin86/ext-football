import React, { useEffect, useState } from 'react'
import BackButton from '../home/BackButton'

import classNames from 'classnames'

import CyrillicToTranslit from 'cyrillic-to-translit-js'
const cyrillicToTranslit = new CyrillicToTranslit()

import './style.css'

export default function RuCup22 () {
    const [matches, setMatches] = useState([])
    const [activeTeam, setTeam] = useState(null)

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

            setMatches(data.response
                .filter(m => m.league.round.includes('Premier League Path'))
                .reduce((result, item, index) => {
                    const i = result.findIndex(r => r.round === Math.ceil((index+1)/8))
                    if (i >= 0) {
                        result[i].matches.push(item)
                    } else {
                        result.push({ round: Math.ceil((index+1)/8), matches: [item] })
                    }

                    return result
                }, [])
            )
        })
    }

    const selectTeam = (team) => {
        setTeam(team !== activeTeam ? team : null)
    }

    return (
        <div class="rucup">
            <BackButton />
            <div class="rucup-logo" />
            <div class="rucup-container">
                <div class="rucup-table">
                    {matches.map(r => (
                        <>
                            <div class="ru-title">{r.round + ' тур'}</div>
                            {r.matches.filter(m => activeTeam === null || m.teams.home.name === activeTeam || m.teams.away.name === activeTeam).map(m => (
                                <>
                                    <div class="ru-scheduled">
                                        {new Date(m.fixture.date).toLocaleDateString('ru-RU', { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div class={classNames('ru-leftteam', 'clicked', {active: m.teams.home.name === activeTeam})} onClick={() => selectTeam(m.teams.home.name)}>
                                        {cyrillicToTranslit.reverse(m.teams.home.name)}
                                    </div>
                                    <div><img src={m.teams.home.logo} width="30" height="30" /></div>
                                    <div>{m.score.fulltime.home}</div>
                                    <div>-</div>
                                    <div>{m.score.fulltime.away}</div>
                                    <div><img src={m.teams.away.logo } width="30" height="30" /></div>
                                    <div class={classNames('ru-rightteam', 'clicked', {active: m.teams.away.name === activeTeam})} onClick={() => selectTeam(m.teams.away.name)}>
                                        {cyrillicToTranslit.reverse(m.teams.away.name)}
                                    </div>
                                </>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}