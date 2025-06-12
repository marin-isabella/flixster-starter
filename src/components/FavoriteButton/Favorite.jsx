import React from 'react';

const Favorite = (props) => {
    const { liked, onClick } = props;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
    };

    if (liked) {
        return (
            <button className="liked" onClick={handleClick}>❤️</button>
        )
    } else {
        return (
            <button className="not-liked" onClick={handleClick}>🖤</button>
        )
    }
}

export default Favorite;
