import React from 'react'

const GroupInfo = ({ group }) => {
    return (
        <div className='group'>
            <div className='title'>{group.title}</div>
            <div className='points'>Pts</div>
            <div>P</div>
            <div>+/-</div>
            <div>G</div>
            
            {
                group.commands.map(c => (
                    <>
                        <div className='team'>{c.team}</div>
                        <div className='points'>{c.points}</div>
                        <div>{c.plays}</div>
                        <div>{c.plusminus}</div>
                        <div>{c.goals}</div>
                    </>
                ))
            }
        </div>
    )
}

export default GroupInfo