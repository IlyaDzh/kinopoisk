import React from 'react'

import { SeasonSlider } from 'components';
import './Seasons.scss';

const Seasons = ({ seasons }) => {
    return (
        <div className='slider-section'>
            <h4 className='text-bold text-center'>Сезоны:</h4>
            <SeasonSlider slider={seasons} />
        </div>
    );
}

export default Seasons;