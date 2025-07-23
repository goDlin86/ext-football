import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import classNames from 'classnames'

import BackButton from '../home/BackButton'
import StageView from './StageView'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.locale('ru')
dayjs.extend(utc)
dayjs.extend(timezone)

import './style.css'

export default function RuLeague () {
    const [data, setData] = useState([])
    const [clubs, setClubs] = useState([])
    const [table, setTable] = useState([])
    const [team, setTeam] = useState(null)
    const [stage, setStage] = useState(null)

    const ref = useRef(null)

    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        ref.current && ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [team])

    const fetchData = async () => {
        const r = await fetch(
            'https://api.premierliga.ru/api/getClubs', 
            { 
                method: 'POST', 
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ tournament: null }),
            }
        )
        const clubs = await r.json()
        setClubs(clubs)

        const resp = await fetch(
            'https://api.premierliga.ru/api/getMatches',
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ tournament: 722 })
            }
        )
        const data = await resp.json()
        const dataMatches = data.reduce((result, item) => result.concat(item.matches), [])

        setStage(data.findIndex(d => d.matches.sort((a, b) => new Date(a.date) - new Date(b.date))[7].status < 4)) //last match not ended
        setData(data)
    
        const t = dataMatches.reduce((result, item) => {
            let i = result.findIndex(r => r.club === item.clubH)
            if (i < 0) {
                result.push({
                    name: clubs.find(c => c.id === item.clubH).name,
                    logo: clubs.find(c => c.id === item.clubH).logo,
                    club: item.clubH,
                    plays: 0,
                    w: 0,
                    d: 0,
                    l: 0,
                    z: 0,
                    p: 0,
                    points: 0
                })
                i = result.length - 1
            }
            
            if (item.goalH !== null) {
                result[i].plays += 1
                result[i].w += item.goalH > item.goalA ? 1 : 0
                result[i].d += item.goalH == item.goalA ? 1 : 0
                result[i].l += item.goalH < item.goalA ? 1 : 0
                result[i].z += parseInt(item.goalH)
                result[i].p += parseInt(item.goalA)
                result[i].points += item.goalH > item.goalA ? 3 : item.goalH < item.goalA ? 0 : 1
            }

            i = result.findIndex(r => r.club === item.clubA)
            if (i < 0) {
                result.push({
                    name: clubs.find(c => c.id === item.clubA).name,
                    logo: clubs.find(c => c.id === item.clubA).logo,
                    club: item.clubA,
                    plays: 0,
                    w: 0,
                    d: 0,
                    l: 0,
                    z: 0,
                    p: 0,
                    points: 0
                })
                i = result.length - 1
            }
            
            if (item.goalA !== null) {
                result[i].plays += 1
                result[i].w += item.goalA > item.goalH ? 1 : 0
                result[i].d += item.goalA == item.goalH ? 1 : 0
                result[i].l += item.goalA < item.goalH ? 1 : 0
                result[i].z += parseInt(item.goalA)
                result[i].p += parseInt(item.goalH)
                result[i].points += item.goalA > item.goalH ? 3 : item.goalA < item.goalH ? 0 : 1
            }

            return result
        }, [])

        setTable(t.sort((a, b) => (b.points - a.points) || ((b.z - b.p) - (a.z - a.p)) || (b.z - a.z) || (a.plays - b.plays)))
    }

    return (
        <div class="ru-league">
            <BackButton />
            <div class="ru-logo" />
            <div class="ru-container">
                <div class="ru-table">
                    <div class="header">
                        <div>МЕСТО</div>
                        <div class="name">КОМАНДА</div>
                        <div>И</div>
                        <div>В</div>
                        <div>Н</div>
                        <div>П</div>
                        <div>З-П</div>
                        <div>ОЧКОВ</div>
                    </div>
                    {table.map((c, i) => (
                        <div class={classNames('rowWrapper', { active: team === c.club })} onClick={() => setTeam(c.club)}>
                            <div>{i+1}</div>
                            <div class="name"><img src={c.logo} width="30" height="30" />{c.name}</div>
                            <div>{c.plays}</div>
                            <div>{c.w}</div>
                            <div>{c.d}</div>
                            <div>{c.l}</div>
                            <div>{c.z + ' - ' + c.p}</div>
                            <div>{c.points}</div>
                        </div>
                    ))}
                </div>

                {data.length > 0 && <StageView data={data} stage={stage} clubs={clubs} />}

                {team && 
                <div class="ru-matches" ref={ref}>
                    <div class="ru-title">Расписание матчей для команды <span class="ru-bold">{clubs.find(c => c.id === team).name}</span></div>
                    {data.reduce((result, item) => result.concat(item.matches), []).filter(m => m.clubH === team || m.clubA === team).map((m, i) => (
                        <div class={classNames('ru-match', {
                            win: (m.goalH !== '' && m.goalA !== '') && ((m.clubH === team && m.goalH > m.goalA) || (m.clubA === team && m.goalA > m.goalH)),
                            lose: (m.goalH !== '' && m.goalA !== '') && ((m.clubH === team && m.goalH < m.goalA) || (m.clubA === team && m.goalA < m.goalH)),
                            draw: (m.goalH !== '' && m.goalA !== '') && m.goalH === m.goalA
                        })}>
                            <div>{(i + 1) + ' тур'}</div>
                            <div class="ru-date">{dayjs.tz(m.date, 'Europe/Moscow').format('DD MMM, ddd, HH:mm')}</div>
                            <div class="ru-score">
                                <div class={classNames({ 'ru-bold': m.clubH === team })}>{clubs.find(c => c.id === m.clubH).name}</div>
                                <div class={classNames({ 'ru-bold': m.clubA === team })}>{clubs.find(c => c.id === m.clubA).name}</div>
                                {m.goalH === null && m.goalA === null ?
                                    <div class="ru-scheduled">Не начался</div> :
                                    <>
                                        <div>{m.goalH}</div>
                                        <div>{m.goalA}</div>
                                    </>
                                }
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}