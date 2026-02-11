import React from 'react'
import dayjs from 'dayjs'

const MatchesByDay = ({ matchesByDay }) => {
  return (
    <>
      {Object.entries(matchesByDay).map(([round, matchesByDate]) => 
          <div className='groupstage'>
              <div>{round}</div>
              {Object.entries(matchesByDate).map(([date, matches]) => (
                  <>
                      <div className='date'>{dayjs(date).locale('en').format('DD MMM, HH:mm')}</div>
                      {matches.map(match => (
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
      )}
    </>
  )
}

export default MatchesByDay