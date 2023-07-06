import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/product/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Product List</h1>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value=''>All</option>
        <option value='pc'>PC</option>
        <option value='phone'>Phone</option>
        <option value='hardware'>Hardware</option>
      </select>
      <div className='proproducts'>
        {filteredProducts.map((product) => (
          <div className='productcat category-card' key={product._id}>
            <img src={product.imageUrl} alt='products' />
            <h3>{product.name}</h3>
            <p>{product.price} da</p>
            <button className='card' onClick={() => navigate(`/products/${product._id}`)}>
  See Details
</button>

          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
