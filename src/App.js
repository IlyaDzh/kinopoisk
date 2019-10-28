import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Affiche from './components/Affiche';
import Favorites from './components/Favorites';
import Random from './components/Random';
import ErrorPage from './components/ErrorPage';

import 'plain-css/dist/plain.min.css';
import './css/main.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/' component={Affiche}/>
                    <Route exact path='/favorites' component={Favorites}/>
                    <Route exact path='/random' component={Random}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;