import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';
import Sort from '../Sort/Sort';

const Header = ({ onSearch, onClear, onSort }) => {
    return (
        <>
            <header className="header">
                <div className="header-info">
                    <h1 className="header-title">🎥 Flixster 🎬</h1>
                    <div className="header-search">
                        <SearchForm onSearch={onSearch} onClear={onClear}/>
                    </div>
                    <div className="header-sort">
                        <Sort onSort={onSort}/>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
