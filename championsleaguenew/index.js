import React, { useEffect, useState } from 'react'
import LeagueView from './components/LeagueView'
import PlayoffView from './components/PlayoffView'
import BackButton from '../home/BackButton'

import '../championsleague/style.css'
import './style.css'

export default function ChampLeagueNew ({ season }) {
  const [stage, setStage] = useState(0)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    chrome.storage.local.get(['football_api_token'], async ({ football_api_token }) => {       
      const resp = await fetch(
        'https://api.football-data.org/v4/competitions/CL/matches?season=' + season,
        { headers: { 'X-Auth-Token': football_api_token } }
      )
      const data = await resp.json()
      console.log(data)

      if (data.resultSet.count > 0) {              
        setMatches(data.matches)
        setStage(data.resultSet.played > 143 ? 1 : 0)
      }
    })
  }

  return (
    <div class="league">
      <BackButton />
      <div class="cl-logo"></div>
      <div class="stage-container">
        <div class={stage === 0 ? "stage active" : "stage"} onClick={() => setStage(0)}>
          League Stage
        </div>
        <div class={stage === 1 ? "stage active" : "stage"} onClick={() => setStage(1)}>
          Playoff Stage
        </div>
      </div>
      <div class="cl-container">
        {stage === 0 ? 
          <LeagueView matches={matches.filter(m => m.stage === 'LEAGUE_STAGE')} /> : 
          <PlayoffView matches={matches.slice(matches.findIndex(m => m.stage === 'PLAYOFFS'))} />
        }
      </div>
    </div>
  )
}