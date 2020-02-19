import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import noposter from '../../img/noposter.png'

const settings = {
    infinite: false,
    draggable: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 4
};

const KnownForSlider = (props) => {
    return (
        <div className='person-slider'>
            <Slider {...settings}>
                {
                    props.slider.map(item => {
                        return <Link to={`/${item.episode_count ? "tv" : "movie"}/${item.id}`} className='slider-wrapper' key={item.id}>
                            {
                                item.poster_path ?
                                    <img className='slider-wrapper__img' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt='poster' />
                                    :
                                    <img className='slider-wrapper__img' src={noposter} alt='poster' />
                            }
                            {
                                item.episode_count ?
                                    <p className='slider__title' title={item.name ? item.name : item.original_name}>
                                        {item.name ? item.name : item.original_name}
                                    </p>
                                    : <p className='slider__title' title={item.title ? item.title : item.original_title}>
                                        {item.title ? item.title : item.original_title}
                                    </p>
                            }
                            <p className='slider__subtitle'>
                                {item.release_date ? item.release_date.substring(4, 0) + " г." : item.first_air_date ? item.first_air_date.substring(4, 0) + " г." : "unknown"}
                            </p>
                        </Link>
                    })
                }
            </Slider>
        </div>
    );
}

export default KnownForSlider;