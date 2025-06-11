import React from 'react';
import SearchForm from './SearchForm';
import './Header.css';

const Header = ({ onSearch, onClear }) => {
    return (
        <>
            <header className="header">
                <div className="header-info">
                    <h1 className="header-title">🎥Flixster🎬</h1>
                    <div className="header-search">
                        <SearchForm onSearch={onSearch} onClear={onClear}/>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
