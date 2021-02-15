import './App.css';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Clients from './clients/Clients';
import NewClient from './clients/NewClient';

function App() {
  return (
    <div>      
      <BrowserRouter>
        <div>
          <Switch>
            <Redirect exact  from="/" to='/clients' />
            <Route path={'/clients'} exact component={Clients} />
            <Route path={'/clients/new'} component={NewClient} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
