import React from 'react';
import Loader from 'react-loader-spinner'

import { FilmWrapper } from 'components';
import { API_KEY } from 'constants/index.js';
import './Upcoming.scss'

class Upcoming extends React.Component {
    constructor() {
        super();
        this.state = {
            upcoming: [],
            loaded: false
        };
    }

    componentDidMount() {
        const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ru&page=1&region=ru`;
        fetch(UPCOMING_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                upcoming: output.results,
                loaded: true
            });
        })
    }

    render() {
        return (
            !this.state.loaded ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div>
                :
                <div className='content'>
                    <div className='pl-container'>
                        <h3 className='content__title'>Скоро выйдет</h3>
                        <div className='pl-row'>
                            {
                                this.state.upcoming.map(item => {
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

export default Upcoming;