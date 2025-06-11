import React from 'react';

const LoadButton = (props) => {
    return (
        <div className="load-button">
            <button onClick={props.inc} disabled={props.disabled}>Load More</button>
        </div>
    )
}

export default LoadButton;
