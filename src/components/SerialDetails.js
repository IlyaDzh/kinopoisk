import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ErrorPage from './ErrorPage';
import SeasonSlider from './Sliders/SeasonSlider';
import ActorsSlider from './Sliders/ActorsSlider';

const Details = (props) => {
    return (
        <div className='details'
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.details.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundColor: 'rgba(21, 16, 5, 0.85)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundBlendMode: 'darken'
            }}>
            <div className='pl-container'>
                <div className='pl-row details-header'>
                    <div className='pl-col-sm-4 pl-col-md-5 pl-col-lg-3 col-img'>
                        {
                            props.details.poster_path ?
                                <img className='details-header__poster' src={`https://image.tmdb.org/t/p/w500/${props.details.poster_path}`} alt='poster' />
                                :
                                <img className='details-header__poster' src={'https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png'} alt='poster' />
                        }
                    </div>
                    <div className='pl-col-sm-8 pl-col-md-7 pl-col-lg-9 info'>
                        <h2 className='info__title'>
                            {props.details.name}
                        </h2>
                        <h6 className='info__subtitle'>
                            {props.details.original_name}
                        </h6>
                        <table className='info-table'>
                            <tbody>
                                <tr>
                                    <td>Год выхода:</td>
                                    <td>{props.details.first_air_date.substring(4, 0)}</td>
                                </tr>
                                <tr>
                                    <td>Рейтинг:</td>
                                    <td>{props.details.vote_average} / 10</td>
                                </tr>
                                <tr>
                                    <td>Статус:</td>
                                    <td>{props.details.in_production ? "В разработке" : "Закончено"}</td>
                                </tr>
                                <tr>
                                    <td>Количество сезонов:</td>
                                    <td>{props.details.number_of_seasons}</td>
                                </tr>
                                <tr>
                                    <td>Страна:</td>
                                    <td>{props.details.origin_country[0]}</td>
                                </tr>
                                {
                                    props.details.networks.length ?
                                        <tr>
                                            <td>Телеканал:</td>
                                            <td>
                                                <Link to={`/network/${props.details.networks[0].id}`} className='info__list-link'>{props.details.networks[0].name}</Link>
                                            </td>
                                        </tr> : null
                                }
                                <tr>
                                    <td>Режиссер:</td>
                                    <td>
                                        <ul className='info__list'>
                                            {
                                                props.details.created_by.map((item, index) => {
                                                    return <li key={item.id}>
                                                        <Link to={`/person/${item.id}`} className='info__list-link'>{item.name}</Link>
                                                        {props.details.created_by.length - 1 === index ? '' : ','}
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Жанры:</td>
                                    <td>
                                        <ul className='info__list'>
                                            {
                                                props.details.genres.map((item, index) => {
                                                    return <li key={item.id}>{item.name.toLowerCase()}{props.details.genres.length - 1 === index ? '' : ','}</li>
                                                })
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='pl-col'>
                        <div className='info__overview'>
                            <h4 className='text-bold text-center'>Сюжет</h4>
                            <p>
                                {props.details.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Seasons = (props) => {
    return (
        <div className='slider-section'>
            <h4 className='text-bold text-center'>Сезоны:</h4>
            <SeasonSlider slider={props.seasons} />
        </div>
    );
}

const Actors = (props) => {
    return (
        <div className='slider-section'>
            <h4 className='text-bold text-center'>В главных ролях:</h4>
            <ActorsSlider slider={props.actors} />
        </div>
    );
}

const Video = (props) => {
    return (
        <div className='video'>
            <h4 className='text-bold text-center'>Трейлер:</h4>
            <iframe
                width="100%" height="526"
                title="trailer"
                src={`https://www.youtube.com/embed/${props.video}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

class SerialDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            actors: [],
            video: null,
            load: false,
            error: false
        };
    }

    componentDidMount() {
        this.getDetails();
        this.getActors();
        this.getVideo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.serialId !== prevProps.match.params.serialId) {
            this.setState({
                error: false,
                load: false
            });
            this.getDetails();
            this.getActors();
            this.getVideo();
        }
    }

    getDetails = () => {
        const DETAILS_URL = `https://api.themoviedb.org/3/tv/${this.props.match.params.serialId}?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(DETAILS_URL).then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).then(output => {
            this.setState({
                details: output,
                load: true
            });
        }).catch(error => {
            this.setState({
                load: true,
                error: true
            });
        });
    }

    getActors = () => {
        const ACTORS_URL = `https://api.themoviedb.org/3/tv/${this.props.match.params.serialId}/credits?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(ACTORS_URL).then(response => {
            return response.json();
        }).then(output => {
            this.setState({
                actors: output.cast
            });
        });
    }

    getVideo = () => {
        const VIDEO_URL = `https://api.themoviedb.org/3/tv/${this.props.match.params.serialId}/videos?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(VIDEO_URL).then(response => {
            return response.json();
        }).then(output => {
            this.setState({
                video: output.results[output.results.length - 1].key
            });
        }).catch(error => {
            this.setState({
                video: null
            });
        });
    }

    render() {
        return (
            !this.state.load ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div>
                :
                !this.state.error ?
                    <div className='content'>
                        <Details details={this.state.details} />
                        {this.state.details.seasons ? <Seasons seasons={this.state.details.seasons} /> : null}
                        {this.state.actors.length ? <Actors actors={this.state.actors} /> : null}
                        {this.state.video ? <Video video={this.state.video} /> : null}
                    </div>
                    :
                    <ErrorPage />
        );
    }
}

export default SerialDetails;