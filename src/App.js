import React from "react";
import Form from './components/Form';
import {Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home'


const App = () => {

  return (
    <>

      <nav>
        <h1>Lambda Eats</h1>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Pizza</Link>
        </div>
      </nav>
      <Switch>
        <Route path='/pizza'>
          <Form />
        </Route>
        <Route path='/'>
          <Home />
        </Route>

      </Switch>
    </>
  );
};
export default App;
