import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/Publications.module.css';
import Favicons from '../components/Favicons/Favicons';
import newsStories from '/public/content/Publications/news_stories.js'

const Publications = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>NiChart | Publications</title>
          <Favicons />
        </Head>
        <Header />
        <h2 className={styles.newsTitle}>Publications</h2>
        <div className={styles.newsPage}>
          <div className={styles.newsStories}>
            {newsStories.map((story, index) => (
              <a key={index} href={story.href} target="_blank"  rel="noopener noreferrer" className='link'>
                <div className={styles.newsStory} key={index}>
                  <div className={styles.newsContent} key={index}>
                      <img src={story.image} alt={`News ${index + 1}`} className={styles.newsImage} />
                      <div className={styles.newsDetails} key={index}>
                        <h3 className={styles.newsStoryTitle}>{story.title}</h3>
                        <p className={styles.newsStoryDescription}>{story.description}</p>
                        <p className={styles.newsStoryDate}>{story.date}</p>
                      </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Publications;