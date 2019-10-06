import React from 'react';

import Header from './components/Header';
import Content from './components/Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Content />
            </div>
        );
    }
}

export default App;