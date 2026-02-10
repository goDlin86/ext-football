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
        const homeTeam = { 
            team: item.teams.home.name,
            crest: item.teams.home.logo,
            points: item.score.fulltime.home === null ? 0 : item.score.fulltime.home > item.score.fulltime.away ? 3 : item.score.fulltime.home < item.score.fulltime.away ? 0 : 1,
            plays: item.score.fulltime.home !== null ? 1 : 0, 
            plusminus: item.score.fulltime.home - item.score.fulltime.away,
            goals: parseInt(item.score.fulltime.home) || 0,
            //group: item.group
        }
        const awayTeam = { 
            team: item.teams.away.name,
            crest: item.teams.away.logo,
            points: item.score.fulltime.away === null ? 0 : item.score.fulltime.away > item.score.fulltime.home ? 3 : item.score.fulltime.away < item.score.fulltime.home ? 0 : 1,
            plays: item.score.fulltime.away !== null ? 1 : 0, 
            plusminus: item.score.fulltime.away - item.score.fulltime.home,
            goals: parseInt(item.score.fulltime.away) || 0,
            //group: item.group
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

        return result
    },
    []
)