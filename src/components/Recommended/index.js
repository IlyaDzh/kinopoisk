import React from 'react'

import { RecommendSlider } from 'components';
import './Recommended.scss'

const Recommended = ({recommended, type}) => {
    return (
        <div className='slider-section'>
            <h4 className='text-bold text-center'>Рекомендуемое:</h4>
            <RecommendSlider slider={recommended} type={type} />
        </div>
    );
}

export default Recommended;