import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import CountryData from './components/CountryCard/CountryData';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/countrydata/:id' element={<CountryData />} />
      </Routes>
    </>
  )
}

export default App
