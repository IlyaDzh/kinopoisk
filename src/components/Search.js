import React from 'react';
import Loader from 'react-loader-spinner'

import Wrapper from './Wrappers/Wrapper';

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
        const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?query=${this.props.match.params.searchWord}&api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru&sort_by=popularity`;
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
                                    found.map(item => {
                                        return <Wrapper found={item} key={item.id} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className='content search'>
                        <div className='pl-container'>
                            <h3 className='content__title'>Ничего не найдено по запросу "{searchWord}"</h3>
                        </div>
                    </div>
        );
    }
}

export default Search;