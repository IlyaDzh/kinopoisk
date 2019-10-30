import React from 'react';

class FilmDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: []
        };
    }

    componentDidMount() {
        const DETAILS_URL = `https://api.themoviedb.org/3/movie/${this.props.match.params.filmId}?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
        fetch(DETAILS_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                details: output
            });
        })
    }

    render() {
        return (
            <div className='details'
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
                <div className='pl-container'>
                    <div className='pl-row'>
                        <div className='pl-col'>
                            <div className='details-'>
                                {this.state.details.title}
                            </div>
                            <div className='details-'>
                                {this.state.details.overview}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default FilmDetails;