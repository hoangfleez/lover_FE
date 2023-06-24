import React, { useState } from "react";
import { Country, City } from "country-state-city";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const CountryAndCityComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cityData, setCityData] = useState([]);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setCityData(City.getCitiesOfCountry(countryCode));
  };

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    displayValue: country.name,
  }));

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography variant="subtitle2" gutterBottom>
          Quốc gia
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId="country-label"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countryData.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.displayValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {selectedCountry && (
        <Grid item xs={6}>
          <Typography variant="subtitle2" gutterBottom>
            Thành phố
          </Typography>
          <FormControl fullWidth>
            <Select labelId="city-label">
              {cityData.map((option, index) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default CountryAndCityComponent;
