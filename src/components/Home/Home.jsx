import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchContriesData, allCountries } from "../../redux/coutriesSlice/countrySlice";
import CountryCard from "../CountryCard/CountryCard";
import Navbar from "../Navbar";

const Home = () => {
    const dispatch = useDispatch();
    const sumCountries = useSelector(allCountries);
    const [input, setInput] = useState('');

    useEffect (() => {
        if(sumCountries.length === 0) {
            dispatch(fetchContriesData());
        }
    }, []);

    const filterCountriesList = sumCountries.filter((country) => country.countryName.toLowerCase().includes(input.toLowerCase()),
    )

    const handelChange = (e) => {
        setInput(e.target.value);
    }

    const fileredItems = filterCountriesList.map((country) => (
        <CountryCard
            key={country.countryId}
            name={country.countryName}
            id={country.countryId}
            region={country.region}
            flagImage={country.flag}
            population={country.population}
        />
    ));

  return (
    <>
      <Navbar />
      <div>
        <div>
            <div>
                <h1>Search a country name here</h1>
                <input type="text" value={input} onInput={handelChange} placeholder="Type Country Name" />
                <img src="" />
            </div>
        </div>

        <ul>
            {fileredItems}
        </ul>
      </div>
    </>
  );
};

export default Home;
