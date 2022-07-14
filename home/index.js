import React from 'react'
import { render, createRoot } from 'react-dom'
import { Link, Router } from 'react-chrome-extension-router'
import EURO2020 from '../euro2020/index'
import ChampLeague from '../championsleague/index'
import RuLeague22 from  '../ru22-23/index'

const App = () => {
    return (
        <Router>
            <div class="menu">
                <Link component={EURO2020}>
                    EURO 2020
                </Link>
                <Link component={ChampLeague} props={{ season: 2021 }}>
                    Champions League 2021-2022
                </Link>
                <Link component={ChampLeague} props={{ season: 2022 }}>
                    Champions League 2022-2023
                </Link>
                <Link component={RuLeague22}>
                    Чемпионат России 2022-2023
                </Link>
            </div>
        </Router>
    )
}

createRoot(document.getElementById('table')).render(<App />)