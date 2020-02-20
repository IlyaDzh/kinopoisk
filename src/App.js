import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import { Header, Aside, Error } from 'components';
import {
    Search, Films, Serials, People, Upcoming, Favorites, Random,
    FilmDetails, SerialDetails, PersonDetails, NetworkDetails
} from 'pages';

import 'styles/app.scss';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Header />
                <Aside />
                <Switch>
                    <Route exact path='/search/:searchWord' component={Search} />

                    <Route exact path='/' component={Films} />
                    <Route exact path='/tv' component={Serials} />
                    <Route exact path='/people' component={People} />
                    <Route exact path='/upcoming' component={Upcoming} />
                    <Route exact path='/favorites' component={Favorites} />
                    <Route exact path='/random' component={Random} />

                    <Route exact path='/movie/:filmId' component={FilmDetails} />
                    <Route exact path='/tv/:serialId' component={SerialDetails} />
                    <Route exact path='/person/:personId' component={PersonDetails} />
                    <Route exact path='/network/:networkId' component={NetworkDetails} />

                    <Route component={Error} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;