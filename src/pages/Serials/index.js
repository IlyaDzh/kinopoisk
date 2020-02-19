import React from 'react';
import Loader from 'react-loader-spinner'

import { SerialWrapper } from 'components';
import { API_KEY } from 'constants/index.js';
import './Serials.scss'

class Serials extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            loaded: false
        };
    }

    componentDidMount() {
        const SERIALS_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=ru`;
        fetch(SERIALS_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                movies: output.results,
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
                        <h3 className='content__title'>Сериалы</h3>
                        <div className='pl-row'>
                            {
                                this.state.movies.map(item => {
                                    return (
                                        <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob' key={item.id}>
                                            <SerialWrapper serial={item} />
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

export default Serials;