import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Sidebar from '../components/Components/Sidebar';
import styles from '../styles/Components.module.css'

const Components = () => {
  const [expandedSection, setExpandedSection] = useState('Reference data curation');

  const contentBySection = {
    'Reference data curation': (
      <>
        <div className={styles.subsection} id="iSTAGING">
          <h1>iSTAGING Project</h1>
          <p>
            The iSTAGING (imaging-based SysTem for AGing and NeurodeGenerative diseases) project at the Center for Biomedical Image Computing and Analytics (CBICA) lab at UPenn is an imaging-based system focused on aging and neurodegenerative diseases. 
            It encompasses sMRI, rsfMRI, and amyloid scans from approximately 62,859 individuals, with 83,325 total scans. 
            The data has been harmonized and integrated to create a brain chart in aging.
          </p>
          <div>
            <img src="/images/Components/Reference_Data_Curation/Picture7.png" alt=""/>
            <img src="/images/Components/Reference_Data_Curation/Plot_AD.png" alt=""/>
            <img src="/images/Components/Reference_Data_Curation/Plot_Age.png" alt=""/>
            <img src="/images/Components/Reference_Data_Curation/Plot_Diab.png" alt=""/>
            <img src="/images/Components/Reference_Data_Curation/Plot_Htn.png" alt=""/>
            <img src="/images/Components/Reference_Data_Curation/Plot_MCI.png" alt=""/>
            <img src="/images/Components/Reference_Data_Curation/Plot_Race.png" alt=""/>
            <img src="/images/Components/Reference_Data_Curation/Plot_Sex.png" alt=""/>
          </div>
        </div>
        <div id="Clinical Variables">
          <div className={styles.subsection} id="Clinical Variables">
            <h1>Clinical Variables</h1>
            <p>
              Some text here
            </p>
            <div>
              Some Images here
            </div>
          </div>
        </div>
      </>
    ),
    'Image Processing': (
      <>
        <div className={styles.subsection} id="DLICV, DLMUSE">
          <h1>DLICV method:</h1>
          <p></p>
          <div>
            Some Images here
          </div>
          <h1>DLMUSE Method:</h1>
          <p></p>
          <div>
            Some Images here
          </div>
        </div>
        <div className={styles.subsection} id="sopNMF">
          <h1>sopNMF</h1>
          <p>The sopNMF method, short for Stochastic Orthogonally Projective Non-negative Matrix Factorization, is an algorithm optimized for large-scale multivariate structural analysis of human brain data (<a href="https://www.researchgate.net/figure/Study-workflow-for-mega-analysis-of-human-brain-structural-covariance_fig1_359749441" target="_blank">source</a>).</p>
          <p>This method has a Python implementation called SOPNMF, which is a conversion of the MATLAB version of Orthogonal Projective Non-negative Matrix Factorization (<a href="https://github.com/anbai106/SOPNMF" target="_blank">source</a>)(<a href="https://github.com/anbai106/SOPNMF" target="_blank">source</a>).</p>
          <p>The algorithm has been utilized in studies to explore patterns of structural covariance in the human brain. In particular, a study cited on the project's GitHub page mentions the application of the method to identify novel genomic loci and pathways that influence these structural covariance patterns. Another publication cited is related to finding imaging patterns of structural covariance via non-negative matrix factorization (<a href="https://github.com/anbai106/SOPNMF" target="_blank">source</a>).</p>
          <p>For more in-depth technical details, you might want to look into the mentioned publications or the code repository on GitHub, which, is under development (<a href="https://github.com/anbai106/SOPNMF" target="_blank">source</a>).</p>
          <div>
          </div>
        </div>
        <div className={styles.subsection} id="fMRIPrep, XCPEngine, QSIPrep, pNet">
          <h1>fMRIPrep</h1>
            <p>fMRIPrep is a robust preprocessing pipeline tailored for the analysis of functional Magnetic Resonance Imaging (fMRI) data. The pipeline leverages a combination of well-regarded software packages including FSL, ANTs, FreeSurfer, and AFNI to ensure optimal software implementation for each preprocessing stage. Designed to minimize manual intervention, fMRIPrep facilitates a transparent workflow that enhances the reproducibility of fMRI data analyses. It is suited for handling both task-based and resting-state fMRI data, adapting to the nuances of different datasets to provide high-quality preprocessing without requiring manual intervention.</p>
            <div>
              Some Images here
            </div>
        </div>
        <div className={styles.subsection} id="XCPEngine">
          <h1>XCPEngine</h1>
            <p>The XCPEngine, or XCP imaging pipeline, is an open-source software package engineered for processing multimodal neuroimages. Utilizing a modular design, it integrates analytic routines from leading MRI analysis platforms like FSL, AFNI, and ANTs. This engine offers a configurable, modular, and agnostic platform for neuroimage processing and quality assessment, encapsulating a variety of high-performance denoising approaches while computing regional and voxelwise values for each modality. </p>
            <div>
            <img src="/images/Components/Machine_Learning_Models/XCP-D/Picture1.png" alt=""/>
            <img src="/images/Components/Machine_Learning_Models/XCP-D/Picture2.png" alt=""/>
            </div>
        </div>
        <div className={styles.subsection} id="QSIPrep">
          <h1>QSIPrep</h1>
          <p>QSIPrep is a specialized software platform designed for the preprocessing of diffusion MRI datasets, ensuring the deployment of adequate workflows for the task. It primarily focuses on diffusion-weighted magnetic resonance imaging (dMRI), a pivotal method for non-invasively examining the organization of white matter in the human brain. QSIPrep stands out for its integrative nature, being compatible with nearly all dMRI sampling schemes, thus providing a broad spectrum of utility in diffusion image processing.</p>
          <p>The platform employs an automated approach, configuring pipelines for processing dMRI data. It adheres to a BIDS-app methodology for preprocessing, which encompasses a variety of modern diffusion MRI data types. The preprocessing pipelines generated by QSIPrep are automatic, accurately grouping, distortion correcting, motion correcting, denoising, and coregistering the data, among other operations, to ensure the integrity and quality of the processed images.</p>
            <div>
              <img src="/images/Components/Machine_Learning_Models/QSIPrep/Picture1.png" alt=""/>
            </div>
        </div>
        <div className={styles.subsection} id="pNet">
          <h1>pNet</h1>
          <p>
        <strong>pNet</strong> (Personalized Functional Network Modeling (pNet)) is a <em>toolbox</em> designed to model <strong>brain functional networks</strong> using functional MRI. It is developed for <strong>cross-compatibility</strong> in <em>MATLAB</em> and <em>Python</em>.
          </p>
          <p>
              A <strong>GUI version</strong> is available specifically in <em>MATLAB</em>, providing an intuitive interface for users. For Python enthusiasts, a <strong>step-by-step guide</strong> is also available to ease the learning curve.
          </p>
          <p>
              It can be found at:
              <ul>
                  <li><a href="https://github.com/MLDataAnalytics/pNet" target="_blank"><strong>GitHub</strong>: MLDataAnalytics/pNet</a></li>
                  <li><a href="https://github.com/YuncongMa/pNet" target="_blank"><strong>GitHub</strong>: YuncongMa/pNet</a></li>
              </ul>
          </p>
            <div>
              <img src="/images/Components/Machine_Learning_Models/pNet/Picture1.jpg" alt=""/>
              <img src="/images/Components/Machine_Learning_Models/pNet/Picture2.jpg" alt=""/>
              <img src="/images/Components/Machine_Learning_Models/pNet/Picture3.png" alt=""/>
            </div>
        </div>
      </>
    ),
    'Harmonization': (
      <>
        <div className={styles.subsection} id="Combat Family">
          <h1>Combat Family</h1>
          <p>
              The <strong>ComBat</strong> method is a Bayesian statistical technique aimed at removing <em>batch effects</em> in high-dimensional datasets. ComBat estimates and adjusts for the unwanted variations introduced during the data collection process, such as those due to different MRI machines or settings.
          </p>
          <p>
              It uses <em>Empirical Bayes</em> estimates to improve the accuracy of batch effect removal. The method adjusts both the mean (<em>location</em>) and variance (<em>scale</em>) across batches, thereby preserving biological variance. It can also incorporate additional covariates like age or sex for more nuanced adjustments.
          </p>
          <p>
              Variants like <strong>ComBat-GAM</strong> offer more flexible adjustments using generalized additive models. Software implementations are commonly found in R, as part of the <code>sva</code> package, but Python versions are also available.
          </p>
          <p>
              It is a tool for making high-dimensional data more robust for subsequent analyses.
          </p>
          <div>
          <img src="/images/Components/Data_Harmonization/Picture1.png" alt=""/>
          <img src="/images/Components/Data_Harmonization/Picture2.png" alt=""/>
          <img src="/images/Components/Data_Harmonization/Picture3.png" alt=""/>
          <img src="/images/Components/Data_Harmonization/Picture4.png" alt=""/>
          <img src="/images/Components/Data_Harmonization/Picture5.png" alt=""/>
          <img src="/images/Components/Data_Harmonization/Picture6.png" alt=""/>
          </div>
        </div>
        <div className={styles.subsection} id="Complementary tools">
          <h1>Complementary tools</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
      </>
    ),
    'Machine Learning Models': (
      <>
        <div className={styles.subsection} id="SPARE-AD, SPARE-BA, SPARE-CVD">
          <h1>SPARE-AD, SPARE-BA, SPARE-CVD</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
        <div className={styles.subsection} id="smileGAN, surrealGAN">
          <h1>smileGAN, surrealGAN</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div></div>
        <div className={styles.subsection} id="DL-SPARE">
          <h1>DL-SPARE</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
      </>
    ),
    'Data Visualization': (
      <>
        <div className={styles.subsection} id="NiChart_Viewer">
          <h1>NiChart_Viewer</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
        <div className={styles.subsection} id="NiChart_Webviewer">
          <h1>NiChart_Webviewer</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
      </>
    ),
    'Deployment': (
      <>
        <div className={styles.subsection} id="Github">
          <h1>Our Github repos</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
        <div className={styles.subsection} id="Docker and Singularity">
          <h1>Docker and Singularity</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
        <div className={styles.subsection} id="AWS">
          <h1>AWS</h1>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>
        </div>
      </>
    ),
    
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Components</title>
        <Favicons />
      </Head>
      <Header />
      <div className={styles.componentsPage}>
        <Sidebar updateExpandedSection={setExpandedSection} />
        <div>
          <div className={styles.componentsContainer}>
            {contentBySection[expandedSection]}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Components;
