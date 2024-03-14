import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Home from '../Home page/Home';
import axios from 'axios';
import './Index.css';
import Navbar from '../Navbar/Navbar';

function Indexpage() {
    const API_KEY = `1b0a3c742be81f9e7fe61db579a3eec5`;
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [value, setValue] = useState('');
    // const [temperature, setTemperature] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []); 
    

    useEffect(() => {
        if (latitude !== '' && longitude !== '') {
            const finalApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${API_KEY}`;
            axios.get(finalApi)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                });
        }
    }, [latitude, longitude, API_KEY]);

    const handleSearch=(e)=>{
        e.preventDefault()
        if(value===""){
            return 0
        }
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=Metric&appid=${API_KEY}`).then((response)=>{
            console.log(response.data);
            setData(response.data)
            setValue("")
        })
    }

    return (
        <>
            <Navbar setValue={setValue} handleSearch={handleSearch} value={value}/>
            <div className="index-page">
            
            <Sidebar data={data} />
            <Home data={data} />
        </div>
        </>
    );
}

export default Indexpage;
