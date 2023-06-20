import React from 'react';

const Header = () => {
  return (
    <header>
      {/* Logo */}
      <div className="logo">
        {/* Place your NiChart logo here */}
        <img src="/images/logo.png" alt="NiChart Logo" />
      </div>

      {/* Navigation */}
      <nav>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/documentation">Documentation</a></li>
          <li><a href="/team">Team</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/portal">Portal</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;