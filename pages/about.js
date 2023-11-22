import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import styles from '../styles/About.module.css';
import { Grid, Typography, Paper } from '@mui/material';
import Link from 'next/link';

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | About</title>
        <Favicons />
      </Head>
      <Header />
      
      <Grid container spacing={3} className={styles.mainContent}>
        <Grid item xs={12} md={6}>
          <Paper className={styles.paper}>
            <Typography variant="h2" gutterBottom>Overview</Typography>
            <Typography variant="body1">
              Rapidly growing neuroimaging data that was acquired over decades in multiple studies, in conjunction with the advent of advanced machine learning methods, has created 
              tremendous potential for <font color="#aa00dd">knowledge discovery at a large scale</font>. NiChart (NeuroImaging Chart) is an ecosystem of software components enabling <font color="#aa00dd">constructive integration, statistical harmonization, and ML-centric data analyses</font> across studies.
            </Typography>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Typography variant="h2" gutterBottom>Applications</Typography>
            <Typography variant="body1">NiChart enables mapping of large-scale multi-modal brain MRI data into a dimensional system of neuroimaging signatures implemented by our ML models. </Typography>
            <ul>
              <li>
                <Typography variant="body1">We provide image processing tools for deriving <font color="#aa00dd">a panel of imaging derived phenotypes</font> from structural (sMRI), diffusion (dMRI) and functional (fMRI) imaging data.</Typography>
              </li>
              <li>
                <Typography variant="body1">ML models, which are previously trained on carefully processed and curated reference samples, allow users to calculate <font color="#aa00dd">imaging signatures that quantify complex multi-variate imaging patterns of brain changes</font> mapping the image data into a small but informative set of neuroimaging chart dimensions.</Typography>
              </li>
              <li>
                <Typography variant="body1">ML models capture <font color="#aa00dd">heterogeneity of brain aging and neurodegeneration</font>, and atrophy patterns due to <font color="#aa00dd">various diseases and conditions</font>, such as Alzheimer's disease, neuropsychiatic disorders, or cardio-vascular risk factors. </Typography>
              </li>
              <li>
                <Typography variant="body1">Standardized values from the large reference set allow users to compare their data with <font color="#aa00dd">NiChart-based normative ranges</font> or distributions from <font color="#aa00dd">specific disease subgroups</font>.</Typography>
              </li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          <div className={styles.imageContainer}>
            <img src="/images/About/nichart_logo_anim_v22_C_ms150.gif" alt="" className={styles.image} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <Typography variant="body1" align="center">
              Have feedback on NiChart? We'd love to hear from you. 
              <Link href="https://forms.gle/e3msfZUGAKib6vu78" style={{ textDecoration: 'none', color: '#aa00dd' }}>Provide Feedback</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default About;
