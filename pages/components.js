import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Sidebar from '../components/Components/Sidebar';
import styles from '../styles/Components.module.css'

const Components = () => {
  const [expandedSection, setExpandedSection] = useState('Reference Dataset');
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#', ''));
      setExpandedSection(hash || 'Reference Dataset');
    };
  
    handleHashChange(); // Call on initial render
    window.addEventListener('hashchange', handleHashChange);
  
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router.events]);
  

  const contentBySection = {
    'Reference Dataset': (
      <>
        <div className={styles.subsection} id='ref_data_overview'>
          <h1>NiChart Reference Dataset</h1>

          <p>
            NiChart Reference Dataset is a large and diverse collection of MRI images from multiple studies. It was created as part of the <a href="https://www.med.upenn.edu/cbica/imaging-consortia-increasing-sample-size-and-understanding-heterogeneity-in-health-and-disease.html">ISTAGING project</a> to develop a system for identifying imaging biomarkers of aging and neurodegenerative diseases. The dataset includes multi-modal MRI data, as well as carefully curated demographic, clinical, and cognitive variables from participants with a variety of health conditions.
          </p>
          <p>
            The reference dataset is a key component of NiChart <myemp>for training machine learning models</myemp> and <myemp>for creating reference distributions of imaging measures and signatures</myemp>, which can be used to compare NiChart values that are computed from the user data to normative or disease-related reference values.
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
         <h2>Demographics and Clinical Variables</h2>
          <p>
            The reference dataset includes a large number of samples from <myemp>people of different ethnic groups</myemp>, with a focus on older adults. This diversity is important because it allows to train machine learning models that are more accurate for people of diverse backgrounds.
          </p>

          <div>
            <img src="/images/Components/Reference_Data_Curation/figISTAGData_1.png" alt=""/>
          </div>
          <p>
          <i>Figure 1. Reference dataset demographics </i>
          </p>
          
          <p>
            The reference dataset contains data from <myemp>individuals with various neuro-degenerative diseases</myemp>. Disease subgroups were used to train machine learning models specifically tailored to each disease and to calculate disease-specific reference distributions.
          </p>

          <p>
          <div>
            <img src="/images/Components/Reference_Data_Curation/figISTAGData_2.png" alt=""/>
          </div>
          <i>Figure 2. Examples of disease subgroups in the reference dataset</i>
          </p>
         
      </div>
      </>
    ),
    'Image Processing': (
      <>
        <div className={styles.subsection} id="img_proc_overview">
          <h1>NiChart Image Processing</h1>
                    
          <p>NiChart Image <myemp>Processing</myemp> Pipelines is <myemp>a set of advanced tools</myemp> that can be used to extract features from multi-modal MRI data. The pipelines are made up of individual components that can be <myemp>installed and run independently</myemp>. Users can choose the specific components that they need for their analyses. NiChart pipelines are available both as <myemp>installation packages</myemp> and <myemp>software containers</myemp>. This ensures 100% reproducibility across different platforms, and allows users to easily install and run the pipelines without having to worry about installing any additional software dependencies."</p>
        </div>
        
        <hr/>
        <div className={styles.subsection} id="sMRIProcessing">
          <h2>Structural MRI</h2>

          <p>NiChart uses a combination of established and cutting-edge techniques to extract imaging features that quantify both normal and abnormal brain structures. Alongside conventional <myemp>atlas-based segmentation</myemp> methods for segmenting intra-cranial volume (ICV), anatomical regions of interest (ROIs), and white matter lesions (WMLs), we also offer an alternative  parcellation method using <myemp>non-negative matrix factorization</myemp> for generating multi-resolution data-driven components. Our atlas-based segmentation methods are powered by deep learning networks that enable rapid segmentation.
          </p>
          
          <h3>DLICV:</h3>
          <p>DLICV is a new deep learning (DL)-based tool to accurately segment the intracranial volume (ICV) from a raw T1-weighted MRI image. It's easy to use, requires minimal data preprocessing, and is robust against various factors that can affect segmentation accuracy. DLICV specifically segments the overall cerebrospinal fluid (CSF) surrounding the brain, rather than just the brain tissues themselves, providing an ICV estimation that is not influenced by overall cortical atrophy due to aging or disease.</p>
          <div>
            <img src="/images/Components/ImageProcessing/sMRI/dlicv_ex1.png" alt=""/>
          </div>
          <i>Figure 1. Example segmentatation using DLICV (green) for cases with significant cortical atrophy</i>

          <h3>DLMUSE:</h3>
          <p>DLMUSE is a powerful tool for automatically segmenting T1-weighted brain MRI scans. It is accurate, robust, easy to use, and fast. DLMUSE is built on a 3D convolutional neural network (CNN) architecture that has been extensively validated for various neuroimaging segmentation tasks. DLMUSE model was trained on a large and diverse training set, with ROI labels derived using a computationally intensive multi-atlas segmentation method.</p>

          <h3>DLWMLS:</h3>
            DLWMLS is a multi-modal segmentation method for segmenting white mater hyper-intensities (brain lesions) from T1-weighted and FLAIR MRI images. DLWMLS model was trained on a large and diverse training set, with semi-automatically segmented labels for lesions.

          <div>
            <img src="/images/Components/ImageProcessing/sMRI/dl_ex2.png" alt=""/>
          </div>
          <i>Figure 2. Example segmentatation using DLICV, DLMUSE and DLWMLS</i>
          

          <h3>sopNMF</h3>
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
      
      <div className={styles.subsection} id="combat_overview">

      <h1>NiChart Data Harmonization</h1>
        <p>
          To estimate and remove scanner-related batch effects in imaging variables we apply <myemp>a statistical harmonization method, Combat</myemp>. The ComBat method is a Bayesian statistical technique aimed at removing <em>batch effects</em> in high-dimensional datasets. The method estimates both the mean (<em>location</em>) and the variance (<em>scale</em>) of the residuals across batches using <em>Empirical Bayes</em> estimation, after correcting for additional covariates, such as age, sex and ICV.
        </p>
      </div>
      
      <div className={styles.subsection} id="combat_family">

      <h2>Combat Family of Statistical Harmonization Tools</h2>
        <p>
          NiChart data harmonization will be powered by the Combat-family software package that provides <myemp>an ensemble of harmonization tools</myemp>. Variants like <myemp>ComBat-GAM</myemp> offer the psosibility to model selected covariates using splines, providing flexible adjustments to non-linear covariate associations. Combat can be used through a train/test paradigm, applying it on a training set to estimate batch effect parameters, and using the existing model to harmonize new data from the same batches.
        </p>

          <div>
          <img src="/images/Components/Data_Harmonization/Picture1b.png" alt=""/>
          </div>
          <i>Figure 1. Combat family of tools</i>
       </div>
          
        <div className={styles.subsection} id="combat_tools">
          <h2>Combat Visualization and QC</h2>
          
          <p>
          Combat visualization and quality control (QC) package provides tools for <myemp>evaluating batch effects and estimated parameters</myemp> before and/or after harmonization
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

        <div className={styles.subsection} id="ml_overview">
      
          <h1>NiChart ML Models</h1>
          
          <p>NiChart offers an extensible <myemp>library of pre-trained machine learning (ML) models</myemp> that can convert high-dimensional imaging data into low-dimensional imaging signatures. These representations effectively capture and quantify brain changes associated with specific diseases or neurodegenerative conditions.</p>
          
          <p>The collection of NiChart imaging signatures forms the <myemp>neuroimaging chart dimensional system</myemp>. NiChart's pre-trained ML models are readily available and easy to use, eliminating the need for extensive training or expertise in machine learning. Additionally, the extensibility of the NiChart library will allow researchers to add their own specialized models.</p>
          
          <p>The models are trained on carefully <myemp>selected subsets of the reference dataset, tailored to each task and target disease/condition</myemp>.</p>
          
          <p>NiChart ML models incorporate a wide range of <myemp>innovative research methodologies</myemp>. NiChart's ML methods will be continuously refined to incorporate the latest advancements in machine learning and deep learning, keeping NiChart competitive in the field of medical imaging analysis.</p>
          
        </div>
        
        <div className={styles.subsection} id="ml_supervised">
        
          <h2>SPARE Models (Spatial Patterns of Abnormality for Recognition of Disease)</h2>
          <p>SPARE-models are predictive <myemp>supervised learning methods</myemp> that have been extensively validated. SPARE models train on imaging features extracted from single or multi-modal MRI scans. The models use these features to learn how to identify patterns in the brain that are associated with different diseases. Initial models are provided for <myemp>SPARE-BA</myemp> (brain age) and <myemp>SPARE-AD</myemp> (Alzheimer's disease). Additional models for <myemp>SPARE-CVD</myemp> (cardio-vascular disease risk), <myemp>SPARE-DM</myemp> (Type2 diabetes), <myemp>SPARE-SCZ</myemp> (schizophrenia) and <myemp>SPARE-CD</myemp> (chronic depression) will be added in future releases.</p>

          <div>
          <img src="/images/Components/Machine_Learning_Models/aibil/sparead_frombrainpaper.gif" alt=""/>
          </div>
          <i>Figure 1. Grey matter and white matter group differences between individuals with low vs high SPARE-AD values (from <a href="https://academic.oup.com/brain/article/132/8/2026/266984">1</a>).</i>

        </div>
        
        <div className={styles.subsection} id="ml_semisupervised">
          <h2>Image-based Disease Heterogeneity Models</h2>
          <p>Our research team has developed advanced analytical tools to uncover <myemp>imaging patterns of disease heterogeneity</myemp> from MRI data. These tools help us identify distinct disease subtypes that shed light on the underlying neuroanatomical differences associated with various pathologies. Our previous work has identified <myemp>four distinct disease subtypes for Alzheimer's disease and two subtypes for schizophrenia</myemp>. The pre-trained models provided in NiChart will enable users to obtain more nuanced measures beyond the traditional disease scores.</p>

          <div>
          <img src="/images/Components/Machine_Learning_Models/aibil/smilegan_naturefig.png" alt=""/>
          </div>
          <i>Figure 2. Alzheimer's disease subtypes identified by the SMILE-GAN method (from <a href="https://www.nature.com/articles/s41467-021-26703-z">2</a>).</i>

        </div>
          
      </>
    ),
    'Data Visualization': (
      <>

        <div className={styles.subsection} id="datavis_overview">
      
        <h1>NiChart Data Visualization</h1>
          <p>
          NiChart's visualization modules offer tools to assist users in <myemp>comparing outcome variables</myemp> extracted from their MRI data against <myemp>established NiChart reference distributions</myemp>. Users can effectively visualize and interpret their data, gaining meaningful insights into their individual profiles.
          </p>
          
          <p>
          NiChart offers two convenient options for visualizing user data: A <myemp>client-side visualization tool</myemp> integrated with the cloud portal enables users to derive and visualize NiChart dimensions for their data on the browser. A PyQT-based <myemp>installable package</myemp> provides extended capabilities for exploring and analyzing user data.
          </p>
        
        </div>
      
        <div className={styles.subsection} id="datavis_webviewer">          

        <h2>NiChart Web Viewer</h2>
          <p>We provide a web viewer that is <myemp>integrated with our cloud portal</myemp> to provide a more practical option for visualization of derived imaging features and final signatures. The web viewer was built using javascript. The viewer is designed as a client application to provide very fast rendering of visualizations. The application provides options to select the target variable for visualization, and the reference data used as the comparison set. This will allow users to <myemp>compare their selected data to different disease or demographic groups</myemp>. 
          </p>
          <div>
            <img src="/images/Components/DataViewers/nichart_webviewer_mri.png" alt=""/>
            <img src="/images/Components/DataViewers/nichart_webviewer_plots.png" alt=""/>
          </div>
        </div>

        <div className={styles.subsection} id="datavis_viewer">

          <h2>NiChart Viewer</h2>
          <p>Alternatively, users can install the NiChart viewer, a PyQT-based package that provides <myemp>an extended set of visualization functionality</myemp>. 
          </p>
          <div>
          <img src="/images/Components/DataViewers/nichart_viewer.png" alt=""/>
          </div>
          <i>Figure 2. NiChart Viewer.</i>

        </div>
      
      </>
    ),
    'Deployment': (
      <>
      
        <div className={styles.subsection} id="deploy_overview">
      
          <h1>NiChart Software Deployment and Application</h1>
          <p>NiChart provides <myemp>three installation options</myemp> to accommodate a wide range of end-users: local user-managed installation, local containerized installation, and web portal.
          </p>

          <p>The choice of installation option depends on the <myemp>user's technical expertise, computational resources, and desired level of control</myemp>. For users with strong technical skills and a need for maximum flexibility, local user-managed or containerized installation is recommended. For users who require a highly accessible and user-friendly solution, the web portal is the ideal choice.
          </p>

          <p>Currently, the web portal provides a restricted pipeline that is limited to structural MRI images.
          </p>
          
        </div>

        <div className={styles.subsection} id="deploy_install">
          <h2>Open-source Software Packages</h2>
          <p>NiChart is designed with a modular architecture, consisting of independent software components that can be installed and applied individually. This modular approach was chosen to ensure the extensibility of NiChart in the future without creating a dependency nightmare. Users can easily download these components followink the links at the NiChart_Project GitHub page. The installation process typically involves downloading the component, extracting the files, and running a setup script.
          </p>

          <p><a href="https://github.com/CBICA/NiChart_Project">NiChart_Project Github</a> 
          </p>
        </div>

        <div className={styles.subsection} id="deploy_container">
          <h2>Docker and Singularity Containers</h2>
          <p>We use the power of containerization technology for major image processing modules to simplify complex workflows and to ensure compatibility across different computing environments.
          </p>
        </div>
        
        <div className={styles.subsection} id="deploy_cloud">
          <h2>NiChart Web Portal</h2>
          <p>The Nichart web portal is a user-friendly online platform that streamlines the process of analyzing structural magnetic resonance imaging (sMRI). It provides a straightforward interface that allows users to upload their sMRI images, apply pre-trained ML models to extract meaningful biomarkers, and visualize the results in an intuitive manner.
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
        <Sidebar currentSection={expandedSection} updateExpandedSection={setExpandedSection}/>
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
