import React, { useState } from 'react';
import styles from '../../styles/Components_Sidebar.module.css';

const Sidebar = ({ updateExpandedSection }) => {
  const [expandedSection, setExpandedSection] = useState("Reference Dataset");

  const handleItemClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const headerHeight = 180; // Replace with your header's height
      const offsetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
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
            <a onClick={() => toggleSection('Reference Dataset')}>
              <span className={expandedSection === 'Reference Dataset' ? styles.rotated : ''}></span>
              <font color="#3333ee">Reference Dataset</font>
            </a>
            {expandedSection === 'Reference Dataset' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('RefVars')}>
                <font color="#333399">Demographics and Clinical Variables</font></a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Image Processing')}>
              <span className={expandedSection === 'Image Processing' ? styles.rotated : ''}></span>
              <font color="#3333ee">Image Processing</font>
            </a>
            {expandedSection === 'Image Processing' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('sMRIProcessing')}>
                    <font color="#3333bb">sMRI</font>
                </a></li>
                <li><a onClick={() => handleItemClick('DTIProcessing')}>
                    <font color="#3333bb">DTI</font>                
                </a></li>
                <li><a onClick={() => handleItemClick('fMRIProcessing')}>
                    <font color="#3333bb">fMRI</font>                
                </a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Harmonization')}>
              <span className={expandedSection === 'Harmonization' ? styles.rotated : ''}></span>
              Data Harmonization
            </a>
            {expandedSection === 'Harmonization' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('Combat Family')}>Combat Family</a></li>
                <li><a onClick={() => handleItemClick('Complementary tools')}>Complementary tools</a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Machine Learning Models')}>
              <span className={expandedSection === 'Machine Learning Models' ? styles.rotated : ''}></span>
              Machine Learning Models
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
              Data Visualization
            </a>
            {expandedSection === 'Data Visualization' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('NiChart_Viewer')}>NiChart_Viewer</a></li>
                <li><a onClick={() => handleItemClick('NiChart_Webviewer')}>NiChart_Webviewer</a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Deployment')}>
              <span className={expandedSection === 'Deployment' ? styles.rotated : ''}></span>
              Deployment
            </a>
            {expandedSection === 'Deployment' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('AWS')}>AWS</a></li>
                <li><a onClick={() => handleItemClick('Singularity')}>Singularity</a></li>
                <li><a onClick={() => handleItemClick('Github')}>Github</a></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
