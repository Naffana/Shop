import "./Header.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../Source/Cart.png";
import User from "../../Source/user.png";
import Like from "../../Source/like.png";
import Logo from "../../Source/logo1.png";

import { IProd } from "../../Types/Prod";
import { getProducts } from "../Store/Action/Action";
import { AppDispatch, RootState } from "../Store/Store";

export function Header() {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const visibelElement = () => {
    let cart = document.getElementById("cart");
    let like = document.getElementById("like");
    if (!isAuthenticated) {
      if (cart && like) {
        cart.style.display = "none";
        like.style.display = "none";
      }
    } else {
      if (cart && like) {
        cart.style.display = "flex";
        like.style.display = "flex";
      }
    }
  };

  useEffect(() => {
    dispatch(getProducts());
    visibelElement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { items } = useSelector((state: RootState) => state.products);
  const handlSearch = ({ target: { value } }: any) => {
    setSearchValue(value);
  };
  var resultSearch = items.filter((items) =>
    items.title.match(new RegExp(searchValue, "i"))
  );

  return (
    <>
      <header>
        <div className="FormSearch">
          <div className="Search">
            <input
              autoComplete="off"
              type="search"
              placeholder="Search..."
              name="s"
              id="search_tov"
              tabIndex={0}
              value={searchValue}
              onChange={(event) => {
                handlSearch(event);
              }}
            />
          </div>

          {searchValue && (
            <div
              className="box"
              id="box"
              onBlur={() => {
                setSearchValue("");
              }}
            >
              {!resultSearch.length
                ? "No result"
                : resultSearch.map((items: IProd) => {
                    return (
                      <Link
                        onClick={() => {
                          setSearchValue("");
                        }}
                        to={`/products/${items.id}`}
                        key={items.id}
                      >
                        <div className="SearchItem">
                          <img className="SearchImg" src={items.image} alt="" />
                          <div className="SearchTitle">
                            <p>{items.title.slice(0, 36)}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </div>

        <div className="Logo">
          <Link className="Logo" to="/">
            <img src={Logo} alt="" />
            <h1>Shop</h1>
          </Link>
        </div>

        <nav>
          <Link className="Cart Navigation" to="Card">
            {" "}
            <img id="cart" src={Card} alt="" />
          </Link>
          <Link className="Like Navigation" to="">
            {" "}
            <img id="like" src={Like} alt="" />
          </Link>
          <Link className="User Navigation" to="SignIn">
            {" "}
            <img src={User} alt="" />
          </Link>
        </nav>
      </header>
    </>
  );
}
