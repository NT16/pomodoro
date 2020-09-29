import React from 'react';
import TwoColumnDisplay from './TwoColumnDisplay'

const DisplaySet = ({work, shortBreak, break2}) => {
    return(
        <>
            <TwoColumnDisplay label='Work' data={ `${work} min.`} />
            <TwoColumnDisplay label='Breaks'  data={`${shortBreak} min. , ${break2} min.` } />
        </>
    )

}

export default DisplaySet;