import React from 'react';

import Wrapper from './Wrappers/Wrapper';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            found: [],
            load: false,
            error: false
        };
    }

    componentDidMount() {
        this.getSearch();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.filmName !== prevProps.match.params.filmName) {
            this.setState({
                error: false,
                load: false
            });
            this.getSearch();
        }
    }

    getSearch = () => {
        const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?query=${this.props.match.params.filmName}&api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru&sort_by=popularity`;
        fetch(SEARCH_URL).then(value => {
            return value.json();
        }).then(output => {
            this.setState({
                found: output.results
            });
        })
    }

    render() {
        return (
            <div className='content search'>
                <div className='pl-container'>
                    <h3 className='content__title'>{this.state.found.length ? "Найдено" : "Не найдено"}</h3>
                    <div className='pl-row'>
                        {
                            this.state.found.map(item => {
                                return <Wrapper found={item} key={item.id} />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;