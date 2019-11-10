import React from 'react';

import { Link } from 'react-router-dom';

const Film = props => (
    <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 pl-col-mob'>
        <Link to={`/movie/${props.film.id}`}>
            <div className='films-wrapper'>
                <div className='img-wrapper'>
                    <img className='films-wrapper_icon' src={`https://image.tmdb.org/t/p/w500/${props.film.poster_path}`} alt='icon' />
                    <span className='films-wrapper_vote'>{props.film.vote_average}</span>
                </div>
                <h6 className='films-wrapper_title' title={props.film.title}>{props.film.title}</h6>
                <h6 className='films-wrapper_subtitle' title={props.film.original_title}>{props.film.original_title}</h6>
            </div>
        </Link>
    </div>
)

export default Film;