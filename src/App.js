import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Import components
import { Header } from './features/Header/Header';
import { Banner } from './features/Banner/Banner';
import { Products } from './features/Products/Products';
import { Footer } from './features/Footer/Footer';
import { Login } from './features/Login/Login';
import { Register } from './features/Login/Register';
import { Account } from './features/Account/Account';

//Import action creators
import { logIn } from './features/Login/LoginSlice';


const App = () => {
  const dispatch = useDispatch();

  //if user is logged in on the server, set the state as logged in
  useEffect(() => {
    fetch('api/account/checkLoginStatus').then(res => {
      if (res.status === 200 || res.status === 304) {
        dispatch(logIn());
      }
    });
  }, [dispatch]);


  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <Banner />

            <Products />
          </Route>

          <Route exact path="/login">
            <main className="limitedWidth">
              <Login />
            </main>
          </Route>

          <Route exact path="/register">
            <main className="limitedWidth">
              <Register />
            </main>
          </Route>

          <Route path="/account">
            <Account />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router >
  );
}

export default App;
