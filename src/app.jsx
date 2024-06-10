import * as React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const root = createRoot(document.getElementById('root'));

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

const getJiraJQL = async (jqlArgs) => {
  try {
    const response = await axiosAgent.get(
      encodeURI(`/search?jql=${jqlArgs}`)
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



const App = () => {
    // sprint total time, remaining days in sprint, point total, point remaining, tickets total, tickets remaining, current tickets
    const [sprintData, setSprintData] = React.useState(null);

    const getUserData = async () => {
      // Get user's sprint total time, remaining days in sprint, point total, point remaining, tickets total, tickets remaining, current tickets
      const userTickets = await getJiraJQL(
        `assignee = "${process.env.REACT_APP_JIRA_USERNAME}" AND resolution is EMPTY`
      );
      return userTickets;
    };

    React.useEffect(() => {
      getUserData().then((data) => {
        setSprintData(data);
      });
    });

    return (
      <>
        <h1>RESPONSE FROM REQUEST {process.env.REACT_APP_BASE_URL}:</h1>
        {JSON.stringify(sprintData || 'No response yet')}
      </>
    );
};

root.render(<App />);
