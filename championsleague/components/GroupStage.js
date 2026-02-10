import React from 'react'
import dayjs from 'dayjs'

const GroupStage = ({ stage }) => {
    return (
        <div className='groupstage'>
            <div>{'Matchday ' + stage.matchday}</div>
            {stage.dates.map(d => (
                <>
                    <div className='date'>{dayjs(d.utcDate).locale('en').format('DD MMM, HH:mm')}</div>
                    {d.matches.map(match => (
                        <div className='matchinfo'>
                            <div>{match.teams.home.name}</div>
                            <div>{match.score.fulltime.home}</div>
                            <div> - </div>
                            <div>{match.score.fulltime.away}</div>
                            <div>{match.teams.away.name}</div>
                        </div>
                    ))}
                </>
            ))}
        </div>
    )
}

export default GroupStage