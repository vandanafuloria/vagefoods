import Cart from "../components/CartLogo";
import { useContext } from "react";
import { useNavigate } from "react-router";
import CartProducts from "./CartProducts";
import Liked from "./Liked";

import { ProductContext } from "../context/ProductContext";
import CartLogo from "../components/CartLogo";
export default function Header() {
  const navigate = useNavigate();
  const { search, handleSearch } = useContext(ProductContext);
  return (
    <div className="main-header">
      <header>
        <span
          className={"cart-logo"}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          {" "}
          <i className="fa-brands fa-shopify"></i>
        </span>

        <div className="search-bar">
          <input
            type="search"
            placeholder="Its a click away! "
            value={search}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <Liked />

        <CartLogo />
      </header>
    </div>
  );
}
