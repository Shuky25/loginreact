import { Outlet, Link } from "react-router-dom";
import './Layout.css';
import Logo from '../img/logo.png';
import { useState } from "react";
import spanSlika from '../img/navbar/span.png';
import xSlika from '../img/navbar/x.png';

const Layout = () => {

  const[state, setState] = useState(false);

  const toggle = () => {
    setState(!state);
    console.log(state);
    console.log(document.querySelector('button').id);
    console.log(document.querySelector('ul').id);
  }

  let X = <img src={spanSlika} alt="spanSlika" />;
  let O = <img src={xSlika} alt="xSlika" />;

  return (
    <>
      <nav>
        <img src={Logo} alt="logo" />
        <ul id={state? "mala-navigacija" : ""}>
          <li>
            <Link to="/">Pocetna</Link>
          </li>
          <li>
            <Link to="/blogs">Blogovi</Link>
          </li>
          <li>
            <Link to="/nagrade">Nagrade</Link>
          </li>
          <li>
            <Link to="/about">O nama</Link>
          </li>
          <li>
            <Link to="/register">Registruj se</Link>
          </li>
        </ul>
        <Link className="dugme" to="/login">Login</Link>
        <button className="toggle" id={state ? "hidden" : ""} onClick={toggle}>{state ? O : X}</button>
      </nav>
      
      <Outlet />
    </>
  )
};

export default Layout;
