import React from 'react';

class Random extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            loaded: false,
            error: false
        };
    }

    // componentDidMount() {
    //     let randomId = 12;
    //     const RANDOM_URL = `https://api.themoviedb.org/3/movie/${randomId}?api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
    //     fetch(RANDOM_URL).then(value => {
    //         if (!value.ok) {
    //             throw new Error("HTTP status " + value.status);
    //         }
    //         return value.json();
    //     }).then(output => {
    //         this.setState({
    //             movies: output.results,
    //             loaded: true
    //         });
    //     }).catch(error => {
    //         this.setState({
    //             loaded: true,
    //             error: true
    //         });
    //     });
    // }

    render() {
        return (
            <div className='content'>
                <div className='pl-container'>
                    Случайный фильм
                </div>
            </div>
        );
    }
}

export default Random;