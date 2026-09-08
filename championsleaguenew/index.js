import React, { useEffect, useState } from 'react'
import LeagueView from './components/LeagueView'
import PlayoffView from './components/PlayoffView'
import BackButton from '../home/BackButton'

import * as cheerio from 'cheerio'

import '../championsleague/style.css'
import './style.css'

export default function ChampLeagueNew ({ season }) {
  const [stage, setStage] = useState(0)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const r = await fetch('https://www.sports.ru/football/tournament/ucl/calendar/')
    const $ = cheerio.load(await r.text())

    const matches = $('.calendar-card').toArray().map((item) => ({
      date: $(item).find('time').attr('datetime'),
      home: $(item).find('.calendar-card__home').text().replace(/\s+/g, ' ').trim(),
      homeLogo: $(item).find('.calendar-card__home > img').attr('src'),
      homeScore: $(item).find('.calendar-card__score span:first-of-type').text().replace(/\s+/g, ' ').trim(),
      away: $(item).find('.calendar-card__away').text().replace(/\s+/g, ' ').trim(),
      awayLogo: $(item).find('.calendar-card__away > img').attr('src'),
      awayScore: $(item).find('.calendar-card__score span:last-of-type').text().replace(/\s+/g, ' ').trim()
    }))
    
    console.log(matches)
    setMatches(matches)
    //setStage(data.response.length > 235 ? 1 : 0)
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
          <LeagueView matches={matches} /> : 
          <PlayoffView matches={matches} />
        }
      </div>
    </div>
  )
}