import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import classNames from 'classnames'

import BackButton from '../home/BackButton'
import StageView from './StageView'

import './style.css'

export default function RuLeague22 () {
    const [matches, setMatches] = useState([])
    const [table, setTable] = useState([])
    const [team, setTeam] = useState(null)

    const ref = useRef(null)

    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        ref.current && ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [team])

    const fetchData = async () => {
        const resp = await fetch(
            'https://premierliga.ru/ajax/match/', 
            {
                'headers': {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'body': 'ajaxAction=getHeaderCalendar&tournament=1',
                'method': 'POST'
            }
        )
        const data = await resp.json()
        
        console.log(data)

        setMatches(data.contents)
     
        const t = data.contents.reduce((result, item) => {
            let i = result.findIndex(r => r.name === item.name1)
            if (i < 0) {
                result.push({
                    name: item.name1,
                    club: item.club1,
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
            
            if (item.goal1 !== '') {
                result[i].plays += 1
                result[i].w += item.goal1 > item.goal2 ? 1 : 0
                result[i].d += item.goal1 == item.goal2 ? 1 : 0
                result[i].l += item.goal1 < item.goal2 ? 1 : 0
                result[i].z += item.goal1
                result[i].p += item.goal2
                result[i].points += item.goal1 > item.goal2 ? 3 : item.goal1 < item.goal2 ? 0 : 1
            }

            i = result.findIndex(r => r.name === item.name2)
            if (i < 0) {
                result.push({
                    name: item.name2,
                    club: item.club2,
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
            
            if (item.goal2 !== '') {
                result[i].plays += 1
                result[i].w += item.goal2 > item.goal1 ? 1 : 0
                result[i].d += item.goal2 == item.goal1 ? 1 : 0
                result[i].l += item.goal2 < item.goal1 ? 1 : 0
                result[i].z += item.goal2
                result[i].p += item.goal1
                result[i].points += item.goal2 > item.goal1 ? 3 : item.goal2 < item.goal1 ? 0 : 1
            }

            return result
        }, [])

        setTable(t.sort((a, b) => (b.points - a.points) || ((b.z - b.p) - (a.z - a.p)) || (b.z - a.z) || (a.plays - b.plays)))
    }

    return (
        <div class="ru-league">
            <BackButton />
            <div class="ru-logo"></div>
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
                        <div class={classNames('rowWrapper', { active: team === c.name })} onClick={() => setTeam(c.name)}>
                            <div>{i+1}</div>
                            <div class="name"><img src={c.club} width="30" height="30" />{c.name}</div>
                            <div>{c.plays}</div>
                            <div>{c.w}</div>
                            <div>{c.d}</div>
                            <div>{c.l}</div>
                            <div>{c.z + ' - ' + c.p}</div>
                            <div>{c.points}</div>
                        </div>
                    ))}
                </div>

                {matches.length > 0 && <StageView matches={matches} />}

                {team && 
                <div class="ru-matches" ref={ref}>
                    <div class="ru-title">Расписание матчей для команды <span class="ru-bold">{team}</span></div>
                    {matches.filter(m => m.name1 === team || m.name2 === team).map(m => (
                        <div class={classNames('ru-match', {
                            win: (m.goal1 !== '' && m.goal2 !== '') && ((m.name1 === team && m.goal1 > m.goal2) || (m.name2 === team && m.goal2 > m.goal1)),
                            lose: (m.goal1 !== '' && m.goal2 !== '') && ((m.name1 === team && m.goal1 < m.goal2) || (m.name2 === team && m.goal2 < m.goal1)),
                            draw: (m.goal1 !== '' && m.goal2 !== '') && m.goal1 === m.goal2
                        })}>
                            <div>{m.stageName}</div>
                            <div class="ru-date">{m.day + ', ' + m.time}</div>
                            <div class="ru-score">
                                <div class={classNames({ 'ru-bold': m.name1 === team })}>{m.name1}</div>
                                <div class={classNames({ 'ru-bold': m.name2 === team })}>{m.name2}</div>
                                {m.goal1 === '' && m.goal2 === '' ?
                                    <div class="ru-scheduled">Не начался</div> :
                                    <>
                                        <div>{m.goal1}</div>
                                        <div>{m.goal2}</div>
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