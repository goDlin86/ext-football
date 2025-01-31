import React from 'react'
import dayjs from 'dayjs'

export default function PlayoffView ({ matches }) {            
    const matchesByDay = matches.reduce(
        (result, item) => {
            const i = result.findIndex(r => r.utcDate === item.utcDate)
            if (i >= 0) {
                result[i].matches.push(item)
            } else {
                result.push({ utcDate: item.utcDate, matches: [item] })
            }
            return result
        },
        []
    )

    return (
        <>
            {matchesByDay.map(d => (
                <div className='groupstage'>
                    <div className='date'>{dayjs(d.utcDate).format('DD MMM, HH:mm')}</div>
                    {d.matches.map(match => (
                        <div className='matchinfo'>
                            <div>{match.homeTeam.name}</div>
                            <div>{match.score.fullTime.home}</div>
                            <div> - </div>
                            <div>{match.score.fullTime.away}</div>
                            <div>{match.awayTeam.name}</div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}