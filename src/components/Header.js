import React from 'react';

import { FaGithub } from 'react-icons/fa';
import logo from '../img/logo.png';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className='pl-container'>

                    <div className='pl-row align-items-center'>
                        <div className='pl-col-md-3'>
                            <a href='#'>
                                <img className='header__logo' src={logo} alt='Kinopoisk' />
                            </a>
                        </div>
                        <div className='pl-col-md-6'>
                            <div className='header__search'>
                                <input className='header__search-input' type='text' placeholder='Введите название фильма' autoComplete='off' />
                            </div>
                        </div>
                        <div className='pl-col-md-3'>
                            <div className='header__git'>
                                <a href='https://github.com/IlyaDzh/kinopoisk' target='_blank' className='header__git-link'>Find this on GitHub</a>
                            </div>
                        </div>
                    </div>

                    <div className='pl-row'>
                        <div className='pl-col d-flex justify-content-center'>
                            <nav className='header-nav'>
                                <ul className='header-nav__list'>
                                    <li><button className='pl-button link'>Афиша</button></li>
                                    <li><button className='pl-button link'>В избранном</button></li>
                                    <li><button className='pl-button link'>Случайный фильм</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </header>
        );
    }
}

export default Header;