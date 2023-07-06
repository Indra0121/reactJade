import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Single_page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <div className='container_pro'>
     <div className='informations'>
     <h1>{product.name}</h1>
     <h2>{product.description}</h2>
      <h3>{product.price} da</h3>
      <button >buy</button>
     </div>
      
      <img src={product.imageUrl} alt='product ' />
    </div>
  );
};

export default Single_page;
