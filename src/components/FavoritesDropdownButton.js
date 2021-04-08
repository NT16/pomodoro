import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const FavoritesDropdownButton = ({ favorites, onFavClick, onClose }) => {
    return (
        <DropdownButton
            id="dropdown-basic-button"
            title="Favorites"
            className='margin-left-2'>
            {
                favorites.map((e, index) => <Dropdown.Item
                    key={e.toString()}
                >
                    <div className='fav-row'>
                        <span onClick={() => onFavClick(e)}>
                            Work: {e[0]} min. , Breaks: {e[1]}, {e[2]} min.
                        </span>

                        <button
                            type="button"
                            className="close fav-close"
                            aria-label="Close"
                            onClick={() => onClose(index)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </Dropdown.Item>)
            }
        </DropdownButton>
    );
};

export default FavoritesDropdownButton;