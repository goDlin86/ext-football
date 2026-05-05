import React from 'react'
import { matchesInfo } from '../championsleague/components/helpers'

export default function GroupView ({ matches }) {   
  const results = matchesInfo(matches)
	const groupsTable = results
		.reduce((result, item) => {
			const group = groups.find(g => g.teams.includes(item.team))?.group ?? "A"
			const i = result.findIndex(r => r.title === group)
			if (i >= 0) {
				result[i].commands.push(item)
			} else {
				result.push({ title: group, commands: [item] })
			}
			return result
		}, [])
		.map(g => {
			g.commands = g.commands.sort((a, b) => (b.points - a.points) || (b.plusminus - a.plusminus) || (b.goals - a.goals) || (b.plays - a.plays))
			return g
		})
		.sort((a, b) => a.title.localeCompare(b.title))
	console.log(groupsTable)

  return (
    <div>
			<h1>Groups</h1>
			<div className="grid">
				{groupsTable.map(group => (
					<div className="wc26-group">
						<div className="title">{'Group ' + group.title}</div>
						{group.commands.map(c => (
							<>
								<div>{c.team}</div>
								<div>{c.plays}</div>
								<div>{c.points}</div>
							</>
						))}
					</div>
				))}
			</div>
		</div>
  )
}

const groups = [
  { group: "A", teams: ["Mexico", "South Africa", "South Korea", "Czech Republic"] },
  { group: "B", teams: ["Canada", "Bosnia & Herzegovina", "Qatar", "Switzerland"] },
  { group: "C", teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  { group: "D", teams: ["USA", "Paraguay", "Australia", "Türkiye"] },
  { group: "E", teams: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"] },
  { group: "F", teams: ["Netherlands", "Japan", "Sweden", "Tunisia"] },
  { group: "G", teams: ["Belgium", "Egypt", "Iran", "New Zealand"] },
  { group: "H", teams: ["Spain", "Cape Verde Islands", "Saudi Arabia", "Uruguay"] },
  { group: "I", teams: ["France", "Senegal", "Iraq", "Norway"] },
  { group: "J", teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  { group: "K", teams: ["Portugal", "Congo DR", "Uzbekistan", "Colombia"] },
  { group: "L", teams: ["England", "Croatia", "Ghana", "Panama"] }
]