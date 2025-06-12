import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';


const Watched = (props) => {
    const { watched, onClick } = props;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
    };

    if (watched) {
        return (
            <button className="watched" onClick={handleClick}>
                <FontAwesomeIcon icon={faEyeSlash}/>
            </button>
        )
    } else {
        return (
            <button className="not-watched" onClick={handleClick}>
                <FontAwesomeIcon icon={faEye}/>
            </button>
        )
    }
}

export default Watched;
