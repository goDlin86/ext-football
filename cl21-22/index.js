import React, { useEffect, useState } from 'react'
import GroupView from './components/GroupView'
import PlayoffView from './components/PlayoffView'
import BackButton from '../home/BackButton'
import './style.css'

export default function ChampLeague21 () {
    const [stage, setStage] = useState(1)

    return (
        <div class="league">
            <BackButton />
            <div class="cl-logo"></div>
            <div class="stage-container">
                <div class={stage === 0 ? "stage active" : "stage"} onClick={() => setStage(0)}>
                    Group Stage
                </div>
                <div class={stage === 1 ? "stage active" : "stage"} onClick={() => setStage(1)}>
                    Playoff Stage
                </div>
            </div>
            <div class="cl-container">
                {stage === 0 ? <GroupView /> : null}
                {stage === 1 ? <PlayoffView /> : null}
            </div>
        </div>
    )
}