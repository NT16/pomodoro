import React from 'react'

const TwoColumnDisplay = ({ label, data }) => <div>
    <span className='data-label'>{label} :</span>
    {data}
</div>;

export default TwoColumnDisplay;