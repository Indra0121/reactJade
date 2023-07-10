import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
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
        <Link to ="/login"><i><FaUser /></i></Link>
        
        
        <Link  variant="primary" onClick={handleShow}><i><FaCartPlus /></i></Link >
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

export default Navbar