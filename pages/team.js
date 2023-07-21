import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/Team.module.css';
import Favicons from '../components/Favicons/Favicons';
import AIBIL from '/public/content/Team/AIBIL.js'
import MLBD from '/public/content/Team/MLBD.js'
import PLINC from '/public/content/Team/PLINC.js'
import Psychiatry from '/public/content/Team/Psychiatry.js'
import Radiology from '/public/content/Team/Radiology.js'
import Biostatistics from '/public/content/Team/Biostatistics.js'

const Team = () => {
  const [AIBILExpandedIndex, setAIBILExpandedIndex] = useState(-1);
  const [MLBDExpandedIndex, setMLBDExpandedIndex] = useState(-1);
  const [PLINCExpandedIndex, setPLINCExpandedIndex] = useState(-1);
  const [PsychiatryExpandedIndex, setPsychiatryExpandedIndex] = useState(-1);
  const [RadiologyExpandedIndex, setRadiologyExpandedIndex] = useState(-1);
  const [BiostatisticsExpandedIndex, setBiostatisticsExpandedIndex] = useState(-1);

  const handleClick = (index, type) => {
    if (type === 'AIBIL') {
      if (AIBILExpandedIndex === index) {
        setAIBILExpandedIndex(-1);
      } else {
        setAIBILExpandedIndex(index);
      }
    } else if (type === 'MLBD') {
      if (MLBDExpandedIndex === index) {
        setMLBDExpandedIndex(-1);
      } else {
        setMLBDExpandedIndex(index);
      }
    } else if (type === 'PLINC') {
      if (PLINCExpandedIndex === index) {
        setPLINCExpandedIndex(-1);
      } else {
        setPLINCExpandedIndex(index);
      }
    } else if (type === 'Psychiatry') {
      if (PsychiatryExpandedIndex === index) {
        setPsychiatryExpandedIndex(-1);
      } else {
        setPsychiatryExpandedIndex(index);
      }
    } else if (type === 'Radiology') {
      if (RadiologyExpandedIndex === index) {
        setRadiologyExpandedIndex(-1);
      } else {
        setRadiologyExpandedIndex(index);
      }
    } else if (type === 'Biostatistics') {
      if (BiostatisticsExpandedIndex === index) {
        setBiostatisticsExpandedIndex(-1);
      } else {
        setBiostatisticsExpandedIndex(index);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Team</title>
        <Favicons />
      </Head>
      <Header />
      <div className={styles.team_page}>
        <div className={styles.team_members}>
          <h2>AIBIL/CBICA</h2>
          <div className={styles.grid}>
            {AIBIL.map((member, index) => (
              <div
                key={index}
                className={`${styles.member} ${AIBILExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'AIBIL')}
              >
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                {AIBILExpandedIndex === index && <p>{member.bio}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.team_members}>
          <h2>Machine Learning for Biomedical Data / CBICA:</h2>
          <div className={styles.grid}>
            {MLBD.map((collaborator, index) => (
              <div
                key={index}
                className={`${styles.member} ${MLBDExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'MLBD')}
              >
                <img src={collaborator.image} alt={collaborator.name} />
                <h3>{collaborator.name}</h3>
                {MLBDExpandedIndex === index && <p>{collaborator.bio}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.team_members}>
          <h2>Penn Lifespan Informatics and Neuroimaging Center:</h2>
          <div className={styles.grid}>
            {PLINC.map((collaborator, index) => (
              <div
                key={index}
                className={`${styles.member} ${PLINCExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'PLINC')}
              >
                <img src={collaborator.image} alt={collaborator.name} />
                <h3>{collaborator.name}</h3>
                {PLINCExpandedIndex === index && <p>{collaborator.bio}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.team_members}>
          <h2>Department of Psychiatry UPENN:</h2>
          <div className={styles.grid}>
            {Psychiatry.map((collaborator, index) => (
              <div
                key={index}
                className={`${styles.member} ${PsychiatryExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'Psychiatry')}
              >
                <img src={collaborator.image} alt={collaborator.name} />
                <h3>{collaborator.name}</h3>
                {PsychiatryExpandedIndex === index && <p>{collaborator.bio}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.team_members}>
          <h2>Department of Radiology UPENN:</h2>
          <div className={styles.grid}>
            {Radiology.map((collaborator, index) => (
              <div
                key={index}
                className={`${styles.member} ${RadiologyExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'Radiology')}
              >
                <img src={collaborator.image} alt={collaborator.name} />
                <h3>{collaborator.name}</h3>
                {RadiologyExpandedIndex === index && <p>{collaborator.bio}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.team_members}>
          <h2>Department of Biostatistics UPENN:</h2>
          <div className={styles.grid}>
            {Biostatistics.map((collaborator, index) => (
              <div
                key={index}
                className={`${styles.member} ${BiostatisticsExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'Biostatistics')}
              >
                <img src={collaborator.image} alt={collaborator.name} />
                <h3>{collaborator.name}</h3>
                {BiostatisticsExpandedIndex === index && <p>{collaborator.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
