import React from 'react'

export default function LeagueInfo ({ league }) {
  return (
    <div className='group'>
      <div className='title'>LEAGUE STAGE</div>
      <div className='points'>Pts</div>
      <div>P</div>
      <div>+/-</div>
      <div>G</div>
      
      {
        league.map(c => (
          <>
            <div className='team'>{c.team}</div>
            <div className='points'>{c.points}</div>
            <div>{c.plays}</div>
            <div>{c.plusminus}</div>
            <div>{c.goals}</div>
          </>
        ))
      }
    </div>
  )
}