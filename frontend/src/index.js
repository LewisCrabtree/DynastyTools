import React from 'react';
import ReactDOM from 'react-dom';
import App from './routers/App';
import './sass/styles.scss';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev--lbm08i3.us.auth0.com"
      clientId="0sd3QokbtXtABSRxfVkXdZvJbqoGk1Ks"
      redirectUri="http://localhost:8000/vote"
    >
      <App />
    </Auth0Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
