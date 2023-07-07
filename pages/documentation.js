import {React, useState, useEffect} from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/Documentation.module.css';
import ReactMarkdown from 'react-markdown';

const Documentation = () => {
    const [markdownContent, setMarkdownContent] = useState('');
    
    useEffect(() => {
      fetch('/content/documentation-content.md')
        .then((response) => response.text())
        .then((content) => setMarkdownContent(content));
    }, []);

    return (
      <div>
        <Header />
        <div className={styles.documentation_page}>
          <h2>Documentation</h2>
          <div className={styles.documentation_container}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Documentation;
  