import React from 'react';
import { Link } from 'react-router-dom';

class Aside extends React.Component {
    render() {
        return (
            <div className='aside'>
                <nav className='aside-nav'>
                    <ul className='aside-nav__list'>
                        <li><Link className='pl-button link' to="/">Популярные</Link></li>
                        <li><Link className='pl-button link' to="/">Фильмы</Link></li>
                        <li><Link className='pl-button link' to="/">Сериалы</Link></li>
                        <li><Link className='pl-button link' to="/favorites">В избранном</Link></li>
                        <li><Link className='pl-button link' to="/random">Случайный фильм</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Aside;