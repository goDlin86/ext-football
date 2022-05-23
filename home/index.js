import React from 'react'
import { render, createRoot } from 'react-dom'
import { Link, Router } from 'react-chrome-extension-router'
import EURO2020 from '../euro2020/index'
import ChampLeague21 from '../cl21-22/index'
import RuLeague22 from  '../ru22-23/index'

const App = () => {
    return (
        <Router>
            <div class="menu">
                <Link component={EURO2020}>
                    EURO 2020
                </Link>
                <Link component={ChampLeague21}>
                    Champions League 2021-2022
                </Link>
                <Link component={RuLeague22}>
                    Чемпионат России 2022-2023
                </Link>
            </div>
        </Router>
    )
}

createRoot(document.getElementById('table')).render(<App />)