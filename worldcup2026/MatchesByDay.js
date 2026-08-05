import React from 'react'
import dayjs from 'dayjs'

const MatchesByDay = ({ matches }) => {
  const matchesByDay = Object.groupBy(matches, m => m.league.round)
  for (const r in matchesByDay) {
    matchesByDay[r] = Object.groupBy(matchesByDay[r], m => m.fixture.date)
  }

  return (
    <>
      {Object.entries(matchesByDay).map(([round, matchesByDate]) => 
        <div className='wc26-stage'>
          <div>{round}</div>
          <div className='wc26-matches'>
            {Object.entries(matchesByDate).map(([date, matches]) => (
              <div>
                <div className='date'>{dayjs(date).locale('en').format('DD MMM, HH:mm')}</div>
                {matches.map(match => (
                  <div className='matchinfo'>
                    <div style={{ textAlign: 'right', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>{match.teams.home.name}</div>
                    <div>{match.score.fulltime.home}</div>
                    <div> - </div>
                    <div>{match.score.fulltime.away}</div>
                    <div style={{ textAlign: 'left', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>{match.teams.away.name}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MatchesByDay