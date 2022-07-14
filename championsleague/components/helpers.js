export const groupBy = (items, key, secondKey) => items.reduce(
    (result, item) => {
        const i = result.findIndex(r => r[key] === item[key])
        if (i >= 0) {
            const k = result[i].dates.findIndex(r => r[secondKey] === item[secondKey])
            if (k >= 0) {
                result[i].dates[k].matches.push(item)
            } else {
                result[i].dates.push({ [secondKey]: item[secondKey], matches: [item] })
            }
        } else {
            result.push({ [key]: item[key], dates: [{ [secondKey]: item[secondKey], matches: [item] }] })
        }
        return result
    }, 
    []
)

export const matchesInfo = (items) => items.reduce(
    (result, item) => {
        if (item.status === 'FINISHED') {
            const homeTeam = { 
                team: item.homeTeam.name,
                points: item.score.fullTime.home > item.score.fullTime.away ? 3 : item.score.fullTime.home < item.score.fullTime.away ? 0 : 1,
                plays: 1, 
                plusminus: item.score.fullTime.home - item.score.fullTime.away,
                goals: item.score.fullTime.home
            }
            const awayTeam = { 
                team: item.awayTeam.name,
                points: item.score.fullTime.away > item.score.fullTime.home ? 3 : item.score.fullTime.away < item.score.fullTime.home ? 0 : 1,
                plays: 1, 
                plusminus: item.score.fullTime.away - item.score.fullTime.home,
                goals: item.score.fullTime.away
            }

            let i = result.findIndex(r => r.team === homeTeam.team)
            if (i >= 0) {
                result[i].points += homeTeam.points
                result[i].plays += homeTeam.plays
                result[i].plusminus += homeTeam.plusminus
                result[i].goals += homeTeam.goals
            } else {
                result.push(homeTeam)
            }
            
            i = result.findIndex(r => r.team === awayTeam.team)
            if (i >= 0) {
                result[i].points += awayTeam.points
                result[i].plays += awayTeam.plays
                result[i].plusminus += awayTeam.plusminus
                result[i].goals += awayTeam.goals
            } else {
                result.push(awayTeam)
            }
        }

        return result
    },
    []
)