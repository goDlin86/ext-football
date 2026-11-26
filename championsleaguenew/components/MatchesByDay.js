import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const MatchesByDay = ({ matches }) => {
  const getInitialTour = Math.floor(matches.findIndex(m => dayjs().subtract(2, 'day').isBefore(dayjs(m.scheduledAt))) / 18)

  const [currentTour, setCurrentTour] = useState(getInitialTour)
  const [matchesByDay, setMatchesByDay] = useState([])

  useEffect(() => {
    setMatchesByDay(Object.groupBy(matches.slice(currentTour * 18, currentTour * 18 + 18), m => m.scheduledAt))
  }, [currentTour, matches])

  return (
    <>
      <div className='groupstage'>
        <select 
          value={currentTour}
          onChange={e => setCurrentTour(e.target.value)}
        >
          {[...Array(8).keys()].map((s, i) => <option value={s} key={i}>{(s + 1) + ' tour'}</option>)}
        </select>
        <div>{Number(currentTour) + 1} tour</div>
        {Object.entries(matchesByDay).map(([date, matches]) => (
          <>
            <div className='date'>{dayjs(date).locale('en').format('DD MMM, HH:mm')}</div>
            {matches.map(match => (
              <div className='matchinfo'>
                <div>{match.home.team.name}</div>
                <div>{match.matchStatus === 'CLOSED' ? match.home.score : ''}</div>
                <div> - </div>
                <div>{match.matchStatus === 'CLOSED' ? match.away.score : ''}</div>
                <div>{match.away.team.name}</div>
              </div>
            ))}
          </>
        ))}
      </div>
    </>
  )
}

export default MatchesByDay