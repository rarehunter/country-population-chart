import React, { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import BarChart from './Components/BarChart';
import data from './population-figures-by-country.json';

function App() {
  const [year, selectYear] = useState();
  const [minYear, setMinYear] = useState(Number.MAX_SAFE_INTEGER);
  const [maxYear, setMaxYear] = useState(Number.MIN_SAFE_INTEGER);

  useEffect(() => {
    const yearObj = findMinMaxYear();
    setMinYear(yearObj.minYear);
    setMaxYear(yearObj.maxYear);
    selectYear(yearObj.minYear);
  }, []);

  // Finds the min and max year present in this data set.
  // We assume that keys are of the form: "Year_YYYY" where YYYY is a 4-digit year representation.
  const findMinMaxYear = () => {
    let minYear = Number.MAX_SAFE_INTEGER;
    let maxYear = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < data.length; i++) {
      let country = data[i];
      for (const key of Object.keys(country)) {
        if (key.includes("Year")) {
          let currYear = parseInt(key.substring(key.length - 4));

          if (!isNaN(currYear)) {
            minYear = Math.min(currYear, minYear);
            maxYear = Math.max(currYear, maxYear);
          }
        }
      }
    }

    return { minYear: minYear, maxYear: maxYear };
  }

  return (
    <div className="App">
      <div className="App-header">
        Country Population Chart
      </div>
      <Form id="years-dropdown">
        <Form.Control as="select" onChange={(event) => selectYear(event.target.value)} custom>
          {
            maxYear !== Number.MIN_SAFE_INTEGER &&
            minYear !== Number.MAX_SAFE_INTEGER &&
            [...Array(maxYear - minYear + 1).keys()].map((n, index) =>
              <option key={index} value={n + minYear}>{n + minYear}</option>
            )
          }
        </Form.Control>
      </Form>
      <Container id="container">
        {year != null && year !== 0 && <BarChart data={data} year={year} />}
      </Container>
    </div>
  );
}

export default App;
