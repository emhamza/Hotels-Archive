import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import RoomInfo from './components/Rooms/RoomInfo'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/room/:id" element={<RoomInfo/>} />
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
