import React, { useEffect, useState } from 'react'
import BackButton from '../home/BackButton'

import classNames from 'classnames'
import * as cheerio from 'cheerio'

import './style.css'

export default function RuCup ({ season }) {
    const [matches, setMatches] = useState([])
    const [activeTeam, setTeam] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const r = await fetch('https://www.rfs.ru/cup/tournament/matches/rpl?TournamentMatchesFilter%5Bdate%5D=all')
        const $ = await cheerio.load(await r.text())

        const matches = $('.bet-tournament-region__item').toArray().map((item) => ({
            date: $(item).find('.bet-tournament__date').text(),
            matches: $(item).find('.tour-match').toArray().map((match) => ({
                home: $(match).find('.tour-match__team.first > .tour-match__name').text().replace(/\s+/g, ' ').trim(),
                homeLogo: $(match).find('.tour-match__team.first > .tour-match__logo img').attr('src'),
                away: $(match).find('.tour-match__team.last > .tour-match__name').text().replace(/\s+/g, ' ').trim(),
                awayLogo: $(match).find('.tour-match__team.last > .tour-match__logo img').attr('src'),
                score: $(match).find('.tour-match__score').text().replace(/\s+/g, ' ').trim()
            }))
        }))

        setMatches(matches.reduce((result, item, index) => {
            const i = result.findIndex(r => r.date === item.date)
            if (i >= 0) {
                result[i].matches.push(...item.matches)
            } else {
                result.push(item)
            }

            return result
        }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
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
                    {matches.map(match => (
                        <>
                            <div class="ru-scheduled">
                                {match.date}
                            </div>
                            {match.matches.filter(m => activeTeam === null || m.home === activeTeam || m.away === activeTeam).map(m => (
                                <>
                                    <div class={classNames('ru-leftteam', 'clicked', { active: m.home === activeTeam })} onClick={() => selectTeam(m.home)}>
                                        {m.home}
                                    </div>
                                    <div><img src={m.homeLogo} width="30" height="30" /></div>
                                    <div>{m.score}</div>
                                    <div><img src={m.awayLogo } width="30" height="30" /></div>
                                    <div class={classNames('ru-rightteam', 'clicked', { active: m.away === activeTeam})} onClick={() => selectTeam(m.away)}>
                                        {m.away}
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