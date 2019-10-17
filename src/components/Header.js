import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className='pl-container'>

                    <div className='pl-row align-items-center'>
                        <div className='pl-col-md-3'>
                            <img className='header__logo' src='https://upload.wikimedia.org/wikipedia/ru/9/96/Kinopoisk_logo_orange.png' alt='logo' />
                        </div>
                        <div className='pl-col-md-6'>
                            <div className='header__search'>
                                <div>Поиск</div>
                            </div>
                        </div>
                        <div className='pl-col-md-3'>
                            <div className='header__git'>
                                git
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