import React, { useState, useEffect } from 'react'

const Timer = ({ limit }) => {
    const [time, setTime] = useState(0)

    //4.
    useEffect(() => {
        console.log(`Timer: time ${time}, limit: ${limit}`)
        setTimeout(() => {
            if (time !== (limit - 1)) {
                setTime(time + 1)
            }
        }, 60000)
    }, [time, limit])

    return (
        <>
            <div>
                <span className='display-1' id='count-up'>{time} </span>
            </div>
            <div>/ {limit} minutes</div>
        </>
    )
}
export default Timer;