import React from 'react';
import Select from 'react-select';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import FilmWrapper from './Wrappers/FilmWrapper'
import { API_KEY, GENRES, COUNTRIES } from '../config/config.js'
import { randomInteger } from '../helpers'

class Random extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            random: [],
            randIndex: 0,
            selectedGenres: [],
            selectedCountries: [],
            value: { min: 1920, max: 2020 },
            error: false
        };
    }

    getRandom = () => {
        const { selectedGenres, selectedCountries, value } = this.state;
        let countries = selectedCountries !== null && selectedCountries.length > 0 ? selectedCountries.map(e => e.value).join('|') : "";
        let genres = selectedGenres !== null && selectedGenres.length > 0 ? selectedGenres.map(e => e.value).join(',') : "";
        const RANDOM_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ru&with_genres=${genres}&release_date.gte=${value.min}-01-01&release_date.lte=${value.max}-01-01&with_original_language=${countries}`;
        fetch(RANDOM_URL).then(value => {
            if (!value.ok) {
                throw new Error("HTTP status " + value.status);
            }
            return value.json();
        }).then(output => {
            if (output.results.length === 0) {
                throw new Error();
            }
            this.setState({
                random: output.results,
                randIndex: randomInteger(0, output.results.length - 1),
                error: false
            });
        }).catch(error => {
            this.setState({
                error: true
            })
        });
    }

    render() {
        const { selectedGenres, selectedCountries, random, randIndex, error } = this.state;
        return (
            <div className='content'>
                <div className='pl-container random'>
                    <div className='pl-row'>
                        <div className='pl-col-sm-6' style={{ marginBottom: 10 }}>
                            <Select
                                value={selectedGenres}
                                isMulti
                                placeholder='Выберите жанры'
                                onChange={value => this.setState({ selectedGenres: value })}
                                options={GENRES}
                            />
                        </div>
                        <div className='pl-col-sm-6'>
                            <Select
                                value={selectedCountries}
                                isMulti
                                placeholder='Выберите страну'
                                onChange={value => this.setState({ selectedCountries: value })}
                                options={COUNTRIES}
                            />
                        </div>
                    </div>
                    <div className='random__input'>
                        <InputRange
                            maxValue={2020}
                            minValue={1920}
                            value={this.state.value}
                            allowSameValues
                            onChange={value => this.setState({ value })}
                        />
                    </div>
                    <div className=''>
                        <button
                            className='pl-button expanded random__btn'
                            onClick={this.getRandom}
                        >
                            Случайный фильм
                        </button>
                    </div>
                    <div className='pl-row justify-content-center'>
                        <div className='pl-col-lg-2 pl-col-md-3 pl-col-sm-3 col-mob'>
                            {
                                error ? <h3 className='content__title text-center'>Не найдено</h3>
                                    : random.length ? <FilmWrapper film={random[randIndex]} /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Random;