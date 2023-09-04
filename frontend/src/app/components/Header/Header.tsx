import React from 'react';
import "./style.scss";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/about'>About Us</Link>
                </li>
                <li>
                    <Link href='/blog/hello-world'>Blog Post</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;
