import React, { useEffect, useState } from 'react'

import GroupView from './GroupView'
import MatchesByDay from './MatchesByDay'
import BackButton from '../home/BackButton'

import './style.css'

export default function WorldCup26 ({ season }) {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    chrome.storage.local.get(['api_sports'], async ({ api_sports }) => {       
      const resp = await fetch(
        'https://v3.football.api-sports.io/fixtures?league=1&season=' + season,
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
          
      setMatches(data.response)
    })
  }

  return (
    <div className="worldcup26">
      <BackButton />
      <div className="logo" />
      <GroupView matches={matches} />
      <MatchesByDay matches={matches} />
    </div>
  )
}