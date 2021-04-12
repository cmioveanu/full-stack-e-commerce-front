import './App.css';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Header } from './features/Header/Header';
import { Banner } from './features/Banner/Banner';
import { Products } from './features/Products/Products';
import { Footer } from './features/Footer/Footer';
import { Login } from './features/Login/Login';
import { Register } from './features/Login/Register';
import { Account } from './features/Account/Account';


const App = () => {


  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <Banner leftBanner={{
              class: 'bannerLeftWatch',
              category: 'Wooden Watch',
              name: 'The Geneva'
            }}
              rightBanner={{
                class: 'bannerRightWatch',
                category: 'Wooden Watch',
                name: 'The Scandinavia'
              }}
            />

            <Products />

            <Banner leftBanner={{
              class: 'bannerLeftSunglasses',
              category: 'Wooden Sunglasses',
              name: 'The Utah'
            }}
              rightBanner={{
                class: 'bannerRightSunglasses',
                category: 'Wooden Sunglasses',
                name: 'The Idaho'
              }}
            />
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
