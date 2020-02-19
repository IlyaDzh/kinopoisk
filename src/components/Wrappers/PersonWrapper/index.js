import React from 'react';
import { Link } from 'react-router-dom';

import noposter from 'img/noposter.png'
import './PersonWrapper.scss';

const PersonWrapper = props => {
    const { person } = props;
    return (
        <Link to={`/person/${person.id}`}>
            <div className='films-wrapper'>
                <div className='img-wrapper'>
                    {
                        person.profile_path ?
                            <img className='films-wrapper_icon' src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt='icon' />
                            :
                            <img className='films-wrapper_icon' src={noposter} alt='icon' />
                    }
                </div>
                <h6 className='films-wrapper_title' title={person.name}>{person.name}</h6>
                <h6 className='films-wrapper_subtitle'>{person.known_for_department}</h6>
            </div>
        </Link>
    )
}

export default PersonWrapper;