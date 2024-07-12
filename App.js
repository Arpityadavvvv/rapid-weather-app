import "./App.css";
import { FaSearch } from "react-icons/fa";
import Forecast from "./components/forecast";
import { useEffect, useState } from "react";

function App() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState([]);
  const [hasGeoLocationAccess, setHasGeoLocationAccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [city, setCityData] = useState('');

  // Get the current location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setHasGeoLocationAccess(true);
          setErrorMessage('');
        },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            setHasGeoLocationAccess(false);
            setErrorMessage('Geolocation access denied. Please grant access to get weather information.');
          } else {
            setErrorMessage('An error occurred while fetching geolocation.');
          }
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  }, []);

  // Getting the search city
  const submitHandler = (event) => {
    event.preventDefault();
    // Get the city name from the input field
    const cityName = event.target.elements.city.value.trim();

    // If no city is provided, return
    if (cityName === "") return;

    // Otherwise, set the city state
    setCityData(cityName);
  };

  return (
    <div className="parentd-div min-h-screen p-0 m-0 bg-teal-600 flex flex-col gap-3 sm:min-h-screen md:min-h-screen ">
      <h1 className="page-title text-white text-center">Rapid Weather Forecast</h1>

      <div className="text-center flex flex-row justify-center self-center mt-[2rem] md:flex-row md:justify-between sm:flex-col sm:justify-center sm:mx-auto">
        <form className="flex-col gap-x-3" data-searchForm onSubmit={submitHandler}>
          <input
            type="text"
            name="city"
            className="city w-fit rounded-md border-black-solid p-1 text-center"
            placeholder="search here"
          />
          <button type="submit" className="p-2 ">Submit</button>
        </form>
      </div>

      <Forecast className="flex-row items-center bg-slate-300 min-w-[400px]" position={position} city={city} />
    </div>
  );
}

export default App;