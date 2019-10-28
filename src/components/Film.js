import React from 'react';

const Film = (props) => (
    <div className='pl-col-lg-3 pl-col-md-4 pl-col-sm-6'>
        <div className='films-wrapper'>
            <div className='img-wrapper'>
                <img className='films-wrapper_icon' src={`https://image.tmdb.org/t/p/w500/${props.film.poster_path}`} alt='icon' />
                <span className='films-wrapper_vote'>{props.film.vote_average}</span>
            </div>
            <h5 className='films-wrapper_title'>{props.film.title ? props.film.title : props.film.name}</h5>
            <p className='films-wrapper_desc'>{props.film.overview}</p>
        </div>
    </div>
)

export default Film;