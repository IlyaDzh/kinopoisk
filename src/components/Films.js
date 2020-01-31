import React from 'react';
import Loader from 'react-loader-spinner'

import FilmWrapper from './Wrappers/FilmWrapper';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Films extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            load: false
        };
    }

    componentDidMount() {
        const FILMS_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru';
        fetch(FILMS_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                movies: output.results,
                load: true
            });
        })
    }

    render() {
        return (
            !this.state.load ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div>
                :
                <div className='content'>
                    <div className='pl-container'>
                        <h3 className='content__title'>Фильмы</h3>
                        <div className='pl-row'>
                            {
                                this.state.movies.map(item => {
                                    return (
                                        <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob' key={item.id}>
                                            <FilmWrapper film={item} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

export default Films;