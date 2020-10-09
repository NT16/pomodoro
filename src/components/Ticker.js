import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Timer from './Timer';
import ConditionalButton from './ConditionalButton';
import DisplaySet from './DisplaySet';
import DisplayModal from './DisplayModal';
import FavouritesDropdownButton from './FavouritesDropdownButton';

const WORK_INITIAL_VALUE = 25;
const SHORT_BREAK_INITIAL_VALUE = 5;
const BREAK2_INITIAL_VALUE = 15;

const Ticker = () => {
    const [cycle, setCycle] = useState([2, 1, 2]) //[25,5,25,5,25,5,25,20] //[2,1,2,1,2,1,2,2]
    const [done, setDone] = useState(false)
    const [startClicked, setClicked] = useState(false)
    const [logs, setLog] = useState([])
    const [work, setWork] = useState(WORK_INITIAL_VALUE); //25
    const [shortBreak, setShortBreak] = useState(SHORT_BREAK_INITIAL_VALUE); //5
    const [break2, setBreak2] = useState(BREAK2_INITIAL_VALUE); //15
    const [index, setIndex] = useState(0)
    const [reset, setReset] = useState(false);
    const [isSave, setIsSave] = useState(false)
    const [favourite, setFavourite] = useState(JSON.parse(window.localStorage.getItem('fav')) || [ [WORK_INITIAL_VALUE, SHORT_BREAK_INITIAL_VALUE, BREAK2_INITIAL_VALUE] ] );
    const [showModal, setModal] = useState(false);
    const [deleteFavIndex, setDeleteIndex] = useState(null);
    
    let location = useLocation();

    function checkInputValidity(value, func) {
        if (!Number.isNaN(value)) {
            func(parseInt(value))
        }
    }

    //using the local storage in React's function components is a side-effect which is best implemented with the Effect Hook which runs every time the value property changes
    useEffect( ()=> {
        window.localStorage.setItem('fav', JSON.stringify(favourite) );
        console.log('Backing up Fav in storage');
    }, [favourite]);

    useEffect(() => {
        if (location.data) {
            console.log('Ticker: location.data', location.data)

            checkInputValidity(location.data.work, setWork)
            checkInputValidity(location.data.shortBreak, setShortBreak)
            checkInputValidity(location.data.break2, setBreak2)
            if (location.data.save) {
                setIsSave(true);
            }
        }
    }, [location.data]);

    useEffect(() => {
        if(isSave){
            setFavourite(favourite => [...favourite, [work, shortBreak, break2]] );
        }
    }, [isSave]);

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
        console.log('Cycle will be', arr.toString())
        setCycle(arr)
    }

    useEffect( setTimeline, [work, shortBreak, break2]);

    //5
    useEffect(() => {

        const startTimer = (limit) => {

            console.log('Ticker:', cycle.toString())
            setDone(false)
            console.log('limit', limit, 'index', index)
            setTimeout(() => {
                console.log(`${index + 1}. ${limit} min timer done`)
                setLog( logs => [...logs, `${index + 1}. ${limit} min timer done`]);
                setDone('true')
                if (index !== (cycle.length - 1)) {
                    setIndex(index + 1)
                }
            }, limit * 60000)
        };

        if (startClicked) {
            console.log('Ticker: start clicked')
            startTimer(cycle[index])
        }
    }, [index, cycle, startClicked]);

    //3. after 'start' button click
    const onStartClick = () => {
        setClicked(true)
        setReset(false)
    };

    const onResetClick = () => {
        setReset(true)
        setDone(false)
        setClicked(false)
        setLog([])
        setIndex(0)
    };

    const onFavClick = (item) => {
        setWork(item[0]);
        setShortBreak(item[1]);
        setBreak2(item[2]);
        onResetClick();
    };

    const onClose = (index) => {
        console.log('deleting fav', index)
        setDeleteIndex(index);
        setModal(true);
    };

    function removeItem() {
        setFavourite([...favourite.slice(0, deleteFavIndex), ...favourite.slice(deleteFavIndex + 1)]);
        setDeleteIndex(null);
    };

    const display = () => {
        if (done) {
            return <div className='display-4 center-content'>Done!!!</div>
        } else if (startClicked) {
            return <Timer limit={cycle[index]} index={index} />
        }
    };

    return (
        <>
            {showModal && <DisplayModal setShow={setModal} onYes={removeItem} />}
            <div className='text-center'>
                <div className='row center-jc buttons-row'>
                    <ConditionalButton condition={!startClicked} name='Start' onClick={onStartClick} />
                    <ConditionalButton condition={startClicked} name='Cancel' onClick={onResetClick} />
                    <ConditionalButton condition={done && !reset} name='Reset' onClick={onResetClick} />
                    {
                        (!startClicked && favourite.length !== 0) &&
                    <FavouritesDropdownButton favourite={favourite} onFavClick={onFavClick} onClose={onClose} />
                    }
                </div>
                <DisplaySet work={work} shortBreak={shortBreak} break2={break2} />
                {
                    startClicked && <>
                    <div className='ticker'>
                        {
                            display()
                        }
                    </div>
                    <div className='text-center'>
                        <h4>Logs</h4>
                        {
                            logs.map((l) => <p key={l}>{l}</p>)
                        }
                    </div>
                    </>
                }
            </div>
        </>
    )
}

export default Ticker;