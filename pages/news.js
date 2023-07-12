import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/News.module.css';
import Favicons from '../components/Favicons/Favicons';
import newsStories from '/public/content/news_stories.js'

const News = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>NiChart | News</title>
          <Favicons />
        </Head>
        <Header />
        <h2 className={styles.newsTitle}>News</h2>
        <div className={styles.newsPage}>
          <div className={styles.newsStories}>
            {newsStories.map((story, index) => (
              <a href={story.href} target="_blank"  rel="noopener noreferrer" className='link'>
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
          <div className={styles.twitterFeed}>
            <a
              className="twitter-timeline"
              data-tweet-limit="3"
              href="https://twitter.com/CBICAannounce?ref_src=twsrc%5Etfw"
            >
              Tweets by CBICAannounce
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default News;