import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaFilm, FaDesktop, FaHeart, FaRandom } from 'react-icons/fa';

class Aside extends React.Component {
    render() {
        return (
            <div className='aside'>
                <nav className='aside-nav'>
                    <ul className='aside-nav__list'>
                        <li>
                            <Link className='pl-button link' to="/">
                                <FaStar className='aside-icon' />
                                Популярные
                            </Link>
                        </li>
                        <li>
                            <Link className='pl-button link' to="/films">
                                <FaFilm className='aside-icon' />
                                Фильмы
                            </Link>
                        </li>
                        <li>
                            <Link className='pl-button link' to="/serials">
                                <FaDesktop className='aside-icon' />
                                Сериалы
                            </Link>
                        </li>
                        <li>
                            <Link className='pl-button link' to="/favorites">
                                <FaHeart className='aside-icon' />
                                В избранном
                            </Link>
                        </li>
                        <li>
                            <Link className='pl-button link' to="/random">
                                <FaRandom className='aside-icon' />
                                Случайный фильм
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Aside;