import React from 'react';
import ReactDOM from 'react-dom';
import App from './routers/App';
import './sass/styles.scss';
import { Auth0Provider } from "@auth0/auth0-react";

const redirect = window.location.href

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev--lbm08i3.us.auth0.com"
      clientId="0sd3QokbtXtABSRxfVkXdZvJbqoGk1Ks"
      redirectUri={redirect}
      >
      <App />
    </Auth0Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
