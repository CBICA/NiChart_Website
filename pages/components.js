import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Favicons from '../components/Favicons/Favicons';
import Sidebar from '../components/Components/Sidebar';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Components.module.css';

const Components = () => {
  const router = useRouter(); // Use useRouter to access router information
  const { section } = router.query; // Get the section parameter from the URL query
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    // Use the "section" from the URL query as the selected section
    const selectedSection = section || 'sMRI';

    fetch(`/content/Components/${selectedSection}.md`)
      .then((response) => response.text())
      .then((content) => setMarkdownContent(content));
  }, [router.query]);

  const handleSectionChange = (section) => {
    // Update the URL query when the section changes
    router.push(`/components?section=${section}`);
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>NiChart | Components</title>
        <Favicons />
      </Head>
      <Header />
      <div className={styles.componentsPage}>
        <Sidebar onSectionChange={handleSectionChange} />
        <div>
          <div className={styles.componentsContainer}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Components;
