import React from 'react';
import Loader from 'react-loader-spinner'

import FilmWrapper from './FilmWrapper';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Serials extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            load: false
        };
    }

    componentDidMount() {
        const SERIALS_URL = 'https://api.themoviedb.org/3/discover/tv?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru';
        fetch(SERIALS_URL).then(value => {
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
                        <h3 className='content__title'>Сериалы</h3>
                        <div className='pl-row'>
                            {
                                this.state.movies.map(item => {
                                    return <FilmWrapper film={item} key={item.id} />
                                })
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

export default Serials;