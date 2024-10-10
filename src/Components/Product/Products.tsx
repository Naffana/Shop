import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { IProd } from "../../Types/Prod";
import { getProducts } from "../Store/Action/Action";
import { AppDispatch, RootState } from "../Store/Store";

import "./Product.css";

import rate from "../../Source/rate.png";
import { addItemToCart } from "../Store/Reducer/Reducers";
import { log } from "console";

export const Products = () => {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { data } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { items } = useSelector((state: RootState) => state.products);
  let category_items = items;
  if (data !== undefined) {
    category_items = items.filter((items) => items.category === data);
  }

  const addToCart = (id: number) => {
    if (id) {
      dispatch(addItemToCart(items[id - 1]));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = category_items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="site">
      <div className="Prod_site">
        {currentItems.map((items: IProd) => (
          <div className="prod_card" key={items.id}>
            <Link to={`/products/${items.id}`}>
              <div className="Prod_img">
                <img src={items.image} alt="" />
              </div>
              <div className="Prod_Name">
                <h1>{items.title.slice(0, 36)}</h1>
              </div>
              <div className="Prod_price">
                <p>{items.price}$</p>
              </div>
              <div className="Prod_info">
                <div className="rate">
                  <img src={rate} alt="" />
                  <p>{items.rating.rate}</p>
                </div>
                <p>Count sold: {items.rating.count}</p>
              </div>
            </Link>
            <button
              className="btn sep cart"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/SignUp");
                } else {
                  addToCart(items.id);
                }
              }}
            >
              <h1>To cart</h1>
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="btn pgntn"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <h2>Previous</h2>
        </button>

        <button
          className="btn pgntn"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= category_items.length}
        >
          <h2>Next</h2>
        </button>
      </div>
    </div>
  );
};

export default Products;
