import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className='container'>

                    <div className='row align-items-center'>
                        <div className='col-md-3'>
                            <img className='header__logo' src='https://upload.wikimedia.org/wikipedia/ru/9/96/Kinopoisk_logo_orange.png' alt='logo' />
                        </div>
                        <div className='col'>
                            <div className='header__search'>
                                <div>Поиск</div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='header__git'>
                                git
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <nav className='header__nav'>
                                <ul className='nav'>
                                    <li><button>Афиша</button></li>
                                    <li><button>В избранном</button></li>
                                    <li><button>Случайный фильм</button></li>
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