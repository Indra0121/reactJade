import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Single_page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  var userId = localStorage.getItem('userId');

  // Check if the token exists
  if (userId) {
    // Token exists in the local storage
    console.log('id:', userId);
  } else {
    // Token does not exist in the local storage
    console.log('Token not found');
  }

  const addtocart = () => {
    console.log(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/cart/carts/${userId}`, {
        product_id: id,
      });

      console.log('ok');
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <div className='container_pro'>
      <div className='informations'>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>{product.price} da</h3>
        <button onClick={addtocart}>buy</button>
      </div>

      <img src={product.imageUrl} alt='product ' />
    </div>
  );
};

export default Single_page;
