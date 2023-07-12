import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/Team.module.css';
import Favicons from '../components/Favicons/Favicons';
import teamMembers from '/public/content/Team/Team_Members.js'
import collaborators from '/public/content/Team/Collaborators.js'

const Team = () => {
  const [teamExpandedIndex, setTeamExpandedIndex] = useState(-1);
  const [collaboratorExpandedIndex, setCollaboratorExpandedIndex] = useState(-1);

  const handleClick = (index, type) => {
    if (type === 'team') {
      if (teamExpandedIndex === index) {
        setTeamExpandedIndex(-1);
      } else {
        setTeamExpandedIndex(index);
      }
    } else if (type === 'collaborator') {
      if (collaboratorExpandedIndex === index) {
        setCollaboratorExpandedIndex(-1);
      } else {
        setCollaboratorExpandedIndex(index);
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
          <h2>Team Members</h2>
          <div className={styles.grid}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${styles.member} ${teamExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'team')}
              >
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                {teamExpandedIndex === index && <p>{member.bio}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.team_members}>
          <h2>Collaborators</h2>
          <div className={styles.grid}>
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className={`${styles.member} ${collaboratorExpandedIndex === index ? styles.expanded : ''}`}
                onClick={() => handleClick(index, 'collaborator')}
              >
                <img src={collaborator.image} alt={collaborator.name} />
                <h3>{collaborator.name}</h3>
                {collaboratorExpandedIndex === index && <p>{collaborator.bio}</p>}
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
