// Cart.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { firestore } from "../../firebase";

const Cart = ({ cartItems, removeFromCart  }) => {

  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   // Fetch cart items from Firestore
  //   const fetchCartItems = async () => {
  //     try {
  //       const cartItemsCollection = await firestore.collection("cartItems").get();
  //       const cartItemsData = cartItemsCollection.docs.map((doc) => doc.data());
  //       setCartItems(cartItemsData);
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //     }
  //   };

  //   fetchCartItems();
  // }, []);
  
  // const handleRemoveFromCart = (productId) => {
  //   console.log("Removing product with ID:", productId);
  //   removeFromCart(productId);
  // };
  return (
    <div>
      <h3>Your <span>cart</span></h3>
      <ul>
        {cartItems.map((product) => (
          <div className={styles.card} key={product.id}>
            <img
              src={product.image}
              className={styles.cardImage}
              alt={product.title}
            />
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>{product.title}</h5>
              <br />
              {/* <p className={styles.cardText}>{product.description}</p> */}
              <span>{product.price}</span>
              <br />
              <button>
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </ul>
      <Link to="/home">Go back to Home</Link>
    </div>
  );
};

export default Cart;
