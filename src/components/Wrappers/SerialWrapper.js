import React from 'react';
import { Link } from 'react-router-dom';

import noposter from '../../img/noposter.png'

const SerialWrapper = props => {
    const { serial } = props;
    return (
        <Link to={`/tv/${serial.id}`}>
            <div className='films-wrapper'>
                <div className='img-wrapper'>
                    {
                        serial.poster_path ?
                            <img className='films-wrapper_icon' src={`https://image.tmdb.org/t/p/w500/${serial.poster_path}`} alt='icon' />
                            :
                            <img className='films-wrapper_icon' src={noposter} alt='icon' />
                    }
                    <span className='films-wrapper_vote'>{serial.vote_average !== 0 ? serial.vote_average : "-"}</span>
                </div>
                <h6 className='films-wrapper_title' title={serial.name}>{serial.name}</h6>
                <h6 className='films-wrapper_subtitle' title={serial.original_name}>{serial.original_name}</h6>
            </div>
        </Link>
    )
}

export default SerialWrapper;