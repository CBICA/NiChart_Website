import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from '/styles/Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <img src="/images/Logo/brain_transparent_logo_cropped.png" alt="NiChart Logo - Image by Gerd Altmann from Pixabay" className={styles.logoImage} />
          </a>
        </Link>
      </div>

      <nav>
        <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
        <label htmlFor="menu-toggle" className={styles.menuIcon}>
          <FaBars />
        </label>

        <ul className={styles.navList}>
          <li><a href="/about">About</a></li>
          <li><a href="/documentation">Documentation</a></li>
          <li><a href="/team">Team</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/portal">Portal</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;