import React from 'react'
import dayjs from 'dayjs'

const MatchInfo = ({ match }) => {
    return (
        <div className='match'>
            <div className='date'>{dayjs(match.utcDate).format('DD MMM, HH:mm')}</div>
            <div className='info'>
                <div>{match.homeTeam.name}</div>
                <div className='score'>{match.score.fullTime.homeTeam}</div>
                <div>{match.awayTeam.name}</div>
                <div className='score'>{match.score.fullTime.awayTeam}</div>
            </div>
        </div>
    )
}

export default MatchInfo

// {
//     "id": 328824,
//     "season": {
//         "id": 734,
//         "startDate": "2021-06-26",
//         "endDate": "2022-05-22",
//         "currentMatchday": 2
//     },
//     "utcDate": "2021-07-14T15:00:00Z",
//     "status": "FINISHED",
//     "matchday": 1,
//     "stage": "QUALIFICATION_ROUND_1",
//     "group": null,
//     "lastUpdated": "2021-07-22T16:20:08Z",
//     "odds": {
//         "msg": "Activate Odds-Package in User-Panel to retrieve odds."
//     },
//     "score": {
//         "winner": "HOME_TEAM",
//         "duration": "EXTRA_TIME",
//         "fullTime": {
//             "homeTeam": 1,
//             "awayTeam": 0
//         },
//         "halfTime": {
//             "homeTeam": 0,
//             "awayTeam": 0
//         },
//         "extraTime": {
//             "homeTeam": 1,
//             "awayTeam": 0
//         },
//         "penalties": {
//             "homeTeam": null,
//             "awayTeam": null
//         }
//     },
//     "homeTeam": {
//         "id": 1870,
//         "name": "FC Alashkert"
//     },
//     "awayTeam": {
//         "id": 5142,
//         "name": "Connah's Quay Nomads FC"
//     },
//     "referees": []
// },