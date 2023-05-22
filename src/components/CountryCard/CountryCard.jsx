import PropTypes from "prop-types";

const CountryCard = (flagImage,name, region, population ) => {

  const convertNumber = (labelValue) => {
    let absValue = Math.abs(Number(labelValue));
    const suffixes = ['', 'K', 'M', 'B'];
    let index = 0;
  
    while (absValue >= 1.0e3 && index < suffixes.length - 1) {
      absValue /= 1.0e3;
      index++;
    }
  
    return index === 0 ? absValue : `${absValue.toFixed(2)}${suffixes[index]}`;
  };
  
  const refined = convertNumber(population);
  

  return (
    <li>
      <div>
        <div>
            <p>{name}</p>
            <p>{region}</p>
        </div>
        <div>
            <img src={flagImage} alt="country-flag" />
        </div>
      </div>
      <div>
        <p>
            <span> Population: </span>
            <span>{refined}</span>
        </p>
        <button>Arrow</button>
      </div>
    </li>
  )
}

CountryCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  flagImage: PropTypes.string.isRequired,
  population: PropTypes.string.isRequired,
}
export default CountryCard;
