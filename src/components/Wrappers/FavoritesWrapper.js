import React from 'react';

import FilmWrapper from './FilmWrapper';
import SerialWrapper from './SerialWrapper';

const FavoritesWrapper = props => (
    <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob'>
        {
            props.favorites.original_title ? <FilmWrapper film={props.favorites} />
                : props.favorites.original_name ? <SerialWrapper serial={props.favorites} />
                    : null
        }
    </div>
)

export default FavoritesWrapper;