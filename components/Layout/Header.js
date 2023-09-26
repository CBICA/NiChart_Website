import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from '/styles/Header.module.css';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <FaBars />
        </div>

        <ul className={`${styles.navList} ${menuOpen ? styles.show : ''}`}>
          <li><Link href="/about"><a>About</a></Link></li>
          {/* <li><Link href="/documentation"><a>Documentation</a></Link></li> */}
          <li><Link href="/documentation"><a>Image Processing & ML Components</a></Link></li>
          <li><Link href="/team"><a>Team</a></Link></li>
          <li><Link href="/publications"><a>Publications</a></Link></li>
          <li><Link href="/contact"><a>Contact</a></Link></li>
          <li><Link href="/portal"><a>Portal</a></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
