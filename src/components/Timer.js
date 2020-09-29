import React, { useState, useEffect } from 'react'

const Timer = ({ limit, index }) => {
    const [time, setTime] = useState(0)

    //4.
    useEffect(() => {
        console.log(`Timer: time ${time}, limit: ${limit}`)
        setTimeout(() => {
            if (time !== (limit - 1)) {
                setTime(time + 1)
            }
        }, 60000)
    }, [time])

    return (
        <div className='center-content' data-testid='timer'>
            <div>{ index % 2 === 0 ? 'Work' : 'Break' }</div>
            <div>
                <span className='timer-line-1' id='count-up'>{time} </span>
            </div>
            <div className='timer-line-2'>/ {limit} minutes</div>
        </div>
    )
}
export default Timer;