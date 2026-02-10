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
    chrome.storage.local.get(['api_sports'], async ({ api_sports }) => {       
      const resp = await fetch(
        'https://v3.football.api-sports.io/fixtures?league=2&season=' + season,
        {
          'method': 'GET',
          'headers': {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': api_sports
          }
        }
      )
      const data = await resp.json()
      console.log(data)

      //if (data.resultSet.count > 0) {              
        setMatches(data.response)
      //  setStage(data.resultSet.played > 143 ? 1 : 0)
      //}
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
          <LeagueView matches={matches.filter(m => m.league.round.startsWith('League Stage'))} /> : 
          <PlayoffView matches={matches.slice(matches.findIndex(m => m.league.round.startsWith('Round')))} />
        }
      </div>
    </div>
  )
}