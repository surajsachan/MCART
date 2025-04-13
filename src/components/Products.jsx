import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [noResult, setNoResult] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://98.80.205.202:31370/products");
      if (componentMounted) {
        const result = await response.json();
        setData(result);
        setFilter(result);
        setLoading(false);
      }
    };

    getProducts();
    return () => {
      componentMounted = false;
    };
  }, []);


  useEffect(() => {
    const trimmedText = searchText.trim();
  
    const delayDebounce = setTimeout(async () => {
      if (trimmedText === "") {
        setFilter(data);
        setNoResult(false);
        return;
      }
  
      try {
        setLoading(true);
        const response = await fetch(
          `http://98.80.205.202:31455/api/products/search/${trimmedText}`
        );
        if (!response.ok) throw new Error("Search failed");
  
        const result = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          setFilter(result);
          setNoResult(false);
        } else {
          setFilter([]);
          setNoResult(true);
        }
      } catch (error) {
        console.error("Search error:", error);
        toast.error("Error fetching search results");
      } finally {
        setLoading(false);
      }
    }, 500); // debounce delay
  
    return () => clearTimeout(delayDebounce);
  }, [searchText, data]);
  

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
    setNoResult(false);
  };

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {Array(6)
        .fill()
        .map((_, i) => (
          <div
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            key={i}
          >
            <Skeleton height={592} />
          </div>
        ))}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => {
            setFilter(data);
            setNoResult(false);
          }}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>

      {noResult ? (
        <div className="text-center mt-5">
          <h4>No products found.</h4>
        </div>
      ) : (
        filter.map((product) => (
          <div
            id={product.id}
            key={product.id}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          >
            <Link
              to={"/product/" + product.id}
              className="text-decoration-none text-dark"
            >
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="container mt-4 d-flex justify-content-center">
          <div className="input-group mb-3" style={{ maxWidth: "350px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
            <button
              className="btn btn-outline-dark"
              type="button"
              //onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;