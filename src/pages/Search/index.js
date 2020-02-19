import React from 'react';
import Loader from 'react-loader-spinner'

import { FilmWrapper, SerialWrapper, PersonWrapper } from 'components';
import { API_KEY } from 'constants/index.js';
import './Search.scss'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            found: [],
            loaded: false,
            error: false
        };
    }

    componentDidMount() {
        this.getSearch();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.searchWord !== prevProps.match.params.searchWord) {
            this.setState({
                error: false,
                loaded: false
            });
            this.getSearch();
        }
    }

    getSearch = () => {
        const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?query=${this.props.match.params.searchWord}&api_key=${API_KEY}&language=ru&sort_by=popularity`;
        fetch(SEARCH_URL).then(value => {
            if (!value.ok) {
                throw new Error("HTTP status " + value.status);
            }
            return value.json();
        }).then(output => {
            if (output.results.length === 0) {
                throw new Error();
            }
            this.setState({
                found: output.results,
                loaded: true
            });
        }).catch(error => {
            this.setState({
                loaded: true,
                error: true
            });
        });
    }

    render() {
        const { loaded, error, found } = this.state;
        const searchWord = this.props.match.params.searchWord;
        return (
            !loaded ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div>
                :
                !error ?
                    <div className='content'>
                        <div className='pl-container'>
                            <h3 className='content__title'>Найдено</h3>
                            <div className='pl-row'>
                                {
                                    found.map(item => (
                                        <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob' key={item.id}>
                                            {
                                                item.media_type === "movie" ? <FilmWrapper film={item} />
                                                    : item.media_type === "tv" ? <SerialWrapper serial={item} />
                                                        : <PersonWrapper person={item} />
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className='content'>
                        <div className='pl-container'>
                            <h3 className='content__title'>Ничего не найдено по запросу "{searchWord}"</h3>
                        </div>
                    </div>
        );
    }
}

export default Search;