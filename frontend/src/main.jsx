import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store'; 
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className="bg-neutral-200 dark:bg-gray-800 h-full">
      <StrictMode>
        <App />
      </StrictMode>
    </div>
  </Provider>
)
