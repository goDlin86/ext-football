import React, { useEffect, useState } from 'react'
import BackButton from '../home/BackButton'
import MatchDayView from './MatchDayView'
import GroupView from './GroupView'

import './style.css'

export default function EURO2024 () {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {
      const resp = await fetch(
        'https://api.football-data.org/v4/competitions/EC/matches?season=2024',
        { headers: { 'X-Auth-Token': football_api_token } }
      )
      const data = await resp.json()
      console.log(data)

      setMatches(data.matches)
    })

    // const resp = await fetch('https://match.uefa.com/v5/livescore?competitionId=1')
  }

  return (
    <div className="euro2024">
      <BackButton />
      <div className="euro2024-logo" />
      <GroupView matches={matches.filter(m => m.stage === 'GROUP_STAGE')} />
      <MatchDayView matches={matches.filter(m => m.stage === 'GROUP_STAGE')} title='Matches' />
    </div>
  )
}