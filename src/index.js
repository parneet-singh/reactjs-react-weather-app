import React, { useState } from "react";
import { render } from "react-dom";
import "../src/app.css";
import axios from "axios";

const WeatherApp = () => {
  const [temperatureCelcius, setTemperatureCelcius] = useState("");
  const [temperatureFerenhite, setTemperatureFerenhite] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("");
  const [celciusFlag, setCelciusFlag] = useState(false);
  const [ferenhiteFlag, setFerenhiteFlag] = useState(false);

  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=180941f68139fba12f166dc35d9b688b`,
    })
      .then((response) => {
        console.log(response.data.main.temp);
        // Kelvin to Fahrenheit
      

        // Kelvin to Celsius
        console.log("CelData", (response.data.main.temp - 273.15));
        setTemperatureCelcius(response.data.main.temp - 273.15);

        console.log("FerData", (response.data.main.temp - 273.15) * 1.8 + 32);
        setTemperatureFerenhite((response.data.main.temp - 273.15) * 1.8 + 32);
        // console.log(response.data);
        setDesc(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  let FahrenheitClicked = () => {
    setFerenhiteFlag(true);
    setCelciusFlag(false);
  }
  let CelciusClicked = () => {
    setCelciusFlag(true);
    setFerenhiteFlag(false);
  }



  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          width: "100%",
          backgroundColor: "#226ba3",
          fontSize: "30px",
          color: "#fff",
        }}
      >
        Weather APP
      </div>
      {/* <div
        style={{ height: "5px", width: "100%", backgroundColor: "blue" }}
      ></div> */}
      <br />
      <div style={{ marginLeft: "33%" }}>
        <div
          style={{
            height: "150px",
            width: "450px",
            backgroundColor: "#94e5ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
          }}
        >
          {new Date().toLocaleString()}
          <br />
          {city} Weather
          <br />
          {ferenhiteFlag ?  (Math.round(temperatureFerenhite * 100) === 0 ? "" :  Math.round(temperatureFerenhite * 100) / 100)  : ""  }
          <br />
          {celciusFlag ?  (Math.round(temperatureCelcius * 100) === 0 ? "" :  Math.round(temperatureCelcius * 100) / 100)  : ""  }
        </div>
        <br />
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={() => {
            getWeatherData(city, country);
          }}
        >
          GET
        </button>
        <div>
        <input type="radio" id="Celcius" name="fav_language" value="Celcius" onClick = {CelciusClicked}/>
        <label htmlFor="Celcius">Celcius</label>
        <input type="radio" id="Fahrenheit" name="fav_language" value="Fahrenheit" onClick = {FahrenheitClicked} />
        <label htmlFor="Fahrenheit">Fahrenheit</label>
        </div>
      </div>
    </>
  );
};

render(<WeatherApp />, document.querySelector("#root"));
