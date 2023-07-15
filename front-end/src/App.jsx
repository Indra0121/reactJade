import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import About_us from './components/About_us';
import Products from './components/products';
import Single_page from './components/single_page';
import { FaCartPlus, FaUser  } from "react-icons/fa";
import { BsFacebook,BsInstagram,BsDiscord,BsTwitter  } from "react-icons/bs";
import Page404 from './components/Page404';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import SignInSignUpForm from './components/Login';
import axios from 'axios';
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const userId = localStorage.getItem('userId');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cart/carts/${userId}`);
        setCartProducts(response.data.data.products);
      } catch (error) {
        console.error(error);
      }
    };
  
    const intervalId = setInterval(() => {
      if (userId) {
        fetchCartProducts();
        console.log("automatic refrech");
      }
    }, 3000);
  
    // Clean up the interval when the component unmounts or when userId changes
    return () => clearInterval(intervalId);
  }, [userId]);
  

  return (
    <nav>
      <ul className="links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/products">Produit</Link></li>
        <li><Link to="/about_us">À propos de nous</Link></li>
        <Link to="/login"><i><FaUser /></i></Link>
        <Link variant="primary" onClick={handleShow}><i><FaCartPlus /></i></Link>
      </ul>
      <form>
        <input type="text" name="text1" placeholder="search..." />
        <input type="submit" name="submit1" className="search" value="search" />
      </form>
      <img src="https://cdn-icons-png.flaticon.com/512/3894/3894275.png" alt="Logo" />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <thead>
              <tr>
                <th className="table-header">Product</th>
                <th className="table-header">Price</th>
                <th className="table-header">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.length > 0 ? (
                cartProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.product_id.name}</td>
                    <td>{product.product_id.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No products in the cart</td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer>
      <div>
        <h1>JADE Shop</h1>
        <ul className="Links">
          <li><Link to="/">Acueill</Link></li>
          <li><Link to="/products">Produit</Link></li>
          <li><Link to="/about_us">A propos de nous</Link></li>
        </ul>
      </div>
      <div>
        <p>
          Rue El Kadi Iass - Maarif - Casablanca 20330 <br /><br />
          Téléphone :<br /><br />
          + 212 (0)5 22 94 29 25 / + 212 (0)5 22 25 97 59
        </p>
      </div>
      <div className="col-md-4 col-sm-6 col-xs-12">
        <h1>our social media</h1>
        <ul className="social-icons">
        <li> <a href='#' > <i><BsFacebook /></i></a></li>
        <li> <a href='#' > <i><BsInstagram /></i></a></li>
          <li> <a href='#' > <i><BsDiscord /></i></a></li>
          <li> <a href='#' > <i><BsTwitter /></i></a></li>
        </ul>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about_us" element={<About_us />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<SignInSignUpForm />} />
        <Route path="/products/:id" element={<Single_page />} />
        <Route path ="/*" element={<Page404/>}/>
      </Routes>
      <hr />
      <Footer />
    </Router>
  );
};

export default App;
