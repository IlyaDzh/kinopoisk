import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ErrorPage from '../Others/ErrorPage';
import ActorsSlider from '../Sliders/ActorsSlider';
import RecommendSlider from '../Sliders/RecommendSlider';

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
                            {props.details.title}
                        </h2>
                        <h6 className='info__subtitle'>
                            {props.details.original_title}
                        </h6>
                        <table className='info-table'>
                            <tbody>
                                <tr>
                                    <td>Год выхода:</td>
                                    <td>{props.details.release_date ? props.details.release_date.substring(4, 0) : "-"}</td>
                                </tr>
                                <tr>
                                    <td>Рейтинг:</td>
                                    <td>{props.details.vote_average} / 10</td>
                                </tr>
                                <tr>
                                    <td>Страна:</td>
                                    <td>
                                        <ul className='info__list'>
                                            {
                                                props.details.production_countries.map((item, index) => {
                                                    return <li key={index}>{item.name}{props.details.production_countries.length - 1 === index ? '' : ','}</li>
                                                })
                                            }
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Слоган:</td>
                                    <td>{props.details.tagline ? props.details.tagline : "-"}</td>
                                </tr>
                                <tr>
                                    <td>Жанры:</td>
                                    <td>
                                        <ul className='info__list'>
                                            {
                                                props.details.genres.map((item, index) => {
                                                    return <li key={item.id}>{item.name}{props.details.genres.length - 1 === index ? '' : ','}</li>
                                                })
                                            }
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Бюджет:</td>
                                    <td>${props.details.budget}</td>
                                </tr>
                                <tr>
                                    <td>Время:</td>
                                    <td>{props.details.runtime} мин.</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className='pl-col'>
                        <div className='info__overview'>
                            <h4 className='text-bold text-center'>Описание</h4>
                            <p>
                                {props.details.overview ? props.details.overview : "Описание отсутствует"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
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

const Recommended = (props) => {
    return (
        <div className='slider-section'>
            <h4 className='text-bold text-center'>Рекомендуемое:</h4>
            <RecommendSlider slider={props.recommended} type="movie" />
        </div>
    );
}

class FilmDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            actors: [],
            recommended: [],
            video: null,
            load: false,
            error: false
        };
    }

    componentDidMount() {
        this.getDetails();
        this.getActors();
        this.getVideo();
        this.getRecommended();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.filmId !== prevProps.match.params.filmId) {
            this.setState({
                error: false,
                load: false
            });
            this.getDetails();
            this.getActors();
            this.getVideo();
            this.getRecommended();
        }
    }

    getDetails = () => {
        const DETAILS_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
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
        const ACTORS_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}/credits?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(ACTORS_URL).then(response => {
            return response.json();
        }).then(output => {
            this.setState({
                actors: output.cast
            });
        });
    }

    getVideo = () => {
        const VIDEO_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}/videos?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
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

    getRecommended = () => {
        const RECOMEND_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}/recommendations?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(RECOMEND_URL).then(response => {
            return response.json();
        }).then(output => {
            this.setState({
                recommended: output.results
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
                        {this.state.actors.length ? <Actors actors={this.state.actors} /> : null}
                        {this.state.video ? <Video video={this.state.video} /> : null}
                        {this.state.recommended.length ? <Recommended recommended={this.state.recommended} /> : null}
                    </div>
                    :
                    <ErrorPage />
        );
    }
}

export default FilmDetails;