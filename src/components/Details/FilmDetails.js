import React from 'react';
import Loader from 'react-loader-spinner'
import cookie from 'react-cookies'
import { FaLongArrowAltLeft, FaHeart } from 'react-icons/fa';

import { API_KEY } from '../../config/config.js'
import ErrorPage from '../Others/ErrorPage';
import ActorsSlider from '../Sliders/ActorsSlider';
import RecommendSlider from '../Sliders/RecommendSlider';
import noposter from '../../img/noposter.png'

const Details = (props) => {
    const { details, liked, goBack, addToFavorites, deleteFromFavorites } = props;
    return (
        <div className='details'
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundColor: 'rgba(21, 16, 5, 0.85)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundBlendMode: 'darken'
            }}>
            <div className='pl-container'>
                <div className='d-flex'>
                    <button className='button-back light' onClick={() => { goBack() }}>
                        <FaLongArrowAltLeft className='back-icon' />
                        Назад
                    </button>
                    {
                        liked
                            ? <button className='button-like' onClick={() => { deleteFromFavorites() }}>
                                <FaHeart className='like-icon' />
                                Удалить из избранного
                            </button>
                            : <button className='button-like' onClick={() => { addToFavorites() }}>
                                <FaHeart className='like-icon' />
                                В избранное
                            </button>
                    }
                </div>
                <div className='pl-row details-header'>
                    <div className='pl-col-sm-4 pl-col-md-5 pl-col-lg-3 col-img'>
                        {
                            details.poster_path ?
                                <img className='details-header__poster' src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt='poster' />
                                :
                                <img className='details-header__poster' src={noposter} alt='poster' />
                        }
                    </div>
                    <div className='pl-col-sm-8 pl-col-md-7 pl-col-lg-9 info'>
                        <h2 className='info__title'>
                            {details.title}
                        </h2>
                        <h6 className='info__subtitle'>
                            {details.original_title}
                        </h6>
                        <Table details={details} />
                    </div>
                    <div className='pl-col'>
                        <div className='info__overview'>
                            <h4 className='text-bold text-center'>Описание</h4>
                            <p>
                                {details.overview ? details.overview : "Описание отсутствует"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Table = (props) => {
    const { details } = props
    return (
        <table className='info-table'>
            <tbody>
                <tr>
                    <td>Год выхода:</td>
                    <td>{details.release_date ? details.release_date.substring(4, 0) : "-"}</td>
                </tr>
                <tr>
                    <td>Рейтинг:</td>
                    <td>{details.vote_average !== 0 ? `${details.vote_average} / 10` : "-"}</td>
                </tr>
                <tr>
                    <td>Страна:</td>
                    <td>
                        <ul className='info__list'>
                            {
                                details.production_countries.length
                                    ? details.production_countries.map((item, index) => {
                                        return <li key={index}>{item.name}{details.production_countries.length - 1 === index ? '' : ','}</li>
                                    })
                                    : "-"
                            }
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Слоган:</td>
                    <td>{details.tagline ? details.tagline : "-"}</td>
                </tr>
                <tr>
                    <td>Жанры:</td>
                    <td>
                        <ul className='info__list'>
                            {
                                details.genres.length
                                    ? details.genres.map((item, index) => {
                                        return <li key={item.id}>{item.name}{details.genres.length - 1 === index ? '' : ','}</li>
                                    })
                                    : "-"
                            }
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Бюджет:</td>
                    <td>
                        {
                            details.budget !== 0
                                ? details.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " $"
                                : "-"
                        }
                    </td>
                </tr>
                <tr>
                    <td>Время:</td>
                    <td>{details.runtime !== 0 && details.runtime !== null ? `${details.runtime} мин.` : "-"}</td>
                </tr>
            </tbody>
        </table>
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
            liked: false,
            loaded: false,
            error: false
        };
    }

    componentDidMount() {
        this.getDetails();
        this.checkLiked();
        this.getActors();
        this.getVideo();
        this.getRecommended();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.filmId !== prevProps.match.params.filmId) {
            this.setState({
                error: false,
                loaded: false,
                video: null,
                liked: false
            });
            this.getDetails();
            this.checkLiked();
            this.getActors();
            this.getVideo();
            this.getRecommended();
        }
    }

    getDetails = () => {
        const DETAILS_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}?api_key=${API_KEY}&language=ru`;
        fetch(DETAILS_URL).then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).then(output => {
            this.setState({
                details: output,
                loaded: true
            });
        }).catch(error => {
            this.setState({
                loaded: true,
                error: true
            });
        });
    }

    getActors = () => {
        const ACTORS_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}/credits?api_key=${API_KEY}&language=ru`;
        fetch(ACTORS_URL).then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).then(output => {
            this.setState({
                actors: output.cast
            });
        }).catch(error => {
            this.setState({
                loaded: true,
                error: true
            });
        });
    }

    getVideo = () => {
        const VIDEO_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}/videos?api_key=${API_KEY}&language=ru`;
        fetch(VIDEO_URL).then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).then(output => {
            this.setState({
                video: output.results.length ? output.results[output.results.length - 1].key : null
            });
        })
            .catch(error => { });
    }

    getRecommended = () => {
        const RECOMEND_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}/recommendations?api_key=${API_KEY}&language=ru`;
        fetch(RECOMEND_URL).then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).then(output => {
            this.setState({
                recommended: output.results
            });
        }).catch(error => {
            this.setState({
                loaded: true,
                error: true
            });
        });
    }

    addToFavorites = () => {
        const { details } = this.state;
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

        if (cookie.loadAll().favorites === undefined) {
            cookie.save('favorites', [
                {
                    'id': details.id,
                    'poster_path': details.poster_path,
                    'vote_average': details.vote_average,
                    'title': details.title,
                    'original_title': details.original_title,
                }
            ], { path: '/', expires, maxAge: 1000000 });
        } else {
            let mas = cookie.load('favorites')
            mas.push({
                'id': details.id,
                'poster_path': details.poster_path,
                'vote_average': details.vote_average,
                'title': details.title,
                'original_title': details.original_title,
            });
            cookie.save('favorites', mas, { path: '/', expires, maxAge: 1000000 });
        }

        this.setState({
            liked: true
        })
    }

    deleteFromFavorites = () => {
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

        let arr = cookie.load('favorites');
        const urlId = Number(this.props.match.params.filmId);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === urlId) {
                arr.splice(i, 1)
            }
        }
        cookie.save('favorites', arr, { path: '/', expires, maxAge: 1000 });

        this.setState({
            liked: false
        })
    }

    checkLiked = () => {
        let arr = cookie.load('favorites');
        if (arr === undefined) return;
        const urlId = Number(this.props.match.params.filmId);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === urlId) {
                this.setState({
                    liked: true
                })
                return;
            }
        }
    }

    render() {
        const { loaded, error, details, liked, actors, video, recommended } = this.state;
        return (
            !loaded ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div>
                :
                !error ?
                    <div className='content'>
                        <Details
                            details={details}
                            liked={liked}
                            goBack={this.props.history.goBack}
                            addToFavorites={this.addToFavorites}
                            deleteFromFavorites={this.deleteFromFavorites}
                        />
                        {actors.length ? <Actors actors={actors} /> : null}
                        {video != null && <Video video={video} />}
                        {recommended.length ? <Recommended recommended={recommended} /> : null}
                    </div>
                    :
                    <ErrorPage />
        );
    }
}

export default FilmDetails;