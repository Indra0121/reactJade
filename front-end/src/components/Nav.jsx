import React from 'react'

const Navbar = () => {
    return (
      <nav>
        <ul className="links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/products">Produit</Link></li>
          <li><Link to="/about_us">À propos de nous</Link></li>
          <li><Link to="/login"><i className="fa-solid fa-user"></i></Link></li>
        </ul>
        <form>
          <input type="text" name="text1" placeholder="search..." />
          <input type="submit" name="submit1" className="search" value="search" />
        </form>
        <img src="https://cdn-icons-png.flaticon.com/512/3894/3894275.png" alt="Logo" />
      </nav>
    );
  };

export default Navbar