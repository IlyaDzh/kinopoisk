import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const settings = {
    infinite: false,
    draggable: false,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 5
};

const KnownForSlider = (props) => {
    return (
        <div className='person-slider'>
            <Slider {...settings}>
                {
                    props.slider.map((item, index) => {
                        return <Link to={`/tv/${item.id}`} className='slider-wrapper' key={index}>
                            {
                                item.poster_path ?
                                    <img className='slider-wrapper__img' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt='' />
                                    :
                                    <img className='slider-wrapper__img' src='https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png' alt='season' />
                            }
                            <p className='slider__title' alt={item.name}>{item.name}</p>
                            <p className='slider__subtitle' alt={item.original_name}>{item.original_name}</p>
                        </Link>
                    })
                }
            </Slider>
        </div>
    );
}

export default KnownForSlider;