import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import styles from '../styles/About.module.css';

const contentData = [
  {
    text:
      "NiChart is an ecosystem of software components enabling constructive integration, statistical harmonization, and ML-centric data analyses across studies.",
    image: "/images/About/NiChart_overview_diagram.svg",
  },
  {
    text:
      "Key to NiChart's essence is its role as a versatile machine learning research platform. Users can harness the capabilities of NiChart to develop and validate their own machine learning models and pipelines.",
    image: "/images/About/NiChart_Data_Interaction.svg",
  },
  {
    text:
      "NiChart accommodates a range of brain scan types, including sMRI, fMRI, and DTI. This flexibility provides researchers with ample opportunities to explore various imaging modalities.",
    image: "/images/About/NiChart_Modalities.png",
  },
  {
    text:
      "NiChart is built upon a substantial dataset of 65,693 individuals, comprising 84,211 time points. This data has undergone meticulous curation, harmonization, and quality control.",
    image: "/images/About/NiChart_overview_diagram.svg",
  },
  {
    text:
      "NiChart automates the labor-intensive aspects of data processing, facilitating feature extraction and ML model application. This efficiency significantly reduces the time required for data analysis.",
    image: "/images/About/NiChart_Data_Interaction.svg",
  },
];

const replaceWithLinks = (text) => {
  // Use regular expressions to replace the words with links
  return text.replace(/sMRI/g, '<a href="/components/?section=sMRI">sMRI</a>')
             .replace(/fMRI/g, '<a href="/components/?section=fMRI">fMRI</a>')
             .replace(/DTI/g, '<a href="/components/?section=DTI">DTI</a>');
};

const About = () => {
  return (
    <div>
      <Head>
        <title>NiChart | About</title>
        <Favicons />
      </Head>
      <Header />

        <h2>Overview</h2>
        Rapidly growing neuroimaging data that was acquired over decades in multiple studies, in conjunction with the advent of advanced machine learning methods, has created 
        tremendous potential for <font color="#aa00dd">knowledge discovery at a large scale</font>. NiChart (NeuroImaging Chart) is an ecosystem of software components enabling <font color="#aa00dd">constructive integration, statistical harmonization, and ML-centric data analyses</font> across studies.
        
        <div>
            <img src="/images/About/nichart_logo_anim_v22_C_ms150.gif" alt=""/>
        </div>
        
        <h2>Applications</h2>
        NiChart enables mapping of large-scale multi-modal brain MRI data into a dimensional system of neuroimaging signatures implemented by our ML models. 
        
        <ul>
        <li>
        We provide image processing tools for deriving <font color="#aa00dd">a panel of imaging derived phenotypes</font> from structural (sMRI), diffusion (dMRI) and functional (fMRI) imaging data.
        </li>
        <li>
        ML models, which are previously trained on carefully processed and curated reference samples, allow users to calculate <font color="#aa00dd">imaging signatures that quantify complex multi-variate imaging patterns of brain changes</font> mapping the image data into a small but informative set of neuroimaging chart dimensions.
        </li>
        <li>
        ML models capture heterogeneity of brain aging and neurodegeneration, and atrophy patterns due to <font color="#aa00dd">various diseases and conditions</font>, such as Alzheimer's disease, neuropsychiatic disorders, or cardio-vascular risk factors. 
        </li>
        <li>
        Standardized values from the large reference set allow users to compare their data with <font color="#aa00dd">NiChart-based normative ranges</font> or distributions from <font color="#aa00dd">specific disease subgroups</font>.
        </li>
        </ul>
        
      <div className={styles.container}>
        {/* <Container maxWidth="x-lg">
          <Typography variant="h4" align="center" className={styles.title}>
            About NiChart
          </Typography>
          {contentData.map((item, index) => (
            <div key={index}>
              <Paper elevation={3} className={styles.row}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" className={styles.text}>
                      <span dangerouslySetInnerHTML={{ __html: replaceWithLinks(item.text) }} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <img
                      src={item.image}
                      alt={`Diagram ${index}`}
                      className={styles.image}
                    />
                  </Grid>
                </Grid>
              </Paper>
              <Divider className={styles.divider} />
            </div>
          ))}
        </Container> */}

        
      </div>
      <Footer />
    </div>
  );
};

export default About;
