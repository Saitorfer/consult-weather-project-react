import React from "react";
import { countries } from "../data/countries";
import styles from "./Form.module.css"

export default function Form() {
  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="city">City:</label>
        <input id="city" type="text" name="city" placeholder="city" />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country:</label>
        <select>
          <option value="">-- Select a Country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit}type="submit" value="Consult Weather" />
    </form>
  );
}