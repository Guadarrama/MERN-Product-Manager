import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Router, Link, navigate } from '@reach/router';

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
        }
        
      })
        
      .catch(err => {
        console.log(err)
      });
  }

  return (
    <form onSubmit={ addProduct }>
      <p>Title: <input type="text" onChange={e => setTitle(e.target.value)} />
      {errors.name ? <span>{errors.title.message}</span> : "" }
      </p>
      <p>Price: <input type="number" onChange={e => setPrice(e.target.value)} /></p>
      <p>Descr: <input type="text" onChange={e => setDescription(e.target.value)} /></p>
      <input type="submit" value="Create" />
    </form>
  )
}

function App() {
  return (
    <div>
      <ProductForm />
    </div>
  );
}

export default App;
