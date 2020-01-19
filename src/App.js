import React, {useReducer} from 'react';
import UsersTable from './components/UsersTable.js';
import UserForm from './components/UserForm.js';
import {NavLink, Route, Switch, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import zoomer from './reducer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [zoom, dispatch] = useReducer(zoomer, 100);

  const onZoomPlus = ()=>{
    let action = {type:"increase"};
    dispatch(action);   
    document.body.style.zoom = zoom + "%";
  }

  const onZoomOutMinus = ()=>{
    let action = {type:"decrease"};
    dispatch(action);   
    document.body.style.zoom = zoom + "%";
  }
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to="/userstable">LIST OF USERS</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/userform">NEW USER</NavLink></li>
            </ul>
            <span className="zoom" role="img" aria-label="plus" onClick={onZoomPlus}>&#10133;</span>
            <span className="zoom" role="img" aria-label="minus" onClick={onZoomOutMinus}>&#10134;</span>
          </nav>
          <Switch>
            <Route exact path="/userstable" component={UsersTable}/>
            <Route exact path="/userform" component={UserForm}/>
            <Route exact path="/editform/:id" component={UserForm}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
