import React from 'react';
import Loader from 'react-loader-spinner'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class FilmDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            load: false
        };
    }

    componentDidMount() {
        const DETAILS_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(DETAILS_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                details: output,
                load: true
            });
        })
    }

    render() {
        return (
            !this.state.load ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div> :
                <div className='content details'
                    // style={{
                    //     backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.details.backdrop_path})`,
                    //     backgroundSize: 'cover',
                    //     backgroundRepeat: 'no-repeat',
                    //     backgroundPosition: 'center center'
                    // }}
                >
                    <div className='details-overlay'>
                        <img className='details-overlay__img' src={`https://image.tmdb.org/t/p/original/${this.state.details.backdrop_path}`} alt={this.state.details.title} />
                    </div>
                    <div className='details-wrapper info'>
                        <div className='info__vote'>
                            {this.state.details.vote_average}
                        </div>
                        <div className='info__title'>
                            {this.state.details.title}
                        </div>
                        <div className='info__subtitle'>
                            {this.state.details.original_title}
                        </div>
                        <div className='info__date'>
                            {this.state.details.release_date.substring(4, 0)}
                        </div>
                        <ul className='info__genres'>
                            {
                                this.state.details.genres.map((item, index) => {
                                    return <li key={item.id}>{ (index ? '| ' : '') + item.name}</li>
                                })
                            }
                        </ul>
                        <div className='info__time'>
                            {this.state.details.runtime}
                        </div>
                        <div className='info__budget'>
                            ${this.state.details.budget}
                        </div>
                        <div className='info__tagline'>
                            {this.state.details.tagline}
                        </div>
                        <div className='info__overview'>
                            {this.state.details.overview}
                        </div>
                    </div>
                </div>
        );
    }
}

export default FilmDetails;