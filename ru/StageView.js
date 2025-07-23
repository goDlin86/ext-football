import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
// import 'dayjs/locale/ru'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
// dayjs.locale('ru')
// dayjs.extend(utc)
// dayjs.extend(timezone)

export default function StageView ({ data, stage, clubs }) {
    const [st, setStage] = useState(stage)
    const [filterMatches, setMatches] = useState([])

    useEffect(() => {
        setMatches(
            data[st].matches.reduce((result, item) => {
                const day = dayjs(item.date).format('DD MMM, dddd')
                const i = result.findIndex(r => r.day === day)
                if (i >= 0) {
                    result[i].matches.push(item)
                } else {
                    result.push({ day, matches: [item] })
                }
                return result
            }, [])
            .sort((a, b) => new Date(a.matches[0].date) - new Date(b.matches[0].date))
        )
    }, [st])

    return (
        <div class="ru-stage">
            <div class="ru-title ru-bold">
                <select defaultValue={st} onChange={e => setStage(e.target.value)}>
                    {[...Array(30).keys()].map((s, i) => <option value={s} key={i}>{(s + 1) + ' тур'}</option>)}
                </select>
            </div>
            {filterMatches.map(item => (
                <>
                    <div  class="ru-title ru-date">{item.day}</div>
                    {item.matches.map(m => (
                        <a class="ru-matchresult" href={m.broadcastLink} target='_blank'>
                            <div class="ru-leftteam">{clubs.find(c => c.id === m.clubH).name}</div>
                            <div><img src={clubs.find(c => c.id === m.clubH).logo} width="30" height="30" /></div>
                            {m.goalH === null && m.goalA === null ? 
                                <div class="ru-time">{dayjs.tz(m.date, 'Europe/Moscow').format('HH:mm')}</div> :
                                <>
                                    <div>{m.goalH}</div>
                                    <div>-</div>
                                    <div>{m.goalA}</div>
                                </>
                            }
                            <div><img src={clubs.find(c => c.id === m.clubA).logo} width="30" height="30" /></div>
                            <div class="ru-rightteam">{clubs.find(c => c.id === m.clubA).name}</div>
                        </a>
                    ))}
                </>
            ))}
        </div>
    )
}