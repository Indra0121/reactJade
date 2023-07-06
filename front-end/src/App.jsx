import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About_us from './components/About_us';
import Products from './components/products';
import Single_page from './components/single_page';
import { FaCartPlus } from "react-icons/fa";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav>
      <ul className="links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/products">Produit</Link></li>
        <li><Link to="/about_us">À propos de nous</Link></li>
        <button variant="primary" onClick={handleShow}><i><FaCartPlus /></i></button>
      </ul>
      <form>
        <input type="text" name="text1" placeholder="search..." />
        <input type="submit" name="submit1" className="search" value="search" />
      </form>
      <img src="https://cdn-icons-png.flaticon.com/512/3894/3894275.png" alt="Logo" />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tr>
              <td>hello</td>
              
            </tr>
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
          <li><Link to="/contact_us">Contactez nous</Link></li>
        </ul>
      </div>
      <div>
        <p>Rue El Kadi Iass - Maarif - Casablanca 20330 <br /><br />
          Téléphone :<br /><br />
          + 212 (0)5 22 94 29 25 / + 212 (0)5 22 25 97 59</p>
      </div>
      <div className="col-md-4 col-sm-6 col-xs-12">
        <h1>our social media</h1>
        <ul className="social-icons">
          <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
          <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
          <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
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
        <Route path="/products/:id" element={<Single_page />} />
      </Routes>
      <hr />
      <Footer />
    </Router>
  );
};

export default App;
