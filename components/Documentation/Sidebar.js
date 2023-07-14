import React from 'react';
import styles from '../../styles/Documentation_Sidebar.module.css';

const Sidebar = ({ onSectionChange }) => {
  const handleItemClick = (section) => {
    onSectionChange(section);
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <a onClick={() => handleItemClick('Installation')}>Installation</a>
          </li>
          <li>
            <a onClick={() => handleItemClick('Container-Installation')}>Container Installation</a>
          </li>
          <li>
            <a onClick={() => handleItemClick('Usage')}>Usage</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
