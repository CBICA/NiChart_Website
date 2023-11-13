import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Sidebar from '../components/Components/Sidebar';
import styles from '../styles/Components.module.css'

const Components = () => {
  const [expandedSection, setExpandedSection] = useState('Reference Dataset');

  const contentBySection = {
    'Reference Dataset': (
      <>
        <div className={styles.subsection}>
          <h1><font color="#3333ee">NiChart Reference Dataset</font></h1>
          <p>
            NiChart Reference Dataset is a large and diverse collection of MRI images from multiple studies. It was created as part of the ISTAGING project [FIXME: cite/link] to develop a system for identifying imaging biomarkers of aging and neurodegenerative diseases. The dataset includes multi-modal MRI data, as well as carefully curated demographic, clinical, and cognitive variables from participants with a variety of health conditions.
          </p>
          <p>
            The reference dataset is a key component of NiChart <font color="#aa00dd">for training machine learning models</font> and <font color="#aa00dd">for creating reference distributions of imaging measures and signatures</font>, which can be used to compare NiChart values that are computed from the user data to normative or disease-related reference values.
          </p>

          <div>
            <img src="/images/Components/Reference_Data_Curation/Picture7.png" alt=""/>
          </div>
          <p>
          <i>Table 1. Overview of studies that are part of the NiChart Reference Dataset</i>
          </p>
                    
        </div>

      <hr/>
      <div className={styles.subsection} id="RefVars">
         <h2><font color="#3333bb">Demographics and Clinical Variables</font></h2>
          <p>
            The reference dataset includes a large number of samples from people of different ethnic groups, with a focus on older adults. This diversity is important because it allows to train machine learning models that are more accurate for people of diverse backgrounds.
          </p>

          <center>
          <div>
            <img src="/images/Components/Reference_Data_Curation/plot_istag_age-sex-race.png" alt=""/>
          </div>
          <p>
          <i>Figure 1. Reference dataset demographics </i>
          </p>
          </center>
          
          <p>
            The reference dataset contains data from individuals with various diseases. Disease subgroups were used to train machine learning models specifically tailored to each disease and to calculate disease-specific reference distributions.
          </p>

          <center>
          <p>
          <div>
            <img src="/images/Components/Reference_Data_Curation/plot_istag_dx-all.png" alt=""/>
          </div>
          <i>Figure 2. Examples of disease subgroups in the reference dataset</i>
          </p>
          </center>
         
      </div>
      </>
    ),
    'Image Processing': (
      <>
        <div className={styles.subsection}>
          <h1><font color="#3333ee">NiChart Image Processing</font></h1>
                    
          <p>NiChart Image Processing Pipelines is <font color="#aa00dd">a set of advanced tools</font> that can be used to extract features from multi-modal MRI data. The pipelines are made up of individual components that can be <font color="#aa00dd">installed and run independently</font>. Users can choose the specific components that they need for their analyses. NiChart pipelines are available both as <font color="#aa00dd">installation packages</font> and <font color="#aa00dd">software containers</font>. This ensures 100% reproducibility across different platforms, and allows users to easily install and run the pipelines without having to worry about installing any additional software dependencies."</p>
        </div>
          <hr/>
        <div className={styles.subsection} id="sMRIProcessing">
          <h2><font color="#3333bb">Structural MRI</font></h2>

          <p>NiChart uses a combination of established and cutting-edge techniques to extract imaging features that quantify both normal and abnormal brain structures. Alongside conventional <font color="#aa00dd">atlas-based segmentation</font> methods for segmenting intra-cranial volume (ICV), anatomical regions of interest (ROIs), and white matter lesions (WMLs), we also offer an alternative  parcellation method using <font color="#aa00dd">non-negative matrix factorization</font> for generating multi-resolution data-driven components. Our atlas-based segmentation methods are powered by deep learning networks that enable rapid segmentation.
          </p>
          
          <h3><font color="#333399">DLICV:</font></h3>
          <p>DLICV is a new deep learning (DL)-based tool to accurately segment the intracranial volume (ICV) from a raw T1-weighted MRI image. It's easy to use, requires minimal data preprocessing, and is robust against various factors that can affect segmentation accuracy. DLICV specifically segments the overall cerebrospinal fluid (CSF) surrounding the brain, rather than just the brain tissues themselves, providing an ICV estimation that is not influenced by overall cortical atrophy due to aging or disease.</p>
          <div>
            <img src="/images/Components/ImageProcessing/sMRI/dlicv_ex1.png" alt=""/>
          </div>
          <i>Figure 1. Example segmentatation using DLICV (green) for cases with significant cortical atrophy</i>

          <h3><font color="#333399">DLMUSE:</font></h3>
          <p>DLMUSE is a powerful tool for automatically segmenting T1-weighted brain MRI scans. It is accurate, robust, easy to use, and fast. DLMUSE is built on a 3D convolutional neural network (CNN) architecture that has been extensively validated for various neuroimaging segmentation tasks. DLMUSE model was trained on a large and diverse training set, with ROI labels derived using a computationally intensive multi-atlas segmentation method.</p>

          <h3><font color="#333399">DLWMLS:</font></h3>
            DLWMLS is a multi-modal segmentation method for segmenting white mater hyper-intensities (brain lesions) from T1-weighted and FLAIR MRI images. DLWMLS model was trained on a large and diverse training set, with semi-automatically segmented labels for lesions.

          <div>
            <img src="/images/Components/ImageProcessing/sMRI/dl_ex2.png" alt=""/>
          </div>
          <i>Figure 2. Example segmentatation using DLICV, DLMUSE and DLWMLS</i>
          

          <h3><font color="#333399">sopNMF</font></h3>
          <p></p>
          <p>Stochastic Orthogonally Projective Non-negative Matrix Factorization (sopNMF) is an algorithm for large-scale multivariate structural analysis of human brain data. Using sopNMF, the MuSIC atlas parcellates the human brain by structural covariance in MRI data over the lifespan and a wide range of disease populations, allowing to explore the phenotypic landscape and genetic architecture of the human brain. (<a href="https://www.cbica.upenn.edu/bridgeport" target="_blank">source</a>).</p>
          
          <div>
            <img src="/images/Components/ImageProcessing/sMRI/bridgeport.png" alt=""/>
          </div>
          <i>Figure 3. Multi-resolution MuSIC atlas parcellation</i>
          
        </div>

        <hr/>
        <div className={styles.subsection} id="DTIProcessing">
          <h2>Diffusion Tensor Imaging</h2>
          <h3>QSIPrep:</h3>
          <p>QSIPrep is a specialized software platform designed for the preprocessing of diffusion MRI datasets, ensuring the deployment of adequate workflows for the task. It primarily focuses on diffusion-weighted magnetic resonance imaging (dMRI), a pivotal method for non-invasively examining the organization of white matter in the human brain. QSIPrep stands out for its integrative nature, being compatible with nearly all dMRI sampling schemes, thus providing a broad spectrum of utility in diffusion image processing.</p>
          <p>The platform employs an automated approach, configuring pipelines for processing dMRI data. It adheres to a BIDS-app methodology for preprocessing, which encompasses a variety of modern diffusion MRI data types. The preprocessing pipelines generated by QSIPrep are automatic, accurately grouping, distortion correcting, motion correcting, denoising, and coregistering the data, among other operations, to ensure the integrity and quality of the processed images.</p>
            <div>
              <img src="/images/Components/Machine_Learning_Models/QSIPrep/Picture1.png" alt=""/>
            </div>
            <i>Figure 4. QSIPrep flowchart</i>
        </div>
          
        <hr/>
        <div className={styles.subsection} id="fMRIProcessing">
          <h2>Functional MRI</h2>
          <p>Functional MRI processing combines well-established and extensively validated tools for image preprocessing, feature extraction, and calculation of functional networks.</p>
          
          <h3>fMRIPrep:</h3>
            <p>fMRIPrep is a robust preprocessing pipeline tailored for the analysis of functional Magnetic Resonance Imaging (fMRI) data. The pipeline leverages a combination of well-regarded software packages including FSL, ANTs, FreeSurfer, and AFNI to ensure optimal software implementation for each preprocessing stage. Designed to minimize manual intervention, fMRIPrep facilitates a transparent workflow that enhances the reproducibility of fMRI data analyses. It is suited for handling both task-based and resting-state fMRI data, adapting to the nuances of different datasets to provide high-quality preprocessing without requiring manual intervention.</p>
            <div>
              <img src="/images/Components/ImageProcessing/fMRI/fmriprep-21.0.0.png" alt=""/>
            </div>
            <i>Figure 5. fMRIPrep flowchart</i>
        </div>

        <h3>XCPEngine</h3>
            <p>The XCPEngine, or XCP imaging pipeline, is an open-source software package engineered for processing multimodal neuroimages. Utilizing a modular design, it integrates analytic routines from leading MRI analysis platforms like FSL, AFNI, and ANTs. This engine offers a configurable, modular, and agnostic platform for neuroimage processing and quality assessment, encapsulating a variety of high-performance denoising approaches while computing regional and voxelwise values for each modality. </p>
            <div>
            <img src="/images/Components/ImageProcessing/fMRI/qsiprep2.png" alt=""/>
            </div>
            <i>Figure 6. XCPEngine flowchart</i>
            

          <h3>pNet</h3>
          <p><strong>pNet</strong> (Personalized Functional Network Modeling (pNet)) is a <em>toolbox</em> designed to model <strong>brain functional networks</strong> using functional MRI.</p>

          <div>
              <img src="/images/Components/Machine_Learning_Models/pNet/Picture1.jpg" alt=""/>
          </div>
          <i>Figure 7. pNet network model</i>
          
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
