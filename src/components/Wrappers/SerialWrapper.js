import React from 'react';
import { Link } from 'react-router-dom';

const SerialWrapper = props => {
    return (
        <Link to={`/tv/${props.serial.id}`}>
            <div className='films-wrapper'>
                <div className='img-wrapper'>
                    {
                        props.serial.poster_path ?
                            <img className='films-wrapper_icon' src={`https://image.tmdb.org/t/p/w500/${props.serial.poster_path}`} alt='icon' />
                            :
                            <img className='films-wrapper_icon' src={'https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png'} alt='icon' />
                    }
                    <span className='films-wrapper_vote'>{props.serial.vote_average}</span>
                </div>
                <h6 className='films-wrapper_title' title={props.serial.name}>{props.serial.name}</h6>
                <h6 className='films-wrapper_subtitle' title={props.serial.original_name}>{props.serial.original_name}</h6>
            </div>
        </Link>
    )
}

export default SerialWrapper;