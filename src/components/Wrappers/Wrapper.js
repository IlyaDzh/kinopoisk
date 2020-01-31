import React from 'react';

import FilmWrapper from './FilmWrapper';
import SerialWrapper from './SerialWrapper';
import PersonWrapper from './PersonWrapper';

const Wrapper = props => (
    <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob'>
        {
            props.found.media_type === "movie" ? <FilmWrapper film={props.found} />
                : props.found.media_type === "tv" ? <SerialWrapper serial={props.found} />
                    : <PersonWrapper person={props.found} />
        }
    </div>
)

export default Wrapper;