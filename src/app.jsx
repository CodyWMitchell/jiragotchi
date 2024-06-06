import * as React from 'react';
import { createRoot } from 'react-dom/client';
import clippy from './assets/clippy.png';
import axios from 'axios';

const root = createRoot(document.body);

const axiosAgent = axios.create({
  baseURL: process.env.REACT_APP_JIRA_BASE_URL,
  auth: {
    username: process.env.REACT_APP_JIRA_USERNAME,
    password: process.env.REACT_APP_JIRA_PASSWORD
  },
  proxy: {
    host: process.env.REACT_APP_PROXY_HOST,
    port: process.env.REACT_APP_PROXY_PORT
  }
});

const App = () => {
    const [response, setResponse] = React.useState(null);

    return (
      <>
        <h1>RESPONSE FROM REQUEST TO {process.env.REACT_APP_BASE_URL}:</h1>
        {response || 'No response yet'}
      </>
    );
};

root.render(<App />);
