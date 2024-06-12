import * as React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import caseSprite from './assets/Case.png';
import screenSprite from './assets/ScreenBG.png';
import ev0Sprite from './assets/Evolutions/e0.png';
import ev2Sprite from './assets/Evolutions/e1.png';
import ev1Sprite from './assets/Evolutions/e2.png';
import LayeredImage from './LayeredImage.jsx';
import DayTracker, { PointTracker } from './Trackers.jsx';

const root = createRoot(document.getElementById('root'));

const axiosAgent = axios.create({
  baseURL: process.env.REACT_APP_JIRA_BASE_URL,
  auth: {
    username: process.env.REACT_APP_JIRA_USERNAME,
    password: process.env.REACT_APP_JIRA_PASSWORD,
  },
  proxy: {
    host: process.env.REACT_APP_PROXY_HOST,
    port: process.env.REACT_APP_PROXY_PORT,
  },
});

const getJiraJQL = async (jqlArgs) => {
  try {
    const response = await axiosAgent.get(encodeURI(`/search?jql=${jqlArgs}`));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  // sprint total time, remaining days in sprint, point total, point remaining, tickets total, tickets remaining, current tickets
  const [sprintData, setSprintData] = React.useState(null);
  const [currentEvo, setCurrentEvo] = React.useState(0);
  const [caseHueOffset, setCaseHueOffset] = React.useState(5);
  const [screenHueOffset, setScreenHueOffset] = React.useState(5);
  const [currentDay, setCurrentDay] = React.useState(1);
  const [remainingPoints, setRemainingPoints] = React.useState(18);

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

  const setRandomColors = () => {
    setCaseHueOffset(Math.floor(Math.random() * 360));
    setScreenHueOffset(Math.floor(Math.random() * 360));
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setCurrentEvo((currentEvo + 1) % 4);
        break;
      case 'ArrowLeft':
        setCurrentDay((currentDay + 1) % 11);
        break;
      case 'ArrowRight':
        setRemainingPoints((remainingPoints - 1)%19);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div onContextMenu={setRandomColors}>
      <div className='drag-handle'></div>
      <img
        src={screenSprite}
        className='screen pixel-art'
        alt='screen'
        style={{ filter: `hue-rotate(${screenHueOffset}deg)` }}
      />
      <img
        src={caseSprite}
        className='case pixel-art'
        alt='case'
        style={{ filter: `hue-rotate(${caseHueOffset}deg)` }}
      />
      <LayeredImage
        images={[ev0Sprite, ev1Sprite, ev2Sprite]}
        displayCount={currentEvo}
        displayPrevious={false}
        className='pixel-art bouncy'
        style={{ filter: `hue-rotate(${screenHueOffset}deg)` }}
      />
      <DayTracker
        count={currentDay % 11}
        className='pixel-art'
        style={{ filter: `hue-rotate(${screenHueOffset}deg)` }}
      />
      <PointTracker
        count={remainingPoints}
        className='pixel-art'
        style={{ filter: `hue-rotate(${screenHueOffset}deg)` }}
      />
    </div>
  );
};

root.render(<App />);
