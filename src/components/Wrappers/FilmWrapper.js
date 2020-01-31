import React from 'react';
import { Link } from 'react-router-dom';

const FilmWrapper = props => {
    return (
        <Link to={`/movie/${props.film.id}`}>
            <div className='films-wrapper'>
                <div className='img-wrapper'>
                    {
                        props.film.poster_path ?
                            <img className='films-wrapper_icon' src={`https://image.tmdb.org/t/p/w500/${props.film.poster_path}`} alt='icon' />
                            :
                            <img className='films-wrapper_icon' src={'https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png'} alt='icon' />
                    }
                    <span className='films-wrapper_vote'>{props.film.vote_average}</span>
                </div>
                <h6 className='films-wrapper_title' title={props.film.title}>{props.film.title}</h6>
                <h6 className='films-wrapper_subtitle' title={props.film.original_title}>{props.film.original_title}</h6>
            </div>
        </Link>
    )
}

export default FilmWrapper;