import React from 'react';
import Loader from 'react-loader-spinner'

import PersonWrapper from './Wrappers/PersonWrapper';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class People extends React.Component {
    constructor() {
        super();
        this.state = {
            people: [],
            load: false
        };
    }

    componentDidMount() {
        const PEOPLE_URL = 'https://api.themoviedb.org/3/person/popular?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru';
        fetch(PEOPLE_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                people: output.results,
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