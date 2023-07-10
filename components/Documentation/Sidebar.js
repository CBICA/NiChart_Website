import React from 'react';
import styles from '/styles/Sidebar.module.css';

const Sidebar = () => {
  // Add logic for foldable sections and navigation here if needed

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <a href="#installation">Installation</a>
          </li>
          <li>
            <a href="#usage">Usage</a>
          </li>
          <li>
            <a href="#examples">Examples</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
