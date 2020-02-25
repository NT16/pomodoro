import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Timer from './Timer';
import { useLocation } from 'react-router-dom'

const Ticker = () => {
    const [cycle, setCycle] = useState([2, 1, 2]) //[25,5,25,5,25,5,25,20] //[2,1,2,1,2,1,2,2]
    const [done, setDone] = useState(false)
    const [startClicked, setClicked] = useState(false)
    const [logs, setLog] = useState([])
    const [work, setWork] = useState(25); //25
    const [shortBreak, setShortBreak] = useState(5); //5
    const [break2, setBreak2] = useState(15); //15
    const [index, setIndex] = useState(0)

    let location = useLocation();
   
    function checkInputValidity( value, func ) {
        if( !isNaN(value) ){
            func(parseInt(value))
        } 
    }

    useEffect(() => {
        if(location.data){
            console.log('inside ticker, location.data', location.data)

            checkInputValidity(location.data.work, setWork)
            checkInputValidity(location.data.shortBreak, setShortBreak)
            checkInputValidity(location.data.break2, setBreak2)   
        }
    }
    , [location.data])

    //1
    const setTimeline = () => {
        console.log(`work ${work}, shortBreak ${shortBreak}, break ${break2}`)
        const arr = []
        for (let i = 0; i < 4; i++) {
            arr.push(work)
            arr.push(shortBreak)
        }
        let lastIndex = arr.length - 1;
        arr[lastIndex] = arr[lastIndex] + break2;
        console.log('arr is ', arr.toString())
        setCycle(arr)
        console.log('cycle inside setTimeline ', cycle.toString())
    }

    useEffect(setTimeline, [work, shortBreak, break2])

    //6
    const startTimer = (limit) => {
        console.log('Timer starts')
        console.log('inside startTimer, set is', cycle.toString(), 'set length', cycle.length)
        setDone(false)
        console.log('limit',limit, 'index', index)
        setTimeout(() => {
            console.log(`${index + 1}. ${limit} min timer done`)
            setLog([...logs, `${index + 1}. ${limit} min timer done`])
            setDone('true')
            if (index !== (cycle.length - 1)) {
                setIndex(index + 1)
            }
        }, limit * 60000)
    }

    //5
    useEffect(() => {
        if (startClicked) {
            console.log('in useEffect 1, start clicked')
            startTimer(cycle[index])
        }
    }, [index, cycle, startClicked])

    //3. after 'start' button click
    const onStartClick = () => {
        console.log('STart clicked')
        setClicked(true)
    }

    const display = () => {
        if (done) {
            return <div className='display-4'>Done!!!!</div>
        } else if (startClicked) {
            return <Timer limit={cycle[index]} />
        }
    }

    return (
        <div className='row' id='ticker'>
            <div className='col-md-8'>
                <div className='text-center'>
                    {
                        !startClicked ?
                        <Button
                        onClick={onStartClick}
                        variant="primary"
                        >
                        Start
                        </Button>
                        : null
                    }
                    
                    <div className='ticker'>
                        {
                            display()
                        }
                    </div>
                </div>
            </div>
            <div className='col-md-4 text-center'>
                <h4>Logs</h4>
                {
                    logs.map((l) => <p key={l}>{l}</p>)
                }
            </div>
        </div>
    )
}

export default Ticker;