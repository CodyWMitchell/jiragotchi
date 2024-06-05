import * as React from 'react';
import { createRoot } from 'react-dom/client';
import clippy from './assets/clippy.png';

const root = createRoot(document.body);

const App = () => {
    return (
        <img src={clippy} alt="clippy" className="clippy" />
    );
};

root.render(<App />);
