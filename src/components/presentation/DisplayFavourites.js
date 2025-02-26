import React from 'react';
import DisplaySet from './DisplaySet';

const DisplayFavourites = ({ favourites }) => {
    <div className='form-group'>
        <div className='form-check'>
            <input className='form-check-input' type='checkbox' id='save' />
            <label className='form-check-label' for='save'>
                <DisplaySet work={e[0]} shortBreak={e[1]} break2={e[2]} />
            </label>
        </div>
    </div>
}

export default DisplayFavourites;