import { useEffect, useState, useContext } from "react";
import Header from "../ui/header";
import Products from "../components/Products";
import Categories from "../components/Categories";
import FrontPage from "../components/FrontPage";

import { BASE_URL } from "../constants";

import CartContext from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";

import "../App.css";

function Home() {
  //   const [visibleCat, setVisibleCat] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // controls if sidebar exists
  const [isVisible, setIsVisible] = useState(false); // controls animation state
  const {
    handleProductsFetched,
    cart,
    filters,
    search,
    page,

    handleSetCategories,
  } = useContext(ProductContext);

  function handleMouseOver() {
    console.log("funcation reached");
  }

  function handleCategoryVisibilty() {
    setIsMounted(true); // mount the sidebar
    setTimeout(() => {
      setIsVisible(true); // fade/slide in
    }, 10); // small delay so animation triggers
  }
  function hideCategoryVisibility() {
    // setVisibleCat(false);
    setIsVisible(false); // start fade/slide out
    setTimeout(() => {
      setIsMounted(false); // unmount after animation ends
    }, 400); // match your CSS transition duration
  }

  useEffect(() => {
    if (filters.length > 0) return;

    const url = `${BASE_URL}products/search?q=${search}&limit=10&skip=${
      page * 10
    }`;
    console.log("calling url " + url);

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        handleProductsFetched(res.products); // use `res.products`, not full `res`
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [page, search, filters]);

  useEffect(() => {
    /*
      [fil1, fil2, fil3]

    */
    if (filters.length === 0) return;
    // [f1, f2, f3]
    Promise.all(
      filters.map((filter) =>
        fetch(`${BASE_URL}products/category/${filter.name}`)
          .then((res) => res.json())
          .then((res) => res.products)
      )
    ).then((res) => {
      const allProducts = [];
      res.forEach((prods) => allProducts.push(...prods));
      handleProductsFetched(allProducts);
    });

    // [Promise1, Promise2, Promise3]
    // Promise.all(r).then((res) => console.log(res));
  }, [filters]);

  useEffect(() => {
    fetch(`${BASE_URL}products/category-list`)
      .then((res) => res.json())
      .then((categories) => handleSetCategories(categories));
  }, []);

  return (
    <CartContext value={{ cartCount: cart.length, cartDetails: cart }}>
      <div className="main-container">
        {isMounted && (
          <Categories cat={isVisible} onClick={hideCategoryVisibility} />
        )}
        <Products
          cat={isVisible}
          onClick={handleCategoryVisibilty}
          onMouseOver={handleMouseOver}
        />
      </div>
    </CartContext>
  );
}

export default Home;
