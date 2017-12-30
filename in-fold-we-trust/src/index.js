import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App gridSize={10} />, document.getElementById('root'));
registerServiceWorker();
