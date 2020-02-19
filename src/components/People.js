import React from 'react';
import Loader from 'react-loader-spinner'

import PersonWrapper from './Wrappers/PersonWrapper';
import { API_KEY } from '../config/config.js'

class People extends React.Component {
    constructor() {
        super();
        this.state = {
            people: [],
            loaded: false
        };
    }

    componentDidMount() {
        const PEOPLE_URL = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=ru`;
        fetch(PEOPLE_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                people: output.results,
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
                        <h3 className='content__title'>Люди</h3>
                        <div className='pl-row'>
                            {
                                this.state.people.map(item => {
                                    return (
                                        <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob' key={item.id}>
                                            <PersonWrapper person={item} />
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

export default People;