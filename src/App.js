import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Popular from './components/Popular';
import Favorites from './components/Favorites';
import Random from './components/Random';
import FilmDetails from './components/FilmDetails';
import ErrorPage from './components/ErrorPage';

import 'plain-css/dist/plain.min.css';
import './css/main.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/kinopoisk' component={Popular} />
                    <Route exact path='/kinopoisk/favorites' component={Favorites} />
                    <Route exact path='/kinopoisk/random' component={Random} />
                    <Route exact path='/kinopoisk/movies/:filmId' component={FilmDetails} />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        );
    }
}

export default App;