import React, { useEffect, useState } from 'react'
import LeagueView from './components/LeagueView'
import PlayoffView from './components/PlayoffView'
import BackButton from '../home/BackButton'
import Loading from './components/Loading'

//import * as cheerio from 'cheerio'

import '../championsleague/style.css'
import './style.css'

export default function ChampLeagueNew ({ season }) {
  const [stage, setStage] = useState(0)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // const r = await fetch('https://www.sports.ru/football/tournament/ucl/calendar/')
    // const $ = cheerio.load(await r.text())

    // const matches = $('.calendar-card').toArray().map((item) => ({
    //   date: $(item).find('time').attr('datetime'),
    //   home: $(item).find('.calendar-card__home').text().replace(/\s+/g, ' ').trim(),
    //   homeLogo: $(item).find('.calendar-card__home > img').attr('src'),
    //   homeScore: $(item).find('.calendar-card__score span:first-of-type').text().replace(/\s+/g, ' ').trim(),
    //   away: $(item).find('.calendar-card__away').text().replace(/\s+/g, ' ').trim(),
    //   awayLogo: $(item).find('.calendar-card__away > img').attr('src'),
    //   awayScore: $(item).find('.calendar-card__score span:last-of-type').text().replace(/\s+/g, ' ').trim()
    // }))
    
    // console.log(matches)
    // setMatches(matches)
    // setStage(data.response.length > 235 ? 1 : 0)

    const data = await Promise.all(
      [...Array(8).keys()].map(async i => {
        const resp = await fetch("https://www.sports.ru/gql/graphql/", {
          "body": "{\"query\":\"query calendarWidget_v2_getFootballCalendarMatchesByTag ( $tournamentTagId: ID! $seasonSlug: String! $hasSeasonSlug: Boolean! $date: String $roundFilter: statTournamentRoundInput $statuses: [matchStatus!] $iso2Country: String $withOdds: Boolean = false ) { statQueries { football { tournament(id: $tournamentTagId, source: SPORTS_TAG) { currentSeason { id groupMatches( groupBy: BY_STAGE_AND_DAY date: $date round: $roundFilter status: $statuses ) @skip(if: $hasSeasonSlug) { stageName days { date matches {  id ubersetzer { sportsId } matchStatus links { link } scheduledAt winner home {  score team { name ubersetzer { sportsTag } id links { link } desktop: logotype(input: { resize: SIZE_64_64, multi: X1 }) { url } desktop__2x: logotype(input: { resize: SIZE_64_64, multi: X2 }) { url } mobile: logotype(input: { resize: SIZE_32_32, multi: X1 }) { url } mobile__2x: logotype(input: { resize: SIZE_32_32, multi: X2 }) { url } }  } away {  score team { name ubersetzer { sportsTag } id links { link } desktop: logotype(input: { resize: SIZE_64_64, multi: X1 }) { url } desktop__2x: logotype(input: { resize: SIZE_64_64, multi: X2 }) { url } mobile: logotype(input: { resize: SIZE_32_32, multi: X1 }) { url } mobile__2x: logotype(input: { resize: SIZE_32_32, multi: X2 }) { url } }  } attendance hadPenalties periodScore { type homeScore awayScore } venue { name }  bettingOdds(placementName: \\\"TAGS_TOURNAMENT_CALENDAR\\\", iso2Country: $iso2Country, tournamentId: $tournamentTagId) @include(if: $withOdds) { bookmaker { lead logoUrl logoLink } line1x2 { h x a diffH diffX diffA url } }   } } } } seasonBySlug(slug: $seasonSlug) @include(if: $hasSeasonSlug) { id groupMatches( groupBy: BY_STAGE_AND_DAY date: $date round: $roundFilter status: $statuses ) { stageName days { date matches {  id ubersetzer { sportsId } matchStatus links { link } scheduledAt winner home {  score team { name ubersetzer { sportsTag } id links { link } desktop: logotype(input: { resize: SIZE_64_64, multi: X1 }) { url } desktop__2x: logotype(input: { resize: SIZE_64_64, multi: X2 }) { url } mobile: logotype(input: { resize: SIZE_32_32, multi: X1 }) { url } mobile__2x: logotype(input: { resize: SIZE_32_32, multi: X2 }) { url } }  } away {  score team { name ubersetzer { sportsTag } id links { link } desktop: logotype(input: { resize: SIZE_64_64, multi: X1 }) { url } desktop__2x: logotype(input: { resize: SIZE_64_64, multi: X2 }) { url } mobile: logotype(input: { resize: SIZE_32_32, multi: X1 }) { url } mobile__2x: logotype(input: { resize: SIZE_32_32, multi: X2 }) { url } }  } attendance hadPenalties periodScore { type homeScore awayScore } venue { name }  bettingOdds(placementName: \\\"TAGS_TOURNAMENT_CALENDAR\\\", iso2Country: $iso2Country, tournamentId: $tournamentTagId) @include(if: $withOdds) { bookmaker { lead logoUrl logoLink } line1x2 { h x a diffH diffX diffA url } }   } } } } } } } }\",\"operationName\":\"calendarWidget_v2_getFootballCalendarMatchesByTag\",\"variables\":{\"tournamentTagId\":\"1365242\",\"seasonSlug\":\"2026-2027\",\"hasSeasonSlug\":true,\"date\":null,\"roundFilter\":{\"roundTypeName\":\"" + (i + 1) + " тур\"},\"statuses\":[\"CLOSED\",\"LIVE\",\"NOT_STARTED\",\"POSTPONED\",\"DELAYED\"],\"iso2Country\":\"NL\",\"withOdds\":true}}",
          "method": "POST"
        })
        return await resp.json()
      })
    )

    const matches = data.reduce((result, item) => {
      result.push(...item.data.statQueries.football.tournament.seasonBySlug.groupMatches[0].days)
      return result
    }, []).reduce((result, item) => {
      result.push(...item.matches)
      return result
    }, [])
    console.log(matches)
    
    setMatches(matches)
  }

  return (
    <div class="league">
      <BackButton />
      <div class="cl-logo"></div>
      {matches.length === 0 ? <Loading /> :
      <>
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
      </>}
    </div>
  )
}