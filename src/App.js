import React, { useEffect } from "react";
import Clear from './Images/Clear.jpg'
import Cloudy from './Images/Cloudy.jpg'
import Overcast from './Images/Overcast.jpg'
import Rainy from './Images/Rainy.jpg'
import Snow from './Images/Snow.jpg'





function App() {
  const [location, setLocation] = React.useState("London");
  const [locateInfo, setLocateInfo] = React.useState({});

  useEffect(() => {
    searchClick();
  }, [])


 

  const searchClick = () => {fetch(`http://api.weatherapi.com/v1/forecast.json?key=457b6477a5f3405482d01445221307&q=${location}&days=1&aqi=no&alerts=no`)
  .then(response => response.json())
  .then((data) => setLocateInfo({
    name: data.location.name,
    country: data.location.country,
    status: data.current.condition.text,

    cel: {
      temp : data.current.temp_c,
      lowtemp: data.forecast.forecastday[0].day.mintemp_c,
      hightemp: data.forecast.forecastday[0].day.maxtemp_c,
    }, 


  }));
  setLocation("");
}

const searchClicky = (e) => {
  if (e.key === "Enter") searchClick()
}


 
  

 const dateSection = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"]

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date}th ${month} ${year}`

 }



  return (
    <div  style={
      locateInfo.status?.toLowerCase() === "clear" ||
      locateInfo.status?.toLowerCase() === "sunny"
        ? { backgroundImage: `url(${Clear})` }
        : locateInfo.status?.includes("cloudy")
        ? { backgroundImage: `url(${Cloudy})` }
        : locateInfo.status?.toLowerCase().includes("rainy")
        ? { backgroundImage: `url(${Rainy})` }
        : locateInfo.status?.toLowerCase().includes("snow")
        ? { backgroundImage: `url(${Snow})` }
        : { backgroundImage: `url(${Overcast})` }
    } className = "text-black items-center justify-center h-screen bg-center bg-cover select-none">
         
        <h1 className="text-3xl text-center ">{dateSection(new Date())}</h1>
        <div className="text-center mt-32">
      
        <input autoFocus placeholder = "Enter location" className="border-2 border-black" type = "text" value={location} onKeyPress = {searchClicky} onChange = {(e)=> setLocation(e.target.value)}/>
        <br/>
        <button className="bg-white text-black px-4 py-2 mt-2 hover:bg-black hover:text-white cursor-pointer" onClick={searchClick}>Search</button>
        </div>
        
        {locateInfo.country ? <h1 className="text-4xl text-center mt-4"> {locateInfo.name}, {locateInfo.country} </h1> : null}
            
          
            <div className="text-center mt-4">
            {locateInfo.cel ? <span>{locateInfo.cel?.lowtemp}°C</span> : null}
            
            {locateInfo.cel ? <span className="text-5xl mr-4"> {locateInfo.cel?.temp}°C</span>: null}
            
            {locateInfo.cel ? <span>{locateInfo.cel?.hightemp}°C</span> : null }
            
            </div>
          
         
         
      
      </div>
        
    
  )
}

export default App