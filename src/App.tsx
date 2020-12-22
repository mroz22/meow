import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.css';
import logo from './logo.svg';

import { useData } from './hooks/data';

import { Map } from './views/Map';
import { Control } from './views/Control';
import { Players } from './views/Players';
import { PlayerDetail } from './views/Players/Detail';
import { CommandCenter } from './views/CommandCenter';

import { Provider } from './provider';

function App() {
  const { data } = useData();

  if (data.won) {
    return (
      <div>
        You won!
      </div>
    )
  }

  if (data.lost) {
    return (
      <div>
        You lost :(
      </div>
    )
  }
  return (
    <Provider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>

            <Link to="/">
              operation meow
            </Link>
          </header>
          <Switch>

            <Route path="/map">
              <Map />
            </Route>
            <Route path="/players/:name">
              <PlayerDetail />
            </Route>
            <Route path="/players">
              <Players />
            </Route>
            <Route path="/command-center">
              <CommandCenter />
            </Route>
            <Route path="/">
              <Control />
            </Route>
          </Switch>
        </div>
      </Router>

    </Provider>

  );
}

export default App;