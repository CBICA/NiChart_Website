import React, { useState } from 'react';
import styles from '../../styles/Documentation_Sidebar.module.css';

const Sidebar = ({ onSectionChange }) => {
  const [expandedSection, setExpandedSection] = useState('Image Processing');

  const handleItemClick = (section) => {
    onSectionChange(section);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Image Processing')}>
              <span className={expandedSection === 'Image Processing' ? styles.rotated : ''}></span>
              Image Processing
            </a>
            {expandedSection === 'Image Processing' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('sMRI')}>sMRI</a></li>
                <li><a onClick={() => handleItemClick('fMRI')}>fMRI</a></li>
                <li><a onClick={() => handleItemClick('DTI')}>DTI</a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Harmonization')}>
              <span className={expandedSection === 'Harmonization' ? styles.rotated : ''}></span>
              Harmonization
            </a>
            {expandedSection === 'Harmonization' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('Harmonize')}>Harmonize</a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Machine Learning')}>
              <span className={expandedSection === 'Machine Learning' ? styles.rotated : ''}></span>
              Machine Learning
            </a>
            {expandedSection === 'Machine Learning' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('SPARE scores')}>SPARE scores</a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Visualization')}>
              <span className={expandedSection === 'Visualization' ? styles.rotated : ''}></span>
              Visualization
            </a>
            {expandedSection === 'Visualization' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('Reference data')}>Reference Data</a></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
