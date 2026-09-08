import React from 'react'
import dayjs from 'dayjs'

const MatchesByDay = ({ matchesByDay }) => {
  return (
    <>
      {matchesByDay.map((matchesByDate, index) => 
        <div className='groupstage'>
          <div>{index + 1 + ' tour'}</div>
          {Object.entries(matchesByDate).map(([date, matches]) => (
            <>
              <div className='date'>{dayjs(date).locale('en').format('DD MMM, HH:mm')}</div>
              {matches.map(match => (
                <div className='matchinfo'>
                  <div>{match.home}</div>
                  <div>{match.homeScore}</div>
                  <div> - </div>
                  <div>{match.awayScore}</div>
                  <div>{match.away}</div>
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