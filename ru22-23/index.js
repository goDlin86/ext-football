import React, { useEffect, useState } from 'react'
import BackButton from '../home/BackButton'
import './style.css'

export default function RuLeague22 () {
    const [matches, setMatches] = useState([])
    const [table, setTable] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

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

        setTable(t)
        
        //setMatches()
    }

    return (
        <div class="ru-league">
            <BackButton />
            <div class="ru-logo"></div>
            <div class="ru-container">
                <div class="ru-table">
                    <div class="header">МЕСТО</div>
                    <div class="header name">КОМАНДА</div>
                    <div class="header">И</div>
                    <div class="header">В</div>
                    <div class="header">Н</div>
                    <div class="header">П</div>
                    <div class="header">З-П</div>
                    <div class="header">ОЧКОВ</div>
                    {table.map((c, i) => (
                        <>
                            <div>{i+1}</div>
                            <div class="name"><img src={c.club} width="30" height="30" />{c.name}</div>
                            <div>{c.plays}</div>
                            <div>{c.w}</div>
                            <div>{c.d}</div>
                            <div>{c.l}</div>
                            <div>{c.z + ' - ' + c.p}</div>
                            <div>{c.points}</div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}