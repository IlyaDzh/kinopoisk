import React from 'react';
import cookie from 'react-cookies'

import { FilmWrapper, SerialWrapper } from 'components';
import './Favorites.scss'

class Favorites extends React.Component {
    constructor() {
        super();
        this.state = {
            favorites: []
        };
    }

    componentDidMount() {
        this.setState({
            favorites: cookie.load('favorites') || []
        })
    }

    render() {
        const { favorites } = this.state;
        const favLength = favorites.length;
        return (
            <div className='content'>
                <div className='pl-container'>
                    {
                        favLength !== 0
                            ? <>
                                <h3 className='content__title'>Избранные ({favLength})</h3>
                                <div className='pl-row'>
                                    {
                                        favorites.map(item => (
                                            <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob' key={item.id}>
                                                {
                                                    item.original_title ? <FilmWrapper film={item} />
                                                        : item.original_name ? <SerialWrapper serial={item} />
                                                            : null
                                                }
                                            </div>
                                        )
                                        )
                                    }
                                </div>
                            </>
                            : <h3 className='content__title'>В избранном пусто</h3>
                    }
                </div>
            </div>
        );
    }
}

export default Favorites;