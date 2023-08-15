import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './views/Home/home';
import Detail from './views/Detail/Detail';
import Create from './views/Create/Create';
import Landing from './views/Landing/Landing';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route path='/create' component={Create} />
          <Route path='/detail/:id' component={Detail} />
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;
