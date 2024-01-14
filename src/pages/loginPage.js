import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Footer from '../components/Footer.js';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
)


function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN") {
            
            const discordId = session.user.user_metadata.sub;
            // console.log("Discord ID:", discordId);

            navigate("/success");
        }
    });

  return (
    <div className="App">
      <header className="App-header">
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            showLinks={false}
            providers={["discord"]}
        />
      </header>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src="/assets/marsvideo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
