import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Components_Sidebar.module.css';

const Sidebar = ({ currentSection, updateExpandedSection }) => {
  const [expandedSection, setExpandedSection] = useState("Reference Dataset");
  const router = useRouter();
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
    // Scroll to the top of the page when a new section is toggled
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setExpandedSection(expandedSection === section ? null : section);
    router.push(`/components#${section}`, undefined, { shallow: true });
    updateExpandedSection(section);
  };


  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Reference Dataset')}>
              <span className={currentSection === 'Reference Dataset' ? styles.rotated : ''}></span>
              <h1c>Reference Dataset</h1c>
            </a>
            {currentSection === 'Reference Dataset' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('ref_data_overview')}><h2c>Overview</h2c></a></li>
                <li><a onClick={() => handleItemClick('RefVars')}><h2c>Demographics and Clinical Variables</h2c></a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Image Processing')}>
              <span className={currentSection === 'Image Processing' ? styles.rotated : ''}></span><h1c>Image Processing</h1c>
            </a>
            {currentSection === 'Image Processing' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('img_proc_overview')}><h2c>Overview</h2c></a></li>
                <li><a onClick={() => handleItemClick('sMRIProcessing')}><h2c>sMRI</h2c></a></li>
                <li><a onClick={() => handleItemClick('DTIProcessing')}><h2c>DTI</h2c></a></li>
                <li><a onClick={() => handleItemClick('fMRIProcessing')}><h2c>fMRI</h2c>                
                </a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Harmonization')}>
              <span className={currentSection === 'Harmonization' ? styles.rotated : ''}></span><h1c>Data Harmonization</h1c>
            </a>
            {currentSection === 'Harmonization' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('combat_overview')}><h2c>Overview</h2c></a></li>
                <li><a onClick={() => handleItemClick('combat_family')}><h2c>Combat Family</h2c></a></li>
                <li><a onClick={() => handleItemClick('combat_tools')}><h2c>Complementary Tools</h2c></a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Machine Learning Models')}>
              <span className={currentSection === 'Machine Learning Models' ? styles.rotated : ''}></span>
              <h1c>Machine Learning Models</h1c>
            </a>
            {currentSection === 'Machine Learning Models' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('ml_overview')}><h2c>Overview</h2c></a></li>
                <li><a onClick={() => handleItemClick('ml_supervised')}><h2c>Supervised Models</h2c></a></li>
                <li><a onClick={() => handleItemClick('ml_semisupervised')}><h2c>Semi-Supervised Models</h2c></a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Data Visualization')}>
              <span className={currentSection === 'Data Visualization' ? styles.rotated : ''}></span>
              <h1c>Data Visualization</h1c>
            </a>
            {currentSection === 'Data Visualization' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('datavis_overview')}><h2c>Overview</h2c></a></li>
                <li><a onClick={() => handleItemClick('datavis_viewer')}><h2c>NiChart Viewer</h2c></a></li>
                <li><a onClick={() => handleItemClick('datavis_webviewer')}><h2c>NiChart Web Viewer</h2c></a></li>
              </ul>
            )}
          </li>
          <li className={styles.collapsibleSection}>
            <a onClick={() => toggleSection('Deployment')}>
              <span className={currentSection === 'Deployment' ? styles.rotated : ''}></span>
              <h1c>Deployment</h1c>
            </a>
            {currentSection === 'Deployment' && (
              <ul className={styles.innerSection}>
                <li><a onClick={() => handleItemClick('deploy_overview')}><h2c>Overview</h2c></a></li>
                <li><a onClick={() => handleItemClick('deploy_install')}><h2c>Software Packages</h2c></a></li>
                <li><a onClick={() => handleItemClick('deploy_container')}><h2c>Software Containers</h2c></a></li>
                <li><a onClick={() => handleItemClick('deploy_cloud')}><h2c>Cloud Portal</h2c></a></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;







// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import styles from '../../styles/Components_Sidebar.module.css';

// const Sidebar = ({ updateExpandedSection }) => {
//   const [expandedSection, setExpandedSection] = useState("Reference Dataset");

//   const handleItemClick = (section) => {
//     const element = document.getElementById(section);
//     if (element) {
//       const headerHeight = 180; // Replace with your header's height
//       const offsetPosition = element.offsetTop - headerHeight;
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth"
//       });
//     }
//   };
//   const router = useRouter();
//   const toggleSection = (section) => {
//     // Scroll to the top of the page when a new section is toggled
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
  
//     setExpandedSection(expandedSection === section ? null : section);
//     router.push(`/components#${section}`, undefined, { shallow: true });
//     updateExpandedSection(section);
//   };
  

//   return (
//     <aside className={styles.sidebar}>
//       <nav>
//         <ul>
//           <li className={styles.collapsibleSection}>
//             <a onClick={() => toggleSection('Reference Dataset')}>
//               <span className={expandedSection === 'Reference Dataset' ? styles.rotated : ''}></span>
//               <h1c>Reference Dataset</h1c>
//             </a>
//             {expandedSection === 'Reference Dataset' && (
//               <ul className={styles.innerSection}>
//                 <li><a onClick={() => handleItemClick('ref_data_overview')}><h2c>Overview</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('RefVars')}><h2c>Demographics and Clinical Variables</h2c></a></li>
//               </ul>
//             )}
//           </li>
//           <li className={styles.collapsibleSection}>
//             <a onClick={() => toggleSection('Image Processing')}>
//               <span className={expandedSection === 'Image Processing' ? styles.rotated : ''}></span><h1c>Image Processing</h1c>
//             </a>
//             {expandedSection === 'Image Processing' && (
//               <ul className={styles.innerSection}>
//                 <li><a onClick={() => handleItemClick('img_proc_overview')}><h2c>Overview</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('sMRIProcessing')}><h2c>sMRI</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('DTIProcessing')}><h2c>DTI</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('fMRIProcessing')}><h2c>fMRI</h2c>                
//                 </a></li>
//               </ul>
//             )}
//           </li>
//           <li className={styles.collapsibleSection}>
//             <a onClick={() => toggleSection('Harmonization')}>
//               <span className={expandedSection === 'Harmonization' ? styles.rotated : ''}></span><h1c>Data Harmonization</h1c>
//             </a>
//             {expandedSection === 'Harmonization' && (
//               <ul className={styles.innerSection}>
//                 <li><a onClick={() => handleItemClick('combat_overview')}><h2c>Overview</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('combat_family')}><h2c>Combat Family</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('combat_tools')}><h2c>Complementary Tools</h2c></a></li>
//               </ul>
//             )}
//           </li>
//           <li className={styles.collapsibleSection}>
//             <a onClick={() => toggleSection('Machine Learning Models')}>
//               <span className={expandedSection === 'Machine Learning Models' ? styles.rotated : ''}></span>
//               <h1c>Machine Learning Models</h1c>
//             </a>
//             {expandedSection === 'Machine Learning Models' && (
//               <ul className={styles.innerSection}>
//                 <li><a onClick={() => handleItemClick('ml_overview')}><h2c>Overview</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('ml_supervised')}><h2c>Supervised Models</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('ml_semisupervised')}><h2c>Semi-Supervised Models</h2c></a></li>
//               </ul>
//             )}
//           </li>
//           <li className={styles.collapsibleSection}>
//             <a onClick={() => toggleSection('Data Visualization')}>
//               <span className={expandedSection === 'Data Visualization' ? styles.rotated : ''}></span>
//               <h1c>Data Visualization</h1c>
//             </a>
//             {expandedSection === 'Data Visualization' && (
//               <ul className={styles.innerSection}>
//                 <li><a onClick={() => handleItemClick('datavis_overview')}><h2c>Overview</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('datavis_viewer')}><h2c>NiChart Viewer</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('datavis_webviewer')}><h2c>NiChart Web Viewer</h2c></a></li>
//               </ul>
//             )}
//           </li>
//           <li className={styles.collapsibleSection}>
//             <a onClick={() => toggleSection('Deployment')}>
//               <span className={expandedSection === 'Deployment' ? styles.rotated : ''}></span>
//               <h1c>Deployment</h1c>
//             </a>
//             {expandedSection === 'Deployment' && (
//               <ul className={styles.innerSection}>
//                 <li><a onClick={() => handleItemClick('deploy_overview')}><h2c>Overview</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('deploy_install')}><h2c>Software Packages</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('deploy_container')}><h2c>Software Containers</h2c></a></li>
//                 <li><a onClick={() => handleItemClick('deploy_cloud')}><h2c>Cloud Portal</h2c></a></li>
//               </ul>
//             )}
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
