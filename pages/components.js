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
          <h1>Combat Family of Statistical Harmonization Tools</h1>
          <p>
          To estimate and remove scanner-related batch effects in imaging variables we apply a statistical harmonization method, <strong>Combat</strong>. The <strong>ComBat</strong> method is a Bayesian statistical technique aimed at removing <em>batch effects</em> in high-dimensional datasets. The method estimates both the mean (<em>location</em>) and the variance (<em>scale</em>) of the residuals across batches using <em>Empirical Bayes</em> estimation, after correcting for additional covariates, such as age, sex and ICV. Variants like <strong>ComBat-GAM</strong> offer the psosibility to model selected covariates using splines, providing flexible adjustments to non-linear covariate associations. Combat can be used through a train/test paradigm, applying it on a training set to estimate batch effect parameters, and using the existing model to harmonize new data from the same batches.

          </p>

          <div>
          <img src="/images/Components/Data_Harmonization/Picture1b.png" alt=""/>
          </div>
          <i>Figure 1. Combat family of tools</i>

        <div className={styles.subsection} id="CombatQC">
          <h2>Combat Visualization and QC</h2>
          
          <p>
          Combat visualization and quality control (QC) package provides tools for evaluating batch effects and estimated parameters before and/or after harmonization
          </p>

          <div>
          
          <img src="/images/Components/Data_Harmonization/Picture4.png" alt=""/>
                    <img src="/images/Components/Data_Harmonization/Picture5.png" alt=""/>
          <img src="/images/Components/Data_Harmonization/Picture6.png" alt=""/>
          <img src="/images/Components/Data_Harmonization/Picture3.png" alt=""/>
          </div>
          <i>Figure 2. Combat visualization and QC tool functions</i>
        </div>
      </>
    ),
    'Machine Learning Models': (
      <>
          <h1>NiChart ML Models</h1>
          <p>
          NiChart offers a rich and extensible <font color="#aa00dd">library of pre-trained machine learning (ML) 
models</font> that can convert high-dimensional imaging data into low-dimensional representations. These 
representations effectively capture and quantify brain changes associated with specific diseases or neurodegenerative 
conditions. The models are trained on carefully selected subsets of imaging features and data samples, tailored to each 
task and target disease/condition. The collection of NiChart imaging signatures forms the neuroimaging chart dimensional 
system. NiChart's pre-trained ML models are readily available and easy to use, eliminating the need for extensive 
training or expertise in machine learning. Additionally, the extensibility of the NiChart library will allow 
researchers to develop their own specialized models, tailored to specific research questions or clinical needs.
          </p>
          
          <p>
          NiChart ML models employ methodologies that encompass a broad spectrum of applications. NiChart's ML methods 
will be continuously refined to incorporate the latest advancements in machine learning, keeping NiChart competitive in 
the field of medical imaging analysis.
          </p>
          
        <div className={styles.subsection} id="SupervisedML">
          <h2>Disease prediction models</h2>
          <p>
            Nichart predictive models are based on supervised learning methods that have been extensively 
validated. These models are trained using carefully curated samples for specific types of diseases or conditions, using 
imaging features extracted from single or multi-modal MRI scans. The models use these features to learn how to 
identify patterns in the brain that are associated with different diseases. Initial models are trained for brain age and 
Alzheimer's Disease prediction, while models for other diseases and conditions will be included in future releases.
          </p>
          <div>
            Some Images here
          </div>
        </div>
        <div className={styles.subsection} id="SemisupervisedML ">
          <h2>Semi-supervised models</h2>
          <p>
          Heterogeneity of brain diseases is a challenge for precision diagnosis. Our semi-supervised 
clustering methods aim to identify and quantify this heterogeneity contrasted against normal brain structure, to 
identify disease subtypes through neuroimaging signatures.
          </p>
          <div>
            Some Images here
          </div></div>
          
        <div className={styles.subsection} id="DL-SPARE">
          <h2>DL models using raw images</h2>
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
          <h1>NiChart Data Visualization</h1>
          <p>
          NiChart's visualization tools offer a suite of valuable features to aid users in comparing their data against established NiChart reference distributions. These tools enable users to effectively visualize and interpret their data, gaining meaningful insights into their individual profiles.
          </p>
          
          <p>
          NiChart offers two convenient options for visualizing user data: A client-side visualization tool integrated with the cloud portal enables users to derive and visualize NiChart dimensions for their data on the browser. An installable PyQT utility provides extended capabilities for exploring and analyzing user data.
          </p>
      
        <div className={styles.subsection} id="NiChart_Webviewer">

          <h2>NiChart Web Viewer</h2>
          <p>
            Some Text here
          </p>
          <div>
            Some Images here
          </div>

          <h2>NiChart Web Viewer</h2>
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
          <h1>NiChart Installation Options</h1>
          <p>NiChart provides three installation options to accommodate a wide range of end-users: local user-managed 
installation, local containerized installation, and web portal. 
          </p>
          
          <p>
The choice of installation option depends on the user's technical expertise, computational resources, and desired level 
of control. For users with strong technical skills and a need for maximum flexibility, local user-managed or 
containerized installation is recommended. For users who require a highly accessible and user-friendly solution, the web 
portal is the ideal choice.
          </p>

          <p>
The web portal currently provides a simplified pipeline that is limited to structural MRI images.
          </p>
          
        <div className={styles.subsection} id="Github">
          <h1>Open-source installation packages</h1>
          <p>
        NiChart is designed with a modular architecture, consisting of independent software components that can be 
 installed and applied individually. This modular approach was chosen to ensure the extensibility of NiChart in the 
future without creating a dependency nightmare. Users can easily download these components followink the links at the 
NiChart_Project GitHub page. The installation process typically involves downloading the component, extracting the 
files, and running a setup script.
          </p>

          <p>
NiChart_Project Github page: https://github.com/FIXME
          </p>
        </div>

        <div className={styles.subsection} id="Containerized installation">
          <h1>Docker and Singularity</h1>
          <p>
We use the power of containerization technology for major image processing modules to simplify complex workflows and to 
ensure compatibility across different computing environments.
          </p>
        </div>
        <div className={styles.subsection} id="AWS">
          <h1>NiChart Web Portal</h1>
          <p>
          The Nichart web portal is a user-friendly online platform that streamlines the process of analyzing structural 
magnetic resonance imaging (sMRI). It provides a straightforward interface that allows users to upload their sMRI 
images, apply pre-trained ML models to extract meaningful biomarkers, and visualize the results in an intuitive manner.
          </p>
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
