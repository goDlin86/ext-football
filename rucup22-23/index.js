import React, { useEffect, useState } from 'react'

import BackButton from '../home/BackButton'

//import './style.css'

export default function RuCup22 () {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const resp = await fetch(
            'https://premierliga.ru/ajax/match/', 
            {
                'headers': {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'body': 'ajaxAction=getHeaderCalendar&tournament=2',
                'method': 'POST'
            }
        )
        const data = await resp.json()
        
        console.log(data)
    }

    return (
        <div class="rucup">
            <BackButton />

            <div class="header">
                <img src="" alt="logo" />
            </div>
            
            
        </div>
    )
}