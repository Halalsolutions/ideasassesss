import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './assets/landing-animation.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import RedirectHandler from './components/RedirectHandler.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StrictMode>
          <RedirectHandler />
          <App />
        </StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
