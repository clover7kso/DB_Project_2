import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Hospital from './pages/Hospital';
import Manager from './pages/Manager';
import Statistic from './pages/Statistic';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/hospital" component={Hospital} />
        <Route path="/Manager" component={Manager} />
        <Route path="/Statistic" component={Statistic} />
      </div>
    );
  }
}
export default App;
