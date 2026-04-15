/**
 * @file main.jsx
 * @description React application entry point.
 *
 * AI USAGE: This file bootstraps the entire React application.
 * It wraps <App> with <AppProvider> so global state is available everywhere.
 * Global styles are imported here so they apply to all components.
 *
 * DEV USAGE: Do not add business logic here. Keep this file minimal.
 * When migrating to React Native, replace createRoot with AppRegistry.registerComponent.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { AppProvider } from './context/AppContext.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
