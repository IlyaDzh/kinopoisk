import React from 'react';

import FilmWrapper from './FilmWrapper';

class Serials extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        const POPULAR_URL = 'https://api.themoviedb.org/3/discover/tv?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru';
        fetch(POPULAR_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                movies: output.results
            });
        })
    }

    render() {
        return (
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