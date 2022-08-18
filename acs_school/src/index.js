import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlertProvider from './Layout/AlertSnackBar/alert_snackbar';
import { NotificationContextProvider } from './Context/NotificationContext';
import {AuthContextProvider} from './Context/UserContext'

ReactDOM.render(
  <AlertProvider>
    <AuthContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </AuthContextProvider>
  </AlertProvider>
  ,
  document.getElementById('root')
);
