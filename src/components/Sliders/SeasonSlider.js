import React from 'react';
import Slider from "react-slick";

const settings = {
    infinite: false,
    swipe: false,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 5
};

const SeasonSlider = (props) => {
    return (
        <div className='slider'>
            <Slider {...settings}>
                {
                    props.slider.map((item, index) => {
                        return <div className='slider-wrapper' key={index}>
                            {
                                item.poster_path ?
                                    <img className='slider-wrapper__img' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt='season' />
                                    :
                                    <img className='slider-wrapper__img' src='https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png' alt='season' />
                            }
                            <p className='slider__title'>{item.name}</p>
                            <p className='slider__subtitle'>{item.air_date}</p>
                        </div>
                    })
                }
            </Slider>
        </div>
    );
}

export default SeasonSlider;