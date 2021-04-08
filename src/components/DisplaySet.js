import React from 'react';
import TwoColumnDisplay from './TwoColumnDisplay'

const DisplaySet = ({work, shortBreak, break2}) => {
    return(
        <div className='row data-label'>
            <TwoColumnDisplay label='Work' data={ `${work} min.`} />
            <TwoColumnDisplay label='Breaks'  data={`${shortBreak} min. , ${break2} min.` } />
        </div>
    )

}

export default DisplaySet;