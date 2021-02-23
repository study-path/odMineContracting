import './App.css';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Clients from './clients/Clients';
import ClientDetails from './clients/ClientDetails';

function App() {
  return (
    <div>      
      <BrowserRouter>
        <div>
          <Switch>
            <Redirect exact  from="/" to='/clients' />
            <Route path={'/clients'} exact component={Clients} />
            <Route path={'/clients/new'} component={ClientDetails} />
            <Route path={'/clients/:clientId/details'} component={ClientDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
