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
            <a onClick={() => handleItemClick('sMRI')}>sMRI</a>
          </li>
          <li>
            <a onClick={() => handleItemClick('fMRI')}>fMRI</a>
          </li>
          <li>
            <a onClick={() => handleItemClick('DTI')}>DTI</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
