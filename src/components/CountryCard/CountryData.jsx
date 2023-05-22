import { useSelector } from "react-redux";
import { allCountries } from "../../redux/coutriesSlice/countrySlice";
import { useParams, useNavigate } from "react-router-dom";

const CountryData = () => {
    const navigation = useNavigate();
    const { id } = useParams();

    const countries = useSelector(allCountries);

    const country = countries.filter((obj) => obj.countryId === id);
    const country1  = country[0];

    return (
        <div>
            <div>
                <button type="button" onClick={() => navigation('/')}>
                    back
                </button>
                <div>
                    <p>Other info and statistics</p>
                    <div>
                        <h2>{country1.countryName}</h2>
                        <img src={country1.coatOfArms} alt="coat of arms" />
                    </div>
                </div>
                <div className="icons">
                    <p>icon1</p>
                    <p>icon2</p>
                </div>
            </div>
            <ul>
                <li>
                    <span>Continent:</span>
                    <span>{country1.continents[0]}</span>
                </li>
                <li>
                    <span>Sub Region:</span>
                    <span>{country1.subregion}</span>
                </li>
                <li>
                    <span>Capital:</span>
                    <span>{country1.capital}</span>
                </li>
                <li>
                    <span>Capital Location:</span>
                    <span>{`Lat:${country1.capitalLocation[0]}, Long:${country1.capitalLocation[1]}`}</span>
                </li>
                <li>
                    <span>Area:</span>
                    <span>{`${country1.area} sq km`}</span>
                </li>
                <li>
                    <span>Latitude:</span>
                    <span>{country1.lat}</span>
                </li>
                <li>
                    <span>Longitude:</span>
                    <span>{country1.long}</span>
                </li>
                <li>
                    <span>Flag:</span>
                    <span>{country1.flagSmall}</span>
                </li>
                <li>
                    <span>Time Zone:</span>
                    <span>{country1.timezones.join(', ')}</span>
                </li>
                <li>
                    <span>Car Side:</span>
                    <span>{country1.carSide}</span>
                </li>
            </ul>
        </div>
    );
};

export default CountryData;