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
      <div>
        <Container maxWidth="x-lg">
          <Typography variant="h4" align="center" className={styles.title}>
            About NiChart
          </Typography>
          {contentData.map((item, index) => (
            <div key={index}>
              <Paper elevation={3} className={styles.row}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" className={styles.text}>
                      {/* Use dangerouslySetInnerHTML to render HTML */}
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
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default About;
