import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

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
                    props.slider.map((item, index) => {
                        return <Link to={`/movie/${item.id}`} className='slider-wrapper' key={index}>
                            {
                                item.poster_path ?
                                    <img className='slider-wrapper__img' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt='poster' />
                                    :
                                    <img className='slider-wrapper__img' src='https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png' alt='poster' />
                            }
                            <p className='slider__title' title={item.title ? item.title : item.original_title}>{item.title ? item.title : item.original_title}</p>
                            <p className='slider__subtitle'>({item.release_date.substring(4, 0)})</p>
                        </Link>
                    })
                }
            </Slider>
        </div>
    );
}

export default KnownForSlider;