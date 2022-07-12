import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

export default function StageView ({ matches }) {
    const week = dayjs().week()
    const i = matches.findIndex(m => dayjs(m.date).week() === week)

    const [stage, setStage] = useState(matches[i].stageName)
    const [filterMatches, setMatches] = useState([])

    useEffect(() => {
        setMatches(matches.filter(m => m.stageName === stage).reduce((result, item) => {
            const i = result.findIndex(r => r.day === item.day && r.time === item.time)
            if (i >= 0) {
                result[i].matches.push(item)
            } else {
                result.push({ day: item.day, time: item.time, matches: [item] })
            }
            return result
        }, []))
    }, [stage, matches])

    return (
        <div class="ru-stage">
            <div class="ru-title ru-bold">
                <select defaultValue={stage} onChange={e => setStage(e.target.value)}>
                    {[...Array(30).keys()].map((s, i) => <option value={(s + 1) + ' тур'} key={i}>{(s + 1) + ' тур'}</option>)}
                </select>
            </div>
            {filterMatches.map(item => (
                <>
                    <div  class="ru-title ru-date">{item.day + ', ' + item.time}</div>
                    {item.matches.map(m => (
                        <>
                            <div>{m.name1}</div>
                            <div><img src={m.club1} width="30" height="30" /></div>
                            <div>{m.goal1}</div>
                            <div>-</div>
                            <div>{m.goal2}</div>
                            <div><img src={m.club2} width="30" height="30" /></div>
                            <div>{m.name2}</div>
                        </>
                    ))}
                </>
            ))}
        </div>
    )
}