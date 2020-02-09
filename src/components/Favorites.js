import React from 'react';
import cookie from 'react-cookies'

import FavoritesWrapper from './Wrappers/FavoritesWrapper';

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
                                        favorites.map(item => {
                                            return <FavoritesWrapper favorites={item} key={item.id} />
                                        })
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