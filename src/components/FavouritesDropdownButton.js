import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const FavouritesDropdownButton = ({ favourite, onFavClick, onClose}) => {
    return (
    <DropdownButton id="dropdown-basic-button" title="Favourites" className='margin-left-2'>
        {
            favourite.map((e, index) => <Dropdown.Item key={e.toString()} onClick={() => onFavClick(e)} >
                <div className='fav-row'>
                    <span>Work: {e[0]} min. , Breaks: {e[1]}, {e[2]} min.</span>
                    <button type="button" className="close fav-close" aria-label="Close" onClick={() => onClose(index)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </Dropdown.Item>)
        }
    </DropdownButton>
    );
};

export default FavouritesDropdownButton;