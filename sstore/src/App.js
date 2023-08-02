import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { auth } from "./firebase";
import Navbar from "./components/Navabr/Navbar";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import AddProducts from "./components/AddProduct/AddProduct";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
      console.log(user);
    });
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

//   const removeFromCart = (productId) => {
//     console.log("Removing product with ID:", productId);
//   const updatedCartItems = cartItems.filter((item) => item.id !== productId);
//   setCartItems(updatedCartItems);
// };
  
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Navbar name={userName} cartItems={cartItems}/>
      </React.StrictMode>

      <Routes>
      <Route
          exact
          path="/"
          element={userName ? <Home addToCart={addToCart} /> : <Login />}
        />
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home addToCart={addToCart}/>} />
        {/* <Route path="/cart" element={<Cart cartItems={cartItems}/>} /> */}
        <Route
          path="/cart"
          element={userName ? <Cart cartItems={cartItems}/> : <Navigate to="/" /> 
          }
        />
         <Route path="/profile" element={<Profile />} />
         <Route path="/addproducts" element={AddProducts} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

