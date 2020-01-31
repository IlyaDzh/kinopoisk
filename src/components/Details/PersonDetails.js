import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ErrorPage from '../Others/ErrorPage';
import KnownForSlider from '../Sliders/KnownForSlider';

const Details = (props) => {
    return (
        <div className='person'>
            <div className='pl-container'>
                <div className='pl-row person-wrapper'>
                    <div className='pl-col-sm-4 pl-col-md-5 pl-col-lg-3 person-left'>
                        {
                            props.details.profile_path ?
                                <img className='details-header__poster' src={`https://image.tmdb.org/t/p/w500/${props.details.profile_path}`} alt='poster' />
                                :
                                <img className='details-header__poster' src={'https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png'} alt='poster' />
                        }
                        <div className='person-info'>
                            <h4 className='person-info__title'>Personal Info</h4>
                            <p>
                                <strong>Known For</strong>
                                {props.details.known_for_department ? props.details.known_for_department : "-"}
                            </p>
                            <p>
                                <strong>Gender</strong>
                                {props.details.gender === 1 ? "Female" : props.details.gender === 2 ? "Male" : "-"}
                            </p>
                            <p>
                                <strong>Birthday</strong>
                                {props.details.birthday ? props.details.birthday : "-"}
                            </p>
                            <p>
                                <strong>Place of Birth</strong>
                                {props.details.place_of_birth ? props.details.place_of_birth : "-"}
                            </p>
                            <p>
                                <strong>Official Site</strong>
                                {props.details.homepage != null ? <a href={props.details.homepage} target='_blank' rel="noopener noreferrer">{props.details.homepage}</a> : "-"}
                            </p>
                        </div>
                    </div>
                    <div className='pl-col-sm-8 pl-col-md-7 pl-col-lg-9'>
                        <div className='person-info'>
                            <h1 className='person-info__name'>
                                {props.details.name}
                            </h1>
                            <h5 className='text-bold'>Biography</h5>
                            <p>
                                {props.details.biography ? props.details.biography : `We don't have a biography for ${props.details.name}.`}
                            </p>
                        </div>
                        <KnownFor movie={props.movie} tv={props.tv} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const KnownFor = (props) => {
    return (
        <section>
            {
                props.movie.length ? (
                    <div className='slider-section'>
                        <h5 className='text-bold'>Known For (Movie)</h5>
                        <KnownForSlider slider={props.movie} />
                    </div>
                ) : null
            }
            {
                props.tv.length ? (
                    <div className='slider-section'>
                        <h5 className='text-bold'>Known For (TV)</h5>
                        <KnownForSlider slider={props.tv} />
                    </div>
                ) : null
            }
        </section>
    );
}

class PersonDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            movie: [],
            tv: [],
            load: false,
            error: false
        };
    }

    componentDidMount() {
        this.getDetails();
        this.getMovie();
        this.getTV();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.personId !== prevProps.match.params.personId) {
            this.setState({
                error: false,
                load: false
            });
            this.getDetails();
            this.getMovie();
            this.getTV();
        }
    }

    getDetails = () => {
        const DETAILS_URL = `https://api.themoviedb.org/3/person/${this.props.match.params.personId}?api_key=3ac9e9c4b5b41ada30de1c0b1e488050`;
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

    getMovie = () => {
        const MOVIE_URL = `https://api.themoviedb.org/3/person/${this.props.match.params.personId}/movie_credits?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(MOVIE_URL).then(response => {
            return response.json();
        }).then(output => {
            if (this.state.details.known_for_department === "Production" || this.state.details.known_for_department === "Writing")
                this.setState({
                    movie: output.crew
                });
            else
                this.setState({
                    movie: output.cast
                });
        });
    }

    getTV = () => {
        const TV_URL = `https://api.themoviedb.org/3/person/${this.props.match.params.personId}/tv_credits?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(TV_URL).then(response => {
            return response.json();
        }).then(output => {
            if (this.state.details.known_for_department === "Production" || this.state.details.known_for_department === "Writing")
                this.setState({
                    tv: output.crew
                });
            else
                this.setState({
                    tv: output.cast
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
                        <Details details={this.state.details} movie={this.state.movie} tv={this.state.tv} />
                    </div>
                    :
                    <ErrorPage />
        );
    }
}

export default PersonDetails;