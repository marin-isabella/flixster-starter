import React from 'react';

const LoadButton = (props) => {
    return (
        <div className="load-button">
            <button onClick={props.inc}>Load More</button>
        </div>
    )
}

export default LoadButton;
