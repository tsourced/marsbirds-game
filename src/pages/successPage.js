import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.js';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
)

function Success() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const gameUrl = "URL_OF_YOUR_UNREAL_ENGINE_GAME";

  useEffect(() => {
    async function getUserData() {
        const { data: { user } } = await supabase.auth.getUser();
        if(user) {
            const discordId = user.user_metadata.sub;
            // console.log("Discord ID:", discordId);

            // Call function to update user data
            updateUserData(discordId);

            setUser(user);
        }
    }
    getUserData();
  }, []);

  async function updateUserData(discordId) {
    try {
        // Fetch MarsBirds data from CNFT API
        const proxyResponse = await fetch('https://droplet.marsbirds.art/cnft-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ discordID: discordId })
        });
        const cnftData = await proxyResponse.json();

        // Find the MarsBirds IDs associated with the discordId
        let marsbirds = [];
        for (let stakeKey in cnftData.notOnSale) {
          if (cnftData.notOnSale[stakeKey].discordID === discordId) {
            marsbirds = cnftData.notOnSale[stakeKey].assets;
            break;
          }
        }

        // Update user data on your server
        const response = await fetch('https://droplet.marsbirds.art/update-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ discordId: discordId, marsbirds: marsbirds })
        });

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Error updating user data:', error);
    }
  }

  async function signOutUser() {
      const { error } = await supabase.auth.signOut();
      navigate("/");
  }

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(user).length !== 0 ?
          <>
            <div className="game-container">
              <iframe 
                src={gameUrl}
                width="800"
                height="600"
                style={{ border: 'none' }}
              />
            </div>
            <button onClick={() => signOutUser()} className="signOutButton">
              <span className="profileIcon"></span> Sign Out
            </button>
          </>
          :
          <>
            <h1>User is not logged in</h1>
            <button onClick={() => { navigate("/") }} className="signOutButton">
              Go back home!
            </button>
          </>
        }
      </header>
      <Footer />
    </div>
  );
}

export default Success;
