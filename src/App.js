import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Header } from './components/Header/Header';
import { Banner } from './components/Banner/Banner';
import { Bestsellers } from './components/Bestsellers/Bestsellers';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';
import { Account } from './components/Account/Account';
import { Cart } from './components/Cart/Cart';

function App() {

  const [name, setName] = useState("");


  const [cart, setCart] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [total, setTotal] = useState(0);

  //cart methods
  const addToCart = (product) => {
    const productIndex = cart.indexOf(product);
    if (productIndex == -1) {
      product.quantity = 1;
      setCart([...cart, product]);
    }
    else {
      const newCart = [...cart];

      const newProduct = newCart[productIndex];
      newProduct.quantity++;

      newCart.slice(productIndex)
      setCart(newCart);
    }
    setItemsInCart(itemsInCart + 1);
  }

  const removeFromCart = (product) => {
    if (product.quantity === 1) {
      setCart(cart => cart.filter(item => item.id !== product.id));
    }
    else {
      const newCart = [...cart];
      const productIndex = newCart.indexOf(product);
      newCart[productIndex].quantity--;
      setCart(newCart);
    }
    setItemsInCart(itemsInCart - 1);
  }

  const removeAllFromCart = (product) => {
    const amountToRemove = product.quantity * product.unit_price;
    total - amountToRemove <= 0 ? setTotal(0) : setTotal(oldTotal => oldTotal - amountToRemove);

    setCart(cart => cart.filter(item => item.id !== product.id));
    setItemsInCart(itemsInCart - product.quantity);
  }

  const showCart = () => {
    const cartContainer = document.querySelector('.cart');
    cartContainer.style.className == 'isShown'
      ? cartContainer.style.className = 'isHidden'
      : cartContainer.style.className = 'isSHown';
  }

  const addToTotal = (amount) => {
    console.log("adding to total..");
    setTotal(old => old + parseFloat(amount));
  }

  const removeFromTotal = (amount) => {
    console.log("removing from total..");
    total - amount <= 0 ? setTotal(0) : setTotal(oldTotal => oldTotal - parseFloat(amount));
  }

  const showHideCart = () => {
    const cart = document.querySelector('#cart');
    if (cart.style.minWidth !== '300px') {
      cart.style.minWidth = '300px';
      cart.style.padding = '3rem';
    } else {
      cart.style.minWidth = '0';
      cart.style.padding = '0';
    }
  }





  return (
    <Router>
      <div className="App">
        <Header showHideCart={showHideCart}
          cart={cart}
          itemsInCart={itemsInCart}
          name={name}
          setName={setName} />
        <Cart cart={cart}
          showCart={showCart}
          itemsInCart={itemsInCart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          addToTotal={addToTotal}
          removeFromTotal={removeFromTotal}
          total={total}
          removeAllFromCart={removeAllFromCart}
        />

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

            <Bestsellers addToCart={addToCart}
              addToTotal={addToTotal}
              productsListUrl="http://localhost:8080/products"
            />

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
          
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/account">
            <Account
              name={name}
              setName={setName} />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
