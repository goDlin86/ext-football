import React from 'react'
import dayjs from 'dayjs'

export default function PlayoffView ({ matches }) {            
    const matchesByDay = matches.reduce(
        (result, item) => {
            const i = result.findIndex(r => r.date === item.fixture.date)
            if (i >= 0) {
                result[i].matches.push(item)
            } else {
                result.push({ date: item.fixture.date, matches: [item] })
            }
            return result
        },
        []
    )

    return (
        <>
            {matchesByDay.map(d => (
                <div className='groupstage'>
                    <div className='date'>{dayjs(d.date).locale('en').format('DD MMM, HH:mm')}</div>
                    {d.matches.map(match => (
                        <div className='matchinfo'>
                            <div>{match.teams.home.name}</div>
                            <div>{match.score.fulltime.home}</div>
                            <div> - </div>
                            <div>{match.score.fulltime.away}</div>
                            <div>{match.teams.away.name}</div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}