import React from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import styles from '../styles/News.module.css';
import Link from 'next/link';


const News = () => {
  const newsArticles = [
    {
      title: "NiChart Collaborates with Major University",
      date: "March 15, 2023",
      summary: "NiChart has entered into a collaboration with XYZ University to enhance MRI imaging analysis...",
      link: "/news/collaboration-xyz-university"
    },
    {
      title: "New Breakthrough in MRI Imaging",
      date: "April 22, 2023",
      summary: "A groundbreaking study using NiChart has led to new insights in MRI imaging techniques...",
      link: "/news/mri-breakthrough"
    },
    {
      title: "NiChart at the Global Health Conference",
      date: "May 9, 2023",
      summary: "NiChart will be featured at the upcoming Global Health Conference, showcasing its latest advancements...",
      link: "/news/global-health-conference"
    }
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | News</title>
        <Favicons />
      </Head>
      <Header />
      
      <h1>News</h1>
      <div className={styles.newsLayout}>
        <div className={styles.newsArticles}>
          {newsArticles.map((article, index) => (
            <div key={index} className={styles.article}>
              <h2>{article.title}</h2>
              <p className={styles.date}>{article.date}</p>
              <p>{article.summary}</p>
              <Link href={article.link}><a>Read more</a></Link>
            </div>
          ))}
        </div>

        <div className={styles.twitterFeed}>
          <a 
            className="twitter-timeline" 
            href="https://twitter.com/NiChart_AIBIL?ref_src=twsrc%5Etfw">Tweets by NiChart_AIBIL
          </a> 
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
