import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'

import { Provider } from 'react-redux'
import { store } from './assets/redux/store'

import './assets/scss/main.scss'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>
)
