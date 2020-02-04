import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Header from './components/Others/Header';
import Aside from './components/Others/Aside';
import Search from './components/Search';
import Popular from './components/Popular';
import Films from './components/Films';
import Serials from './components/Serials';
import People from './components/People';
// import Favorites from './components/Favorites';
// import Random from './components/Random';
import FilmDetails from './components/Details/FilmDetails';
import SerialDetails from './components/Details/SerialDetails';
import PersonDetails from './components/Details/PersonDetails';
import NetworkDetails from './components/Details/NetworkDetails';
import ErrorPage from './components/Others/ErrorPage';

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
                    <Route exact path='/search/:searchWord' component={Search} />
                    <Route exact path='/movie' component={Films} />
                    <Route exact path='/tv' component={Serials} />
                    <Route exact path='/people' component={People} />
                    {/* <Route exact path='/favorites' component={Favorites} /> */}
                    {/* <Route exact path='/random' component={Random} /> */}
                    <Route exact path='/movie/:filmId' component={FilmDetails} />
                    <Route exact path='/tv/:serialId' component={SerialDetails} />
                    <Route exact path='/person/:personId' component={PersonDetails} />
                    <Route exact path='/network/:networkId' component={NetworkDetails} />
                    <Route component={ErrorPage} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;