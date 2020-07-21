import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './page/login.js';
import List from './page/list.js';
import Detail from './page/detail.js'

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" component={Login} exact></Route>
          <Route path="/list" component={List} exact></Route>
          <Route path="/list:id" component={Detail}></Route>
        </Switch>
      </Router>
  );
}

export default App;
