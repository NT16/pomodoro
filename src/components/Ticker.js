import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Timer from './Timer';

const Ticker = (props) => {
    const [cycle, setCycle] = useState([2, 1, 2]) //[25,5,25,5,25,5,25,20] //[2,1,2,1,2,1,2,2]
    const [done, setDone] = useState(false)
    const [startClicked, setClicked] = useState(false)
    const [logs, setLog] = useState([])
    const [work, setWork] = useState(25); //25
    const [shortBreak, setShortBreak] = useState(5); //5
    const [break2, setBreak2] = useState(15); //15
    const [index, setIndex] = useState(0)


    function checkInputValidity( value, func ) {
        if( !isNaN(value) ){
            func(parseInt(value))
        } 
    }

    useEffect(() => {
        if (props.location.data) {
            console.log('inside ticker, props.location.data', props.location.data)

            checkInputValidity(props.location.data.work, setWork)
            checkInputValidity(props.location.data.shortBreak, setShortBreak)
            checkInputValidity(props.location.data.break2, setBreak2)   
        }
    }, [props.location.data])

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
        setTimeout(() => {
            console.log(`${index + 1}. ${limit} min timer done`)
            setLog([...logs, `${index + 1}. ${limit} min timer done`])
            setDone('true')
            if (index !== (cycle.length - 1)) {
                setIndex(index + 1)
            }
            console.log('index is', index)
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
        <div className='row'>
            <div className='col-md-8'>
                <div className='text-center'>
                    <Button
                        onClick={onStartClick}
                        variant="primary"
                    >
                        Start
                    </Button>
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