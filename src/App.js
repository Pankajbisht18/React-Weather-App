import React, {useState ,useRef, useEffect} from 'react';
import './App.css'

const App = () => {
  const[city,setCity] = useState('');
  const[temp,setTemp] = useState('');
  const[vbl,setVbl] = useState(null);
  let output = null;
  const forCity = useRef();
  
  useEffect(()=>{
    forCity.current.focus();
  },[])

  const fetchCity = (evt) => {
    setCity(evt.target.value);
    setTemp('');
    setVbl('');
  }

  const checkWether = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8591bd3fda2ae5b93c6dad7216eefa8f`)
    .then(response => {     
      if(response.status === 200) {
        setVbl(true)
      }
      else if(response.status === 404) {
        setVbl(false)
      }
      return response.json()
    })
    .then(data => {
      setTemp(data.main)
    })
  }
  if(vbl === true)
  {
    output=(
      <div className="result shadow-lg text-center p-3 mt-5">
        <h4>Feels Like : {temp.feels_like} </h4>
        <h4>Temp : {temp.temp} </h4>
        <h4>Temp Max : {temp.temp_max} </h4>
        <h4>Temp Min : {temp.temp_min} </h4>
        <h4>Humidity : {temp.humidity} </h4>
      </div>
    )
  }
  else if (vbl === false) {
    output = (
      <div className="result text-center p-3 mt-5">
        <h1>No City Found....!</h1>
      </div>
    )
  }
  return(
    <>
      <div className="container text-center mt-5 search">
        <h1>Wether App....!</h1>
        <input 
          type="text" 
          placeholder="Enter City Name"
          className="txt shadow-lg"
          value={city}
          ref={forCity}
          onChange={fetchCity}
        />
        <br />       
        <input 
          type="button"
          value="Search"
          className="btn btn-secondary mt-3 btn"
          onClick={checkWether}
        />
      </div>
      {output}
    </>
  )
}
export default App;