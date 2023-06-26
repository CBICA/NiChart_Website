import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/News.module.css';

const News = () => {
    return (
      <div>
        <Header />
        <div className={styles.newsPage}>
          <h2>News</h2>
          <div className={styles.twitterFeed}>
            {/* Embed the Twitter feed here */}
            <a 
                className="twitter-timeline" 
                data-tweet-limit="3"
                href="https://twitter.com/CBICAannounce?ref_src=twsrc%5Etfw">
                Tweets by CBICAannounce
            </a> 
            <script async 
                    src="https://platform.twitter.com/widgets.js" 
                    charSet="utf-8">
            </script> 
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default News;
  