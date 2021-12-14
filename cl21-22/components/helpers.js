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

export const groupInfo = (items) => items.reduce(
    (result, item) => {
        if (item.status === 'FINISHED') {
            const homeTeam = { 
                team: item.homeTeam.name,
                points: item.score.fullTime.homeTeam > item.score.fullTime.awayTeam ? 3 : item.score.fullTime.homeTeam < item.score.fullTime.awayTeam ? 0 : 1,
                plays: 1, 
                plusminus: item.score.fullTime.homeTeam - item.score.fullTime.awayTeam,
                goals: item.score.fullTime.homeTeam
            }
            const awayTeam = { 
                team: item.awayTeam.name,
                points: item.score.fullTime.awayTeam > item.score.fullTime.homeTeam ? 3 : item.score.fullTime.awayTeam < item.score.fullTime.homeTeam ? 0 : 1,
                plays: 1, 
                plusminus: item.score.fullTime.awayTeam - item.score.fullTime.homeTeam,
                goals: item.score.fullTime.awayTeam
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