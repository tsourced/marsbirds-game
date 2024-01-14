import React from 'react';

function Footer() {
  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#000000', color: 'white' }}>
      <div>
        <a href="https://www.marsbirds.art/" target="_blank" rel="noopener noreferrer">
            <img src={`${process.env.PUBLIC_URL}/assets/gold-logo.svg`} alt="Logo" style={{ height: '50px' }} />
        </a>
      </div> 
      <div>
        <a href="https://discord.gg/Ph7bNcVCgf" target="_blank" rel="noopener noreferrer">
          <img src={`${process.env.PUBLIC_URL}/assets/gold-discord-32.svg`} alt="Discord" style={{ height: '24px', marginRight: '10px' }} />
        </a>
        <a href="https://twitter.com/mars_birds" target="_blank" rel="noopener noreferrer">
          <img src={`${process.env.PUBLIC_URL}/assets/gold-twitter-32.svg`} alt="Twitter" style={{ height: '24px' }} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;