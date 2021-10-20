import React from 'react'
import { render } from 'react-dom'
import { Link, Router } from 'react-chrome-extension-router'
import EURO2020 from '../euro2020/index'
import ChampLeague21 from '../cl21-22/index'

const App = () => {
    return (
        <Router>
            <div class="menu">
                <Link component={EURO2020}>
                    EURO 2020
                </Link>
                <Link component={ChampLeague21}>
                    Champions league 2021-2022
                </Link>
            </div>
        </Router>
    )
}

render(<App />, document.getElementById('table'))