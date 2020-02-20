import React from 'react'

import { ActorsSlider } from 'components';
import './Actors.scss'

const Actors = ({ actors }) => {
    return (
        <div className='slider-section'>
            <h4 className='text-bold text-center'>В главных ролях:</h4>
            <ActorsSlider slider={actors} />
        </div>
    );
}

export default Actors;