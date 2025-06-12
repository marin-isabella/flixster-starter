import React from 'react';

const Sort = ({onSort}) => {
  const handleSort = (event) => {
    const value = event.target.value;
    onSort(value);
  }

  return (
    <>
        <select onChange={handleSort} defaultValue="">
            <option value="" disabled>Sort by ...</option>
            <option value="title">Title (alphabetic, A-z)</option>
            <option value="release-date">Release Date (most recent to oldest)</option>
            <option value="vote-average">Rating (highest to lowest)</option>
            <option value="now-playing">Now Playing</option>
        </select>
    </>
  )
}

export default Sort;
