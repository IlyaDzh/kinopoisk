import React from 'react';
import Loader from 'react-loader-spinner'

import ErrorPage from './ErrorPage';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class FilmDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            load: false,
            error: false
        };
    }

    componentDidMount() {
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

    componentDidUpdate(prevProps) {
        if (this.props.match.params.filmId !== prevProps.match.params.filmId) {
            this.setState({
                error: false,
                load: false
            });
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
    }

    render() {
        return (
            !this.state.load ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div> :
                !this.state.error ?
                    <div className='content details'
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.details.backdrop_path})`,
                            backgroundSize: 'cover',
                            backgroundColor: 'rgba(21, 16, 5, 0.85)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundBlendMode: 'darken'
                        }}
                    >
                        <div className='pl-container'>
                            <div className='pl-row details-header'>
                                <div className='pl-col-sm-4 pl-col-md-5 pl-col-lg-3 col-img'>
                                    <img className='details-header__poster' src={`https://image.tmdb.org/t/p/w500/${this.state.details.poster_path}`} alt='poster' />
                                </div>
                                <div className='pl-col-sm-8 pl-col-md-7 pl-col-lg-9 info'>
                                    <h2 className='info__title'>
                                        {this.state.details.title}
                                    </h2>
                                    <h6 className='info__subtitle'>
                                        {this.state.details.original_title}
                                    </h6>
                                    <table className='info-table'>
                                        <tbody>
                                            <tr>
                                                <td>Рейтинг:</td>
                                                <td>{this.state.details.vote_average} / 10</td>
                                            </tr>
                                            <tr>
                                                <td>Год выхода:</td>
                                                <td>{this.state.details.release_date.substring(4, 0)}</td>
                                            </tr>
                                            <tr>
                                                <td>Страна:</td>
                                                <td>
                                                    <ul className='info__country'>
                                                        {
                                                            this.state.details.production_countries.map((item, index) => {
                                                                return <li key={index}>{(index ? ', ' : '') + item.name}</li>
                                                            })
                                                        }
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Слоган:</td>
                                                <td>{this.state.details.tagline}</td>
                                            </tr>
                                            <tr>
                                                <td>Жанры:</td>
                                                <td>
                                                    <ul className='info__genres'>
                                                        {
                                                            this.state.details.genres.map((item) => {
                                                                return <li key={item.id}>{item.name}</li>
                                                            })
                                                        }
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Бюджет:</td>
                                                <td>${this.state.details.budget}</td>
                                            </tr>
                                            <tr>
                                                <td>Время:</td>
                                                <td>{this.state.details.runtime} мин.</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div className='pl-col'>
                                    <div className='info__overview'>
                                        <h4 className='text-bold text-center'>Сюжет</h4>
                                        <p>
                                            {this.state.details.overview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <ErrorPage />
        );
    }
}

export default FilmDetails;