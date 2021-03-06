import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import db from "../firebase";
import Categories from "./Categories";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const sliceProductsTop = products.slice(0, 2);
  const sliceProductsBottom = products.slice(2);

  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      let tempProducts = [];
      snapshot.docs.map((doc) => {
        tempProducts.push({
          id: doc.id,
          product: doc.data(),
        });
      });
      setProducts(tempProducts);
    });
    db.collection("categories").onSnapshot((snapshot) => {
      let tempCategories = [];
      snapshot.docs.map((doc) => {
        tempCategories.push({
          id: doc.id,
          category: doc.data(),
        });
      });
      setCategories(tempCategories);
    });
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__banner"></div>

        <div className="home__content">
          <div className="home__row">
            {categories.map((category) => (
              <Categories
                key={category.id}
                title={category.category.title}
                image={category.category.image}
              />
            ))}
          </div>
          <div className="home__row">
            {sliceProductsTop.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                title={product.product.title}
                price={product.product.price}
                rating={product.product.rating}
                image={product.product.image}
              />
            ))}
          </div>

          <div className="home__row">
            {sliceProductsBottom.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                title={product.product.title}
                price={product.product.price}
                rating={product.product.rating}
                image={product.product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
