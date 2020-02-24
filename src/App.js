import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './App.css';
import Ticker from './components/Ticker'
import NavbarWithRouter from './components/Navbar'
import Settings from './components/Settings';
import About from './components/About';

const App = () => {
  return (
    <div className='container-fluid'>
      <div className='header'>
        <h1>Pomodoro</h1>
      </div>
      <Router className='container'>
        <div>
          <NavbarWithRouter />
          <Route
            path='/home'
            render={(routeProps) => <Ticker {...routeProps} />}
          />
          <Route path='/settings' render={(routeProps) => <Settings {...routeProps} />} />
          <Route path='/about' render={() => <About />} />
        </div>
      </Router>
    </div>
  );
}

export default App;