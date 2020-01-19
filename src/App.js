import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Header from './components/Header';
import Aside from './components/Aside';
import Search from './components/Search';
import Popular from './components/Popular';
import Serials from './components/Serials';
// import Favorites from './components/Favorites';
// import Random from './components/Random';
import FilmDetails from './components/FilmDetails';
import SerialDetails from './components/SerialDetails';
import ErrorPage from './components/ErrorPage';

import 'plain-css/dist/plain.min.css';
import './css/main.css';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Header />
                <Aside />
                <Switch>
                    <Route exact path='/' component={Popular} />
                    {/* <Route exact path='/favorites' component={Favorites} /> */}
                    <Route exact path='/search/:filmName' component={Search} />
                    <Route exact path='/serials' component={Serials} />
                    {/* <Route exact path='/random' component={Random} /> */}
                    <Route exact path='/movie/:filmId' component={FilmDetails} />
                    <Route exact path='/tv/:serialId' component={SerialDetails} />
                    <Route component={ErrorPage} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;