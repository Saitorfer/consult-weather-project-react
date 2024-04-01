import axios from "axios";
import { z } from "zod";
import type { SearchType } from "../types";
import {useState} from "react"

//Type Guards O ASSERTION
//we use unknow because we dont know what we receive but
//we want to do some verifications
// function isWeatherResponse(weather : unknown) :weather is Weather{
//     return(
//         Boolean (weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'

//     )
// }

//ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

type Weather = z.infer<typeof Weather>;

export default function () {

  const [weather,setWeather] = useState<Weather>({
    name: '',
    main :{
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
  })
  //async to api because we block code since we get result
  const fetchWeather = async (search: SearchType) => {
    try {
      //this is to hide the key (vite)
      const apiKey = import.meta.env.VITE_API_KEY;

      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},
            ${search.country} &appid=${apiKey}`;

      //{data} to get the data part of the response (destruct)
      //axios is a library to call apis
      const { data } = await axios(geoUrl);
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(data);

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      // //we need to use data so i rename it to
      // //weatherResult to not egenrate conflicts
      // const {data: weatherResult} = await axios (weatherUrl);

      // //Type Guards
      // const result = isWeatherResponse(weatherResult);
      // console.log(result)

      // the previous code work, but ZOD its a better option
      //ZOD
      const { data: weatherResult } = await axios(weatherUrl);
      //this do the same as the type Guards (with less lines)
      const result = Weather.safeParse(weatherResult);

      if (result.success) {
        setWeather(result.data);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    weather,
    fetchWeather,
  };
}
