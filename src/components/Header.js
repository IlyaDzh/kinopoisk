import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import logo from '../img/logo.png';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <Link to="/" className='header__logo'>
                    <img className='header__logo-inner' src={logo} alt='Kinopoisk' />
                </Link>
                <div className='header__search'>
                    <input className='header__search-input' type='text' placeholder='Введите название фильма' autoComplete='off' />
                    <button className='header__search-btn' onClick={() => console.log("click")}><FaSearch /></button>
                </div>
                <div className='header__git'>
                    <a href='https://github.com/IlyaDzh/kinopoisk' target='_blank' rel="noopener noreferrer" className='header__git-link'>Найти на GitHub</a>
                </div>
            </header>
        );
    }
}

export default Header;