import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import noposter from '../../img/noposter.png'

const settings = {
    infinite: false,
    draggable: false,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 5
};

const ActorsSlider = (props) => {
    return (
        <div className='slider'>
            <Slider {...settings}>
                {
                    props.slider.map(item => {
                        return <Link to={`/person/${item.id}`} className='slider-wrapper' key={item.id}>
                            {
                                item.profile_path ?
                                    <img className='slider-wrapper__img' src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`} alt='actor' />
                                    :
                                    <img className='slider-wrapper__img' src={noposter} alt='actor' />
                            }
                            <p className='slider__title' title={item.name}>{item.name}</p>
                            <p className='slider__subtitle' title={item.character}>{item.character}</p>
                        </Link>
                    })
                }
            </Slider>
        </div>
    );
}

export default ActorsSlider;