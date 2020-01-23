import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Router, Link, navigate } from '@reach/router';
import ProductInfo from './Components/ProductInfo';

const ProductForm = props => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  
  //setState to display errors on page
  const [errors, setErrors] = useState({});

  const addProduct = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/products", {title, price, description})
      .then(res => {
        if(res.data.errors){
          setErrors(res.data.errors);
          console.log(res.data); // on modify: only console.log errors if(res.data.errors)
        }
        else{
          navigate("/");
          setTitle("");
          setPrice(0);
          setDescription("");
        }
      })
        
      .catch(err => {
        console.log(err)
      });
  }

  return (
    <div>
      <form onSubmit={ addProduct }>
        <p>Title: <input type="text" onChange={e => setTitle(e.target.value)} />
        {errors.name ? <span>{errors.title.message}</span> : "" }
        </p>
        <p>Price: <input type="number" onChange={e => setPrice(e.target.value)} /></p>
        <p>Descr: <input type="text" onChange={e => setDescription(e.target.value)} /></p>
        <input type="submit" value="Create" />
      </form>
      <ProductList />
    </div>
  )
}

const ProductList = props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return(
    <div>
      <h3>All Products</h3>
        <div>
          {
            products.map(product => 
              <p key={product._id}>
                <Link to ={`/product/${product._id}`}>
                  aoeu{product.title}
                </Link>
              </p>  
            )
          }
        </div>    
    </div>
  )

}

function App() {
  return (
    <div>
    <Router>
      <ProductInfo path="/product/:_id" />
      <ProductForm path ="/"/>
    </Router>
    </div>
  );
}

export default App;
