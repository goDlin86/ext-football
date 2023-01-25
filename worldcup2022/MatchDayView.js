import React from 'react'
import dayjs from 'dayjs'
import { groupBy } from '../championsleague/components/helpers'

export default function MatchDayView ({ matches, title }) {   
    const matchesByDay = groupBy(matches, 'matchday', 'utcDate')
    console.log(matchesByDay)

    return (
        <div className="wc-matches">
            <h1>{title}</h1>
            <div className="grid">
                {matchesByDay.map(day => (
                    <>
                        {day.dates.map(d => (
                            <>
                                {d.matches.map(m => (
                                    <div className="wc-match">
                                        <div className="wc-date">{dayjs(d.utcDate).format('ddd, DD MMM, HH:mm')}</div>
                                        <div></div>
                                        <div><img src={m.homeTeam.crest} width="30" height="20" />{m.homeTeam.name}</div>
                                        <div className="wc-right">{m.score.fullTime.home}</div>
                                        <div><img src={m.awayTeam.crest} width="30" height="20" />{m.awayTeam.name}</div>
                                        <div className="wc-right">{m.score.fullTime.away}</div>
                                    </div>
                                ))}
                            </>
                        ))}
                    </>
                ))}
            </div>
        </div>
    )
}