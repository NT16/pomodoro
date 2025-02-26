import React from 'react'

const TwoColumnDisplay = ({ label, data }) => <div className='col-sm-12'>
        <span className='data-label'>
            <b>{label}</b> :
        </span>
        {data}
    </div>
;

export default TwoColumnDisplay;