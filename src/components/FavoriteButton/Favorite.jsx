import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as hollowHeart} from '@fortawesome/free-regular-svg-icons';

const Favorite = (props) => {
    const { liked, onClick } = props;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
    };

    if (liked) {
        return (
            <button className="liked" onClick={handleClick}>
                <FontAwesomeIcon icon={solidHeart} style={{color: 'red'}} />
            </button>
        )
    } else {
        return (
            <button className="not-liked" onClick={handleClick}>
                <FontAwesomeIcon icon={hollowHeart}/>
            </button>
        )
    }
}

export default Favorite;
