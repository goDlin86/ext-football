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
                        <div className='team'>{c}</div>
                        <div className='points'>0</div>
                        <div>0</div>
                        <div>0</div>
                        <div>0</div>
                    </>
                ))
            }
        </div>
    )
}

export default GroupInfo