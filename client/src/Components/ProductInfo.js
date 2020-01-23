import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductInfo = props => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");



    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${props._id}`)
            .then(res => {
                console.log(res.data)
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
            })
            .catch(err => console.log(err))
        console.log("when does this run?", props._id)
    }, [props._id])

    return(
        <div>
            <h3>Prouduct Info</h3>
            <fieldset>
                <legend>Title: {title}</legend>
                <p>Price: $ {price}</p>
                <p>Description: {description}</p>
            </fieldset>

            
        </div>
    )
}

export default ProductInfo;