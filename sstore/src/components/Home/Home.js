import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link, useLocation } from "react-router-dom";

import Footer from "../Footer/Footer";
// import Footer from "../Footer/Footer";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    // Perform the search logic here with the searchQuery
    console.log("Performing search with query:", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className={styles.container}>
      <div className={styles.cardContainer}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <img src={product.image} className={styles.cardImage} alt={product.title} />
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>{product.title}</h5><br/>
              {/* <p className={styles.cardText}>{product.description}</p> */}
              <span>${product.price}</span><br/>
              <button  className="btn bg-none text-primary align-self-end col-md-6" 
                onClick={() => {setModalShow(true)}}>view
              </button>
              <Link href="/cart" className={styles.btnPrimary} onClick={() => addToCart(product)}>
                Add to cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;

