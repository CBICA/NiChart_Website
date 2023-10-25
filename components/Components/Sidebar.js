import React, { useState } from 'react';
import styles from '../../styles/Components_Sidebar.module.css';

const Sidebar = ({ updateExpandedSection }) => {
  const [expandedSection, setExpandedSection] = useState("Image Processing");

  const handleItemClick = (section) => {
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
    updateExpandedSection(section);
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
            <a onClick={() => toggleSection('Reference data curation')}>
              <span className={expandedSection === 'Reference data curation' ? styles.rotated : ''}></span>
              Reference data curation
            </a>
            {expandedSection === 'Reference data curation' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('iSTAGING')}>iSTAGING</a></li>
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
                <li><a onClick={() => handleItemClick('Neuroharmonize')}>NeuroHarmonize</a></li>
                <li><a onClick={() => handleItemClick('Combat')}>Combat</a></li>
              </ul>
            )}
            </li>
            <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Machine Learning Models')}>
              <span className={expandedSection === 'Machine Learning Models' ? styles.rotated : ''}></span>
              Machine Learning
            </a>
            {expandedSection === 'Machine Learning Models' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('Supervised')}>Supervised</a></li>
                <li><a onClick={() => handleItemClick('Semisupervised')}>Semi-Supervised</a></li>
                <li><a onClick={() => handleItemClick('DL')}>DL Models</a></li>
              </ul>
            )}
            </li>
            <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Data Visualization')}>
              <span className={expandedSection === 'Data Visualization' ? styles.rotated : ''}></span>
              Visualization
            </a>
            {expandedSection === 'Data Visualization' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('Centile curves')}>Centile curves</a></li>
                <li><a onClick={() => handleItemClick('Link to images')}>Link to images</a></li>
                <li><a onClick={() => handleItemClick('Reference values')}>Reference values</a></li>
              </ul>
            )}
            </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;