import React from 'react'
import dayjs from 'dayjs'

const GroupStage = ({ stage }) => {
    return (
        <div className='groupstage'>
            <div>{'Matchday ' + stage.matchday}</div>
            {stage.dates.map(d => (
                <>
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
                </>
            ))}
        </div>
    )
}

export default GroupStage