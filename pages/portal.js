import React, { useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const Portal = () => {
  useEffect(() => {
    const openPortalInNewTab = () => {
      window.open("http://cbica-nichart-hosting.s3-website-us-east-1.amazonaws.com/", '_blank');
    };

    // Wait for 3 seconds and then open the portal in a new tab
    setTimeout(openPortalInNewTab, 3000);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <h2>Portal</h2>
        <p>
          The portal will open in a new tab shortly. If it doesn't, you can <a href="http://cbica-nichart-hosting.s3-website-us-east-1.amazonaws.com/" target="_blank" rel="noopener noreferrer">click here</a> to open it manually.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Portal;