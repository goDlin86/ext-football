import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import EURO2020 from '../euro2020/index'
import ChampLeague21 from '../cl21-22/index'

const App = () => {
    return (
        <BrowserRouter>
            <Link to="/euro20">
                EURO 2020
            </Link>
            <Link to="/cl21">
                Champions league 2021-2022
            </Link>

            <Switch>
                <Route exact path="/euro20">
                    <EURO2020 />
                </Route>
                <Route exact path="/cl21">
                    <ChampLeague21 />
                </Route>
                <Route exact path="/">
                    <Redirect to="/index.html" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('table'))