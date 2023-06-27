import React from 'react'
import { render, createRoot } from 'react-dom'
import { Link, Router } from 'react-chrome-extension-router'
import EURO2020 from '../euro2020'
import ChampLeague from '../championsleague'
import RuLeague from  '../ru'
import RuCup22 from '../rucup22-23'
import WorldCup from '../worldcup2022'

const App = () => {
    return (
        <Router>
            <div class="menu">
                <Link component={EURO2020}>
                    EURO 2020
                </Link>
                <Link component={WorldCup}>
                    World Cup 2022
                </Link>
                <Link component={ChampLeague} props={{ season: 2021 }}>
                    Champions League 2021-2022
                </Link>
                <Link component={ChampLeague} props={{ season: 2022 }}>
                    Champions League 2022-2023
                </Link>
                <Link component={RuLeague}>
                    Чемпионат России
                </Link>
                <Link component={RuCup22}>
                    Кубок России 2022-2023
                </Link>
            </div>
        </Router>
    )
}

createRoot(document.getElementById('table')).render(<App />)