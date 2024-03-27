import { FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { SearchType } from "../../types";
import { ChangeEvent } from "react";
import Alert from "../Alert/Alert"
type FormProps={
  fetchWeather : () => void
}
export default function Form({fetchWeather} : FormProps) {

  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert,setAlert] = useState("");
  
  //here we use the same method for the city and the country
  //I make the handle accept both events
  //so i use there name as the value
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      //copy of search so I save the results thats not being changed
      ...search,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = ( e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    if(Object.values(search).includes("")){
      setAlert("All fields are required");
      return;
    }

    fetchWeather();
  }

  return (
    <form 
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {alert && <Alert> {alert} </Alert> }
      <div className={styles.field}>
        <label htmlFor="city">City:</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="city"
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Select a Country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type="submit" value="Consult Weather" />
    </form>
  );
}
