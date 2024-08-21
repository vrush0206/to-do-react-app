import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles
import App from './App'; // Import the main App component

//Render the App component to the DOM using ReactDOM.render() function. It takes two arguments: the component to render and the target DOM element.
// ReactDOM.createRoot(
//   <React.StrictMode>
//     <App /> 
//   </React.StrictMode>,
//   document.getElementById('root')
// );//Since React 18, ReactDOM.createRoot() is recommended for better performance.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
