import React from 'react';
import Link from 'next/link'
import './style.scss'

const Footer = () => {
  return (
    <footer>
        <nav>
         <ul>
          <li>
            <Link href='/'>Students</Link>
          </li>
          ,
          <li>
            <Link href='/'>Nonprofits</Link>
          </li>
          ,
          <li>
            <Link href='/'>Shops</Link>
          </li>
          ,
          <li>
            <Link href='/'>Domains</Link>
          </li>
          ,
          <li>
            <Link href='/'>Support</Link>
          </li>
          ,
          <li>
            <Link href='/'>Newsletter</Link>
          </li>
          ,
          <li>
            <Link href='/'>Useful</Link>
          </li>
          ,
          <li>
            <Link href='/'>Privacy</Link>
          </li>
          ,
          <li>
            <Link href='/'>Terms</Link>
          </li>
          ,
          <li>
            <Link href='/'>Copyright Issues</Link>
          </li>
         </ul>
        </nav>
    </footer>
  );
};

export default Footer;
