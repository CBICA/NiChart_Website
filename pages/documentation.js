import {React, useState, useEffect} from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Sidebar from '../components/Documentation/Sidebar';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Documentation.module.css';

const Documentation = () => {
    const [markdownContent, setMarkdownContent] = useState('');
    
    useEffect(() => {
      fetch('/content/documentation-content.md')
        .then((response) => response.text())
        .then((content) => setMarkdownContent(content));
    }, []);

    return (
      <div className={styles.container}>
        <Head>
            <title>NiChart | Documentation</title>
            <Favicons />
        </Head>
        <Header />
        <div className={styles.documentationPage}>
            <Sidebar />
            <div >
                <h2>Documentation</h2>
                <div className={styles.documentation_container}>
                    <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
            </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Documentation;
  