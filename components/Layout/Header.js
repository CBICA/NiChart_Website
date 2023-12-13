import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from '/styles/Header.module.css';
import Link from 'next/link';
import ReactGA from 'react-ga';
import {Heading, Flex, Button} from '@aws-amplify/ui-react'
const GA_TRACKING_ID = "G-CES0G22JMD";

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false);

  const {signOut, user, ...others} = props;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const GoToCloudPortal = props => {
    return (
    <Link className={styles.portalItem} href="/portal"><a className={styles.portal}>NiChart Cloud</a></Link>
    )
  }
  
  const SignoutWidget = props => {
    
    if (!user) {
      return null;
    } else {
      return (
        <Flex direction="column" justifyContent="flex-start" alignContent="right" alignItems="right">
        <p><font color="white">Signed in: <br></br> {user.attributes.email}.</font></p>
        <a onClick={signOut} className={styles.portalItem}> Log out </a>
        </Flex>
      )
    }
  }

  ReactGA.initialize(GA_TRACKING_ID);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
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
          <li><Link href="/quickstart"><a>Quickstart</a></Link></li>
          <li><Link href="/components"><a>Components</a></Link></li>
          <li><Link href="/team"><a>Team</a></Link></li>
          <li><Link href="/publications"><a>Publications</a></Link></li>
          <li><Link href="https://forms.gle/e3msfZUGAKib6vu78"><a>Feedback</a></Link></li>
          <li><Link href="/communication"><a className={styles.communication}>Communication</a></Link></li>
          <li className={styles.divider}>|</li>
          <li >{user? <SignoutWidget/> : <GoToCloudPortal/> }</li>
        </ul>

      </nav>
      <p>
      
      </p>
    </header>
    </>
  );
};

export default Header;
